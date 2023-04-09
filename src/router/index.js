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
    path: '/home',
    name: 'home',
    meta: {
      title: '后台首页'
    },
    component: () => import('@/views/layout/Home.vue')
  }
]

const router = createRouter({
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
  if (!token && to.path !== '/login') {
    router.push('/login')
    return
  }
  // 避免重复登录
  if (token && to.path == '/login') {
    notice({ type: 'warning', message: '请勿重复登录' })
    next({ path: from.path ? from.path : '/login' })
  }
  if (to.meta.title) {
    document.title = `社区新冠疫苗接种系统-${to.meta.title}`
  }
  next()
})

router.afterEach((to, from, next) => {
  hideFullLoading()
})
export default router
