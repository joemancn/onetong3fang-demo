import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import MyExcel from '@/views/app/MyExcel.vue'
import DashBoard from '@/views/app/DashBoard.vue'
import Analysis from '@/views/app/Analysis.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/excel',
      component: MyExcel
    },
    {
      path: '/report',
      component: MyExcel
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          component: DashBoard
        },
        {
          path: '/analysis',
          component: Analysis
        }
      ]
    }
  ]
})

export default router
