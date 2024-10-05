import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Product listing',
    component: App,
    // We'll use a query parameter `page` to handle the pagination.
    props: (route) => ({ page: parseInt(route.query.page as string) || 1 }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
