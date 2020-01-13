import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录页
import login from '@/views/login.vue'
// 首页
import index from '@/views/index.vue'
// 欢迎
import welcome from '@/views/welcome.vue'
// 文章列表
import postList from '@/views/postList.vue'
// 文章发布
import article from '@/views/article.vue'

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
      component: index,
      // 重定向-显示欢迎数据
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'postList',
          path: 'postList',
          component: postList
        },
        {
          name: 'article',
          path: 'article',
          component: article
        }
      ]
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
