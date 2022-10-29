// 配置路由
export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: {
      show: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    path: '/detail/:skuId', // 动态路由，占位传参
    name: 'detail',
    component: () => import('@/views/Detail'),
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('@/views/ShopCart'),
    meta: {
      show: true
    }
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: {
      show: true
    },
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter (to, from, next) {
      if (from.path === '/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay'),
    meta: {
      show: true
    },
    // 将query参数映射成props传递给路由组件
    props ($route) {
      return {
        orderId: $route.query.orderId
      }
    },
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from, next) {
      if (from.path === '/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: {
      show: true
    },
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from, next) {
      if (from.path === '/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    children: [
      {
        path: 'myorder',
        component: () => import('@/views/Center/myOrder'),
        meta: {
          show: true
        }
      },
      {
        path: 'groupOrder',
        component: () => import('@/views/Center/groupOrder'),
        meta: {
          show: true
        }
      },

      {
        path: '',
        redirect: 'myorder'
      }
    ],
    meta: {
      show: true
    }
  },

  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]
