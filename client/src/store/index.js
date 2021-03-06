import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import register from './module/register'
import login from './module/login'
import permission from './module/permission'
import member from './module/member'
import motoHouse from './module/motoHouse'
import store from './module/store'
import order from './module/order'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    register,
    login,
    permission,
    member,
    motoHouse,
    store,
    order
  }
})
