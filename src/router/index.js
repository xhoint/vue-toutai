import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'

import index from '@/views/index.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/',
      component: index
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否登录页
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否是登录状态
    let token = localStorage.getItem('ht_token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
