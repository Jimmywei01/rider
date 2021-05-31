import router from '@/router'
import store from '@/store'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
const TokenKey = 'token'

/**
   @desc 設定完 token 在設定 isAuth 代表有權限了
*/
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function parserToken (token) {
  try {
    if (!token.length) {
      return new Error('parseToken: no set jwt ')
    }
    return jwtDecode(token)
  } catch (error) {
    return error
  }
}

/**
  @desc
    在一進入時由 localStorage 判斷有沒有 jwt
    沒有 - 未登入的情況下只能看到 登入頁面 & 註冊頁面 & homepage
    有 - 依照權限可看到不同頁面
    權限 admin editor user whitelist
    登入後將 jwt 設定為 header 每次進入都會帶這 jwt 給 server -> axios 設定
  @param to 目前進入 or 可進入的 router
  @param from 從哪來的 router
  @param next 進行下一步
*/

// 判斷進入 router 前
router.beforeEach(async (to, from, next) => {
  let whitelist = []
  const hasToken = store.getters.jwt
  const isLogin = await getToken()
  const { identity } = store.getters.user


  if (isLogin && identity !== 'user') {
    // 從 login 進入
    if (to.path === '/login') {
      if (!hasToken) {
        // 在 login reflash Vuex 會沒資料進到這（有 cookie 沒 Vuex）
        await store.dispatch('login/getuser', getToken())
        next()
      } else if (isLogin && hasToken) {
        // 從 login 登入 再去 register 註冊在登入（有 cookie 有 Vuex）
        next()
      }
    } else {
      // 不是從 login 進入
      if (hasToken) {
        // 初次進入 dashboard 進行權限判斷產生 router
        if (to.path === '/dashboard') {
          await store.dispatch('permission/generateRoutes', identity)
          await store.dispatch('motoHouse/getMoto')
          await store.dispatch('order/getOrder')
          await store.dispatch('store/getStore')
          await store.dispatch('member/getMembers')
        }
        next()
      } else {
        // refreash 重新打 api 是因為 Vuex 不會儲存資料 -> 重新取得 user 資料
        await store.dispatch('login/getuser', getToken())

        // refreash 重新取權限資料，設定 router children
        const refreash = await store.getters.user
        await store.dispatch('permission/generateRoutes', refreash.identity)
        await store.dispatch('motoHouse/getMoto')
        await store.dispatch('order/getOrder')
        await store.dispatch('store/getStore')
        await store.dispatch('member/getMembers')
        next()
      }
    }
  } else if (identity === 'user') {
    whitelist = ['/login', '/register', '/', '/moto', '/motoDetail', '/user', '/userOrder']
    if (whitelist.find(i => to.path.search(i) !== -1)) {
      // 白名單顯示全部 moto 資料
      await store.dispatch('motoHouse/getMoto')
      await store.dispatch('member/getMembers')
      await store.dispatch('order/getOrder')
      await store.dispatch('store/getStore')
      next()
    } else {
      next({ path: '/' })
    }
    // 沒權限
  } else {
    whitelist = ['Login', 'Register', 'HomePage', 'Moto', 'MotoDetail']
    if (whitelist.find(i => to.name.search(i) !== -1)) {
      await store.dispatch('motoHouse/getMoto')
      await store.dispatch('order/getOrder')
      await store.dispatch('store/getStore')
      next()
    } else {
      next({ path: '/' })
    }
  }
})
