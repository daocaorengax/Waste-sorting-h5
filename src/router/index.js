import Vue from 'vue'
import VueRouter from 'vue-router'
import { title, titleSeparator } from '@/settings'
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
      meta: {
        title: '登录',
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index/index.vue'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    }
  ]
})

/* 路由跳转前 */
router.beforeEach(async (to, from, next) => {
  console.log('----router baforeEach___to')
  console.log(to, '----to')
  let toMeta = to.meta || {}
  let toQuery = to.query || {}
  console.log('----主router baforeEach___to - toMeta')
  console.log(toMeta, ' -------> to.meta')
  next()
  let preTitle = title
  if (toMeta.title) {
    preTitle = `${toMeta.title}${titleSeparator}${title}`
  }
  document.title = preTitle
})
// router.onError((err) => {
//   console.log('router onError')
//   console.log(err)
// })
export default router
