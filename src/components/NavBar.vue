<template>
  <q-header class="nexus-nav text-white" height-hint="98">
    <q-toolbar class="q-px-lg q-py-md">
      <q-toolbar-title
        class="text-mono text-bold text-h5 cursor-pointer"
        @click="router.push('/')"
      >
        <span class="text-primary">></span> NEXUS_
      </q-toolbar-title>

      <div class="gt-sm row q-gutter-md">
        
        <div class="relative-position" @mouseenter="openMenu('sys')" @mouseleave="scheduleClose">
          <q-btn
            flat
            label="Návrh systému"
            class="text-mono nav-btn"
            :class="{ 'text-primary': activeMenu === 'sys' }"
            to="/architecture"
          />
          <q-menu :model-value="activeMenu === 'sys'" content-class="nexus-overlay-menu" :offset="[0, 15]" no-parent-event fit @mouseenter="cancelClose" @mouseleave="scheduleClose">
            <div class="q-pa-md bg-dark text-white border-primary">
              <div class="text-mono text-primary q-mb-sm">// ARCHITECTURE</div>
              <div class="text-caption" style="max-width: 200px">
                Detailní workflow: Analýza -> EDA -> Firmware.
              </div>
            </div>
          </q-menu>
        </div>

        <div class="relative-position" @mouseenter="openMenu('meet')" @mouseleave="scheduleClose">
          <q-btn
            flat
            label="Domluvení schůzky"
            class="text-mono nav-btn"
            :class="{ 'text-primary': activeMenu === 'meet' }"
            to="/consultation"
          />
          <q-menu :model-value="activeMenu === 'meet'" content-class="nexus-overlay-menu" :offset="[0, 15]" no-parent-event fit @mouseenter="cancelClose" @mouseleave="scheduleClose">
            <div class="q-pa-md bg-dark text-white border-primary">
              <div class="text-mono text-primary q-mb-sm">// CONSULTATION</div>
              <div class="text-caption" style="max-width: 200px">
                Rezervace termínu pro úvodní analýzu vašeho projektu.
              </div>
            </div>
          </q-menu>
        </div>

        <div class="relative-position" @mouseenter="openMenu('work')" @mouseleave="scheduleClose">
          <q-btn
            flat
            label="Naše práce"
            class="text-mono nav-btn"
            :class="{ 'text-primary': activeMenu === 'work' }"
            to="/portfolio"
          />
          <q-menu :model-value="activeMenu === 'work'" content-class="nexus-overlay-menu" :offset="[0, 15]" no-parent-event fit @mouseenter="cancelClose" @mouseleave="scheduleClose">
            <div class="q-pa-md bg-dark text-white border-primary">
              <div class="text-mono text-primary q-mb-sm">// PORTFOLIO_LOG</div>
              <div class="text-caption" style="max-width: 200px">
                Archiv realizovaných řešení: IoT prototypy a automatizace.
              </div>
            </div>
          </q-menu>
        </div>

        <div class="relative-position" @mouseenter="openMenu('contact')" @mouseleave="scheduleClose">
          <q-btn
            outline
            color="primary"
            label="Kontakty"
            class="text-mono nav-btn"
            :class="{ 'bg-primary text-dark': activeMenu === 'contact' }"
            to="/contact"
          />
          <q-menu :model-value="activeMenu === 'contact'" content-class="nexus-overlay-menu" :offset="[0, 15]" no-parent-event fit @mouseenter="cancelClose" @mouseleave="scheduleClose">
            <div class="q-pa-md bg-dark text-white border-primary">
              <div class="text-mono text-primary q-mb-sm">// CONNECT</div>
              <div class="text-caption" style="max-width: 200px">
                Přímé spojení. Email, LinkedIn a fakturační údaje.
              </div>
            </div>
          </q-menu>
        </div>

      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeMenu = ref(null);
let timer;

const openMenu = (menuId) => {
  clearTimeout(timer);
  activeMenu.value = menuId;
};

const scheduleClose = () => {
  timer = setTimeout(() => {
    activeMenu.value = null;
  }, 150);
};

const cancelClose = () => {
  clearTimeout(timer);
};
</script>

<style scoped>
.nexus-nav {
  background: rgba(5, 5, 16, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-btn {
  transition: all 0.3s ease;
}

.nav-btn:hover {
  color: #7df9ff;
}
</style>

<style>
.nexus-overlay-menu {
  background: rgba(5, 5, 16, 0.95) !important;
  border: 1px solid #7df9ff;
  box-shadow: 0 0 15px rgba(125, 249, 255, 0.1);
  border-radius: 0px !important;
}
</style>