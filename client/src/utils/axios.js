import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
// import { startLoading, endLoading } from './loading'
import Swal from 'sweetalert2'
/**
  @desc global axios 打 API
*/
axios.defaults.baseURL = process.env.VUE_APP_API_HOST
axios.defaults.headers.common.Accept = 'application/json, */*'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Add a request interceptor 進到 Vuex 時設定 jwt
axios.interceptors.request.use(
  (config) => {
    // startLoading()
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

/**
  @desc  Add a response interceptor 回傳回 Vue 畫面
  @param error {object} 回傳 server 設定的錯誤訊息
*/
axios.interceptors.response.use(
  (response) => {
    // endLoading()
    return response
  },
  (error) => {
    // endLoading()
    const { response } = error

    // jwt 過期處理
    if (response.status === 401 && response.data === 'Unauthorized') {
      removeToken('TokenKey')
      store.getters.jwtToken = ''
      Swal.fire({
        icon: 'error',
        title: '請重新登入'
      })
      router.push('/')
    }
    if (response.status !== 200) {
      Swal.fire({
        icon: 'error',
        title: '有錯誤請通知管理員'
      }).then(response => {
        router.push('/')
      })
      return Promise.reject(response)
    }
  })

export default axios
