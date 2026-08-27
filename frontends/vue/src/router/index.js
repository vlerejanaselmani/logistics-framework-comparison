import { createRouter, createWebHistory } from 'vue-router'

import VehicleDetailsPage from '../pages/VehicleDetailsPage.vue'
import VehiclesPage from '../pages/VehiclesPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/vehicles',
  },
  {
    path: '/vehicles',
    component: VehiclesPage,
  },
  {
    path: '/vehicles/:id',
    component: VehicleDetailsPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
