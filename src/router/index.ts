import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, 
    },
    {
      path: '/projets/:id',
      component: () => import('../views/Projets.vue'),
      name: 'projets',
    },
    {
      path: '/who-i-am',
      component: () => import('../views/Whoiam.vue'),
      name: 'whoiam',
    },
  ]
})

export default router
