// 导入vue-router的createRouter和createWebHistory函数
import { createRouter, createWebHistory } from 'vue-router'

// 创建一个Vue Router实例，使用浏览器历史记录模式
// 第一个参数是路由配置对象，包括历史记录的配置和路由规则
const router = createRouter({
  // 配置Vue应用的路由历史和路由规则
  // history: createWebHashHistory(), // 地址带#号
  //参数为应用基础URL，默认为/vite中环境变量, 在vite.config.js中配置,
  history: createWebHistory(import.meta.env.BASE_URL), // 使用createWebHistory函数创建Web历史记录，参数为应用的基础URL
  routes: [
    // 定义应用的路由规则数组，此处为空数组，应根据实际需要添加路由规则
    {
      path:'/login',
      component:()=>import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect:'/article/manage'
    },
    {
      path: '/article/manage',
      component: () => import('@/views/article/ArticleManage.vue')
    },
    {
      path: '/article/channel',
      component: () => import('@/views/article/ArticleChannel.vue')
    },
    {
      path: '/user/profile',
      component: () => import('@/views/user/UserProfile.vue')
    },
    {
      path: '/user/password',
      component: () => import('@/views/user/UserPassword.vue')
    },
    {
      path: '/user/avatar',
      component: () => import('@/views/user/UserAvatar.vue')
    },

  ]
})

// 导出router实例，供其他模块使用
export default router
