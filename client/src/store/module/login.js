import apiLogin from '@/api/login'
import router from '@/router'
import { setToken, parserToken, removeToken } from '@/utils/auth'

/**
  @desc members 資料結果
  @params
    jwt        jwt token
    user       單一 user 資料
*/
const state = {
  jwt: '',
  user: {}
}

/**
  @desc members 資料結果
  @params
    SET_JWT        設定 jwt token
    SET_USER       設定 user 資料
*/
const mutations = {
  SET_JWT: (state, jwt) => {
    state.jwt = jwt
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

/**
  @desc
    用 api 發送 data 給 server db 搜尋是否有相同 data
    有回傳 jwt
    把 jwt 存到 localStorage or cookie
    在傳給 auth.js 作 decode 解析 jwt
    decode jwt 把 server 回傳裡面的 data 解析出來存到 state 做操作

  @method
    userLogin       User 登入
    getuser         得到 user 資訊
      1.一開始登陸取得 jwt user 資料
      2.reflash 後取得 jwt user 資料
    logout          登出
*/
const actions = {
  userLogin ({ commit, dispatch, store }, loginUser) {
    return new Promise((resolve, reject) => {
      apiLogin.userLogin(loginUser)
        .then(res => {
          if (!res.token.length) {
            throw new Error('not set jwt ')
          }
          commit('SET_JWT', res.token)
          setToken(res.token)

          // 取 getuser action 使用，設定 user data
          dispatch('getuser', state.jwt)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getuser ({ commit, state }, token) {
    // 檢查 state 有沒有 jwt
    const reToken = state.jwt
    if (!reToken) {
      commit('SET_JWT', token)
    }
    const user = parserToken(token)
    commit('SET_USER', user)
  },

  logout ({ commit, state, getters }) {
    removeToken()
    commit('SET_JWT', '')
    commit('SET_USER', {})
    // window.location.reload() // safari 使用
    router.go(0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
