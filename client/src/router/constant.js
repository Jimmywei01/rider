import dashboardRouter from './backStage'
import homepageRouter from './frontDesk'
/**
  @desc 固定 router
  router 特性由上開始往下載入
  要把 dashboard 分開
  分開寫後 如果是 admin 就把有 admin 權限的 router 加到 constantRouter 裡面
  分開跳轉之後沒辦法進 dashboard 首頁
*/

const constantRouter = [
  homepageRouter,
  dashboardRouter,
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    name: 'Login',
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
    name: 'Register',
    meta: {
      title: 'Register'
    }
  },
  {
    path: '*',
    component: () => import('@/views/error/404'),
    hidden: true,
    name: '404',
    meta: {
      title: '404'
    }
  }
]

export default constantRouter
