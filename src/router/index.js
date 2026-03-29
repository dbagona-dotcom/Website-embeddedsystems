import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    component: () => import('../pages/IndexPage.vue') 
  },
  { 
    path: '/architecture', 
    component: () => import('../pages/IndexPage.vue') // POZOR: Tady jsme asi měli ArchitecturePage, opravuji níže
  },
  { 
    path: '/consultation', 
    component: () => import('../pages/ConsultationPage.vue') 
  },
  { 
    path: '/portfolio', 
    component: () => import('../pages/PortfolioPage.vue') 
  },
  { 
    path: '/contact', 
    component: () => import('../pages/ContactPage.vue') 
  }
]

// Oprava ArchitecturePage (ujisti se, že importuješ správný soubor)
routes[1].component = () => import('../pages/ArchitecturePage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router