import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TaskDetail from '@/views/TaskDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'TaskDetail',
      component: TaskDetail,
    },
  ],
})

export default router
