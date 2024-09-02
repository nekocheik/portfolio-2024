import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import useLayerTransition from '@/store/transitionLayer.ts'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projets/:id',
      component: () => import('../views/Projets.vue'),
      name: 'projets'
    },
    {
      path: '/who-i-am',
      component: () => import('../views/Whoiam.vue'),
      name: 'whoiam'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const layerTransition = useLayerTransition()

  layerTransition.isVisible = true
  setTimeout(() => {
    next()
  }, 1000)
})

router.afterEach((to, from, next) => {
  const layerTransition = useLayerTransition()

  layerTransition.isVisible = false

  return true
})

export default router
