import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/materials',
    name: 'materials',
    component: () => import('@/views/MaterialsView.vue')
  },
  {
    path: '/materials/:slug',
    name: 'material-product',
    component: () => import('@/views/MaterialProductView.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('@/views/EquipmentView.vue')
  },
  {
    path: '/equipment/:slug',
    name: 'equipment-product',
    component: () => import('@/views/EquipmentProductView.vue')
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue')
  },
  {
    path: '/services/:slug',
    name: 'service-product',
    component: () => import('@/views/ServiceProductView.vue')
  },
  // catch-all → редирект на главную
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // если переходили назад/вперёд — восстанавливаем позицию
    if (savedPosition) return savedPosition

    // если в URL якорь — скроллим к элементу с учётом высоты шапки
    if (to.hash) {
      return {
        el: to.hash,
        top: 72, // var(--nav-h)
        behavior: 'smooth'
      }
    }

    // иначе — наверх
    return { top: 0 }
  }
})

export default router
