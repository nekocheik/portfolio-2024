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
      path: '/projets',
      component: () => import('../views/Projets.vue'),
      name: 'projets',
      children: [
        {
          path: '/projets/:id',
          component: () => import('../views/projet.vue'),
          name: 'projet'
        }
      ]
    },
  ]
})

export default router
