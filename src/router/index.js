import { createRouter, createWebHashHistory } from 'vue-router'
import { showFullLoading, hideFullLoading } from '@/utils.js'
import { getStorage } from '@/storage.js'
import { notice } from '@/utils.js'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/home',
    meta: {
      title: '后台首页'
    },
    component: () => import('@/views/layout/Admin.vue'),
    children: [
      {
        path: '/home',
        name: 'hame',
        meta: {
          title: '后台首页'
        },
        component: () => import('@/views/layout/Home.vue')
      },
      {
        path: '/resident/list',
        name: '/resident/list',
        meta: {
          title: '居民管理'
        },
        component: () => import('@/views/resident/List.vue')
      },
      {
        path: '/vaccine/list',
        name: '/vaccine/list',
        meta: {
          title: '疫苗管理'
        },
        component: () => import('@/views/vaccine/List.vue')
      },
      {
        path: '/inoculate/list',
        name: '/inoculate/list',
        meta: {
          title: '接种管理'
        },
        component: () => import('@/views/inoculate/List.vue')
      },
      {
        path: '/inoculate_point/list',
        name: '/inoculate_point/list',
        meta: {
          title: '接种点管理'
        },
        component: () => import('@/views/inoculatePoint/List.vue')
      },
      {
        path: '/system/user',
        name: '/system/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/system/User.vue')
      },
      {
        path: '/system/role',
        name: '/system/role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/system/Role.vue')
      },
      {
        path: '/system/access',
        name: '/system/access',
        meta: {
          title: '权限管理'
        },
        component: () => import('@/views/system/Access.vue')
      }
    ]
  }
]

// 动态路由
// const asyncRoutes = [
//   {
//     path: '/resident',
//     name: '/resident',
//     meta: {
//       title: '居民管理'
//     },
//     component: () => import('@/views/resident/List.vue')
//   }
// ]
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  showFullLoading()
  // 判断是否登录
  const token = getStorage('token')
  if (!token && to.path !== '/login' && to.path !== '/register') {
    router.push('/login')
    return
  }
  // 避免重复登录
  if (token && to.path == '/login') {
    notice({ type: 'warning', message: '请勿重复登录' })
    next({ path: from.path ? from.path : '/login' })
    return
  }

  // 如果用户登录了，动态添加路由
  // if (token) {
  //   const user_info = JSON.parse(getStorage('user_info'))
  //   // addRoutes(user_info.menus)
  // }

  if (to.meta.title) {
    document.title = `社区新冠疫苗接种系统-${to.meta.title}`
  }
  next()
})

router.afterEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register') {
    const user_info = JSON.parse(getStorage('user_info'))
    // console.log(user_info)
  }
  hideFullLoading()
})

// 动态添加路由方法
// function addRoutes(menus) {
//   const findAndRoutesByMenus = arr => {
//     arr.forEach(e => {
//       let item = asyncRoutes.find(o => o.path == e.path)
//       if (item && !router.hasRoute(item.path)) {
//         router.addRoute('home', item)
//       }
//       if (e.children && e.children.length > 0) {
//         findAndRoutesByMenus(e.children)
//       }
//     })
//   }
//   findAndRoutesByMenus(menus)
//   console.log(router.getRoutes())
// }
