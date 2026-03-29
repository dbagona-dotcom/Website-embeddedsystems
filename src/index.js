import { createRouter, createWebHistory } from "vue-router";

// 1. Importy všech stránek (Tady říkáme, kde ty domy stojí)
import IndexPage from "../pages/IndexPage.vue";
import ArchitecturePage from "../pages/ArchitecturePage.vue";
import ConsultationPage from "../pages/ConsultationPage.vue";
import PortfolioPage from "../pages/PortfolioPage.vue";

const routes = [
  // 2. Definice cest (Tady kreslíme mapu)
  { path: "/", component: IndexPage },
  { path: "/architecture", component: ArchitecturePage },
  { path: "/consultation", component: ConsultationPage },
  { path: "/portfolio", component: PortfolioPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Toto zajistí, že při přechodu na novou stránku vyjedeš nahoru
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
