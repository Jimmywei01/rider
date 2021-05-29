import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRouter from './constant'
import '@/utils/routerSolve'

Vue.use(VueRouter)

export const constantRoutes = constantRouter
// VUE_APP_API_HOST hash
const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
  })

const router = createRouter()

export default router
