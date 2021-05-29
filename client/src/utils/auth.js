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
    權限 admin employee whitelist
    登入後將 jwt 設定為 header 每次進入都會帶這 jwt 給 server -> axios 設定
  @param to 目前進入 or 可進入的 router
  @param from 從哪來的 router
  @param next 進行下一步
*/

/*
  當用戶填寫完賬號和密碼後向服務端驗證是否正確，驗證通過之後，服務端會返回一個令牌，
  拿到令牌之後（我將這個令牌替換為Cookie中，確保刷新頁面後能記住用戶登錄狀態），
  前端會根據令牌再去拉取一個user_info的接口來獲取用戶的詳細信息（如用戶權限，用戶名等等信息
  重整後 Vuex 的資料都會消失要保存 -> 每次重整的時候都要再去 cookie 撈 token 解析 user 資料得到權限產生對應的路由
*/
// 判斷進入 router 前
router.beforeEach(async (to, from, next) => {
  let whitelist = ['/login', '/register', '/', '/moto', '/motoDetail']
  const hasToken = store.getters.jwt
  const isLogin = await getToken()
  const { identity } = store.getters.user
  /**
    @desc 全域 router
      1.如果 isLogin cookie 有 token
        剛登入 -> 從 login router 進入，代表剛登入都會有 isLogin & hasToken -> router 繼續往下
        登入過 -> 重新拜訪 web or 重新整理 or router 不是從 login 進入 -> Vuex data 會消失（就檢查 hasToken -> Vuex 裡的 jwt 重新抓取 user 資料）
      2.如果沒 isLogin cookie 代表未登入 or 未註冊 or 一般 user
        -> 白名單頁面（找目前頁面 router 在不在 whitelist 裡面，不再代表未授權進入，就跳轉到 homepage）
      3.refreash 後要重新抓 identity 給 permission Vuex 重新抓 router
  */
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
    // 沒有 isLogin（cookie）值，要規定 沒權限＆一般 User 可進入的 router -> 白名單頁面（找目前 router 在不在 whitelist 裡面）
    /* 白名單頁面可訪問 */
  } else if (whitelist.find(i => to.path.search(i) !== -1)) {
    // 白名單顯示全部 moto 資料
    await store.dispatch('motoHouse/getMoto')
    await store.dispatch('order/getOrder')
    await store.dispatch('store/getStore')
    next()
  } else {
    /* 其他無權訪問的頁面將重定向到首頁 */
    next({ path: '/' })
  }
})
