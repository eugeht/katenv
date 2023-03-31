import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Types
import type { TheNavigationPosition } from '../types/TheNavigation'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        // menu: <TheNavigationPosition>'bottom-spaced',
        menu: <TheNavigationPosition>'bottom',
      },
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (GameView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GameView.vue'),
      meta: {
        back: <TheNavigationPosition>'top',
      },
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (ChatView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatView.vue'),
      meta: {
        menu: <TheNavigationPosition>'bottom',
      },
    },
    {
      path: '/listen',
      name: 'listen',
      // route level code-splitting
      // this generates a separate chunk (ListenView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListenView.vue'),
      meta: {
        menu: <TheNavigationPosition>'bottom',
      },
    },
    {
      path: '/watch',
      name: 'watch',
      // route level code-splitting
      // this generates a separate chunk (WatchView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WatchView.vue'),
      meta: {
        menu: <TheNavigationPosition>'bottom-white',
      },
    },
    {
      path: '/wall',
      name: 'wall',
      // route level code-splitting
      // this generates a separate chunk (WallView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WallView.vue'),
      meta: {
        menu: <TheNavigationPosition>'top',
      },
    },
    {
      path: '/gigs',
      name: 'gigs',
      // route level code-splitting
      // this generates a separate chunk (WallView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GigsView.vue'),
      meta: {
        menu: <TheNavigationPosition>'bottom-white',
      },
    },
  ]
})

export default router
