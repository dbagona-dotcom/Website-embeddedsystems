<template>
  <q-page class="bg-dark">
    <HeroSection />

    <div id="work-section" class="q-pa-xl portfolio-container">
      <h3 class="text-mono text-white q-mb-lg">
        <span class="text-primary">></span> DEPLOYED_UNITS
      </h3>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4 project-item">
          <ProjectCard
            :id="1"
            title="Autonomní Vozidlo"
            image="/image_d65bf7.jpg"
            @open="openProjectDetail"
          />
        </div>

        <div class="col-12 col-md-4 project-item">
          <ProjectCard
            :id="2"
            title="Průmyslová Automatizace"
            image="/image_d65bdc.png"
            @open="openProjectDetail"
          />
        </div>

        <div class="col-12 col-md-4 project-item">
          <ProjectCard
            :id="3"
            title="FPGA Design"
            image="/image_d658d5.png"
            @open="openProjectDetail"
          />
        </div>
      </div>
    </div>

    <div id="contact-section">
      <TeamSection />
      <ContactSection />
    </div>

    <q-dialog
      v-model="dialogOpen"
      transition-show="scale"
      transition-hide="scale"
      backdrop-filter="blur(4px)"
    >
      <q-card
        class="bg-dark text-white border-primary project-dialog"
        style="width: 700px; max-width: 90vw"
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-mono text-primary">
            > SYSTEM_LOG: {{ activeProject.title }}
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="text-grey"
          />
        </q-card-section>

        <q-card-section>
          <q-img
            :src="activeProject.image"
            class="rounded-borders q-mb-md"
            style="height: 200px; object-fit: cover; border: 1px solid #333"
          />

          <div class="text-mono text-caption text-grey q-mb-sm">
            // TECHNICAL_DESCRIPTION
          </div>
          <p>{{ activeProject.desc }}</p>

          <div class="text-mono text-caption text-grey q-mb-sm">
            // TECH_STACK
          </div>
          <div class="row q-gutter-sm">
            <q-badge
              outline
              color="primary"
              v-for="tag in activeProject.tags"
              :key="tag"
              >{{ tag }}</q-badge
            >
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none q-pb-md q-pr-md">
          <q-btn flat label="Zavřít" color="grey" v-close-popup />
          <q-btn
            outline
            label="Dokumentace"
            color="primary"
            icon-right="open_in_new"
            @click="goToDocs"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"; // 1. IMPORT ROUTERU
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "../components/HeroSection.vue";
import ProjectCard from "../components/ProjectCard.vue";
import TeamSection from "../components/TeamSection.vue";
import ContactSection from "../components/ContactSection.vue";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter(); // 2. INICIALIZACE
const dialogOpen = ref(false);
const activeProject = ref({});

const projectsDB = {
  1: {
    title: "Autonomní Vozidlo", // Důležité: tento název se použije pro hledání
    image: "/image_d65bf7.jpg",
    desc: "Vývoj plně autonomního robota pro soutěž Eurobot. Systém využívá STM32 pro řízení motorů a Raspberry Pi pro zpracování obrazu (OpenCV).",
    tags: ["C++", "STM32", "Python", "OpenCV", "PCB Design"],
  },
  2: {
    title: "Průmyslová Automatizace",
    image: "/image_d65bdc.png",
    desc: "Modernizace výrobní linky s využitím PLC Siemens a vlastního IoT senzoru na bázi ESP32.",
    tags: ["PLC", "ESP32", "MQTT", "Node-RED", "Industrial"],
  },
  3: {
    title: "FPGA Design",
    image: "/image_d658d5.png",
    desc: "Akcelerace šifrovacích algoritmů na čipu Xilinx Artix-7.",
    tags: ["VHDL", "FPGA", "Xilinx", "Verilog", "High-Speed"],
  },
};

const openProjectDetail = (id) => {
  if (projectsDB[id]) {
    activeProject.value = projectsDB[id];
    dialogOpen.value = true;
  }
};

// 3. NOVÁ FUNKCE PRO PŘESMĚROVÁNÍ
const goToDocs = () => {
  // Přesměruje na /portfolio a přidá ?project=NazevProjektu
  router.push({ 
    path: '/portfolio', 
    query: { project: activeProject.value.title } 
  });
};

onMounted(() => {
  gsap.from(".project-item", {
    scrollTrigger: {
      trigger: ".portfolio-container",
      start: "top 75%",
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });
});
</script>

<style scoped>
.project-dialog {
  border: 1px solid #7df9ff;
  box-shadow: 0 0 30px rgba(125, 249, 255, 0.2);
}
</style>