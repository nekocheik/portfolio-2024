import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue') as any
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
