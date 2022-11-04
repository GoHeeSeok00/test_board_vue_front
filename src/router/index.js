import { createRouter, createWebHashHistory } from 'vue-router'
import BoardsView from '../views/BoardsView.vue'

const routes = [
  {
    path: '/',
    name: 'boards',
    component: BoardsView
  },
  {
    path: '/boards/:id',
    name: 'board-detail',
    component: () => import('../views/BoardDetailView.vue')
  },
  {
    path: '/boards/create',
    name: 'board-create',
    component: () => import('../views/BoardCreateView.vue')
  },
  {
    path: '/boards/update/:id',
    name: 'board-update',
    component: () => import('../views/BoardUpdateView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue')
  // },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;