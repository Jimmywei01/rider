import LayoutHomePage from '@/layouts/homepage'
/**
  @desc 在 homeDesk 下顯示的 router 頁面
    login、register、前台 web
    依照得到 router 分類
  @params
    (\\d+) 只能是數字
*/

const homepageRouter = {
  path: '/',
  component: LayoutHomePage,
  // redirect: '/homepage',
  children: [
    {
      // path: 'homepage',
      path: '/',
      component: () => import('@/views/homepage'),
      name: 'HomePage',
      meta: {
        title: 'Homepage'
      }
    },
    {
      path: 'moto',
      component: () => import('@/views/moto/index'),
      name: 'Moto',
      meta: {
        title: 'Moto'
      }
    },
    {
      path: 'motoDetail/:id(\\d+)',
      component: () => import('@/views/motoDetail/index'),
      name: 'MotoDetail',
      meta: {
        title: 'MotoDetail'
      }
    },
    {
      path: 'user',
      component: () => import('@/views/user/index'),
      name: 'User',
      meta: {
        title: 'User'
      }
    },
    {
      path: 'userOrder/:id(\\d+)',
      component: () => import('@/views/userOrder/index'),
      name: 'UserOrder',
      meta: {
        title: 'UserOrder'
      }
    }
  ]
}

export default homepageRouter
