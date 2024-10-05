import { createRouter, createWebHistory } from 'vue-router'
import Products from './components/Pages/Products.vue'
import Basket from './components/Pages/Basket.vue'

const routes = [
  {
    path: '/',
    name: 'Product listing',
    component: Products,
    // We'll use a query parameter `page` to handle the pagination.
    props: (route) => ({ page: parseInt(route.query.page as string) || 1 }),
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket, // Set BasketView as the component for this route
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
