import LayoutDashboard from '@/layouts/dashboard'

const dashboardRouter =
  {
    path: '/',
    component: LayoutDashboard,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-pie-chart',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'member',
        component: () => import('@/views/member/index'),
        name: 'Member',
        meta: {
          title: '會員',
          icon: 'el-icon-user-solid',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'order',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: {
          title: '訂單',
          icon: 'el-icon-tickets',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'motohouse',
        component: () => import('@/views/motohouse/index'),
        name: 'MotoHouse',
        meta: {
          title: '車款庫存',
          icon: 'el-icon-bicycle',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'store',
        component: () => import('@/views/store/index'),
        name: 'Store',
        meta: {
          title: '店家',
          icon: 'el-icon-school',
          roles: ['admin']
        }
      },
      {
        path: 'analysis',
        component: () => import('@/views/analysis/index'),
        name: 'Analysis',
        meta: {
          title: '分析',
          icon: 'el-icon-data-analysis',
          roles: ['admin']
        }
      }
    ]
  }

export default dashboardRouter
