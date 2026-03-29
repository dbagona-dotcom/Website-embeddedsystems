<template>
  <q-page class="bg-dark text-white q-pa-xl relative-position">
    
    <div class="text-center q-mb-xl">
      <div class="text-mono text-primary text-h6">> ACCESSING_ARCHIVE</div>
      <h1 class="text-h3 text-bold q-mt-sm">NAŠE PROJEKTY</h1>
      <p class="text-grey-5 text-subtitle1">
        Databáze realizovaných technických řešení.
      </p>
    </div>

    <div class="container" style="max-width: 1000px; margin: 0 auto;">
      
      <div 
        v-for="(project, index) in projectsDB" 
        :key="index"
        class="project-row q-mb-lg relative-position"
        @click="openDocs(project)"
      >
        <div class="row items-center bg-grey-9 q-pa-md rounded-borders border-hover cursor-pointer shadow-2">
          
          <div class="col-12 col-md-3">
            <q-img 
              :src="project.image" 
              class="rounded-borders" 
              style="height: 120px; border: 1px solid #333;"
            />
          </div>

          <div class="col-12 col-md-7 q-px-md">
            <div class="text-mono text-primary text-caption q-mb-xs">
              // PROJECT_ID: 00{{ index + 1 }}
            </div>
            <div class="text-h5 text-bold">{{ project.title }}</div>
            <div class="text-grey-4 text-body2 q-mt-xs ellipsis-2-lines">
              {{ project.shortDesc }}
            </div>
            
            <div class="row q-gutter-sm q-mt-md">
              <q-badge outline color="grey-5" v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </q-badge>
            </div>
          </div>

          <div class="col-12 col-md-2 text-right">
            <q-btn 
              round 
              color="primary" 
              text-color="dark" 
              icon="description" 
              class="glow-btn"
            />
            <div class="text-caption text-grey-6 q-mt-sm">DOKUMENTACE</div>
          </div>

        </div>
      </div>

    </div>

    <div class="text-center q-mt-xl">
      <q-btn outline color="primary" label="< ZPĚT NA DASHBOARD" to="/" />
    </div>

    <q-dialog 
      v-model="dialogOpen" 
      maximized 
      transition-show="slide-up" 
      transition-hide="slide-down"
    >
      <q-card class="bg-dark text-white">
        
        <q-toolbar class="bg-grey-9 text-white border-bottom-primary">
          <q-btn flat round dense icon="arrow_back" v-close-popup />
          <q-toolbar-title class="text-mono">
            DOCS_VIEWER: <span class="text-primary">{{ activeProject.title }}</span>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pa-xl container" style="max-width: 1200px; margin: 0 auto;">
          
          <div class="row q-col-gutter-xl">
            <div class="col-12 col-md-8">
              <q-img 
                :src="activeProject.image" 
                class="rounded-borders q-mb-lg border-primary"
                style="max-height: 400px;"
              />
              
              <div class="text-h4 text-bold q-mb-md">Technický popis</div>
              <p class="text-body1 text-grey-4" style="line-height: 1.6;">
                {{ activeProject.fullDesc }}
              </p>

              <div class="text-h5 text-bold q-mt-xl q-mb-md">Použité technologie</div>
              <ul class="text-grey-4 text-body1">
                <li v-for="tech in activeProject.techDetails" :key="tech">{{ tech }}</li>
              </ul>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="bg-grey-9 q-pa-md">
                <div class="text-mono text-primary q-mb-md">> SPEC_SHEET</div>
                
                <div class="q-mb-md">
                  <div class="text-caption text-grey">Platforma</div>
                  <div class="text-h6">{{ activeProject.platform }}</div>
                </div>

                <div class="q-mb-md">
                  <div class="text-caption text-grey">Jazyk</div>
                  <div class="text-h6">{{ activeProject.language }}</div>
                </div>

                <div class="q-mb-md">
                  <div class="text-caption text-grey">Rok realizace</div>
                  <div class="text-h6">{{ activeProject.year }}</div>
                </div>

                <q-separator dark class="q-my-lg" />
                
                <q-btn outline color="primary" class="full-width" label="STÁHNOUT PDF (Simulace)" icon="download" />
              </q-card>
            </div>
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 1. IMPORT

const route = useRoute() // 2. INICIALIZACE
const dialogOpen = ref(false)
const activeProject = ref({})

// --- DATABÁZE PROJEKTŮ ---
const projectsDB = [
  {
    title: "Autonomní Vozidlo", // Upraveno aby sedělo s Indexem (bylo tam Eurobot navíc)
    shortDesc: "Soutěžní robot s LIDAR navigací a sběrem objektů.",
    fullDesc: "Tento projekt se zaměřuje na vývoj plně autonomního mobilního robota pro mezinárodní soutěž Eurobot. Robot využívá diferenciální podvozek řízený mikrokontrolérem STM32. Pro navigaci a strategické rozhodování je použit jednodeskový počítač Raspberry Pi 4, který zpracovává data z LIDARu a kamery pomocí knihovny OpenCV. Algoritmus A* zajišťuje plánování trasy v reálném čase s vyhýbáním se dynamickým překážkám.",
    image: "/image_d65bf7.jpg",
    tags: ["Robotics", "C++", "Python", "LIDAR"],
    techDetails: [
      "MCU: STM32F407 (Motor Control, PID)",
      "Brain: Raspberry Pi 4 (ROS 2, OpenCV)",
      "Senzory: RPLidar A1, Enkodéry, IMU",
      "Power: LiPo 4S, Custom PCB Power Management"
    ],
    platform: "STM32 + RPi",
    language: "C++ / Python",
    year: "2024"
  },
  {
    title: "Průmyslová Automatizace", // Upraveno aby sedělo s Indexem
    shortDesc: "Monitorování prostředí ve výrobní hale s MQTT.",
    fullDesc: "Systém pro sběr environmentálních dat (teplota, vlhkost, CO2, vibrace strojů) v průmyslovém prostředí. Jednotlivé nody jsou postaveny na čipu ESP32 a komunikují přes Wi-Fi pomocí protokolu MQTT. Data jsou agregována v Node-RED a vizualizována v Grafaně. Součástí je i alarmový systém při překročení limitních hodnot.",
    image: "/image_d65bdc.png",
    tags: ["IoT", "ESP32", "MQTT", "Grafana"],
    techDetails: [
      "Node: ESP32-WROOM-32",
      "Komunikace: MQTT over Wi-Fi (WPA2-Enterprise)",
      "Backend: Docker, InfluxDB, Grafana",
      "Sleep Mode: Deep Sleep s probouzením přes RTC"
    ],
    platform: "ESP32",
    language: "C++ (Arduino FW)",
    year: "2023"
  },
  {
    title: "FPGA Design", // Upraveno aby sedělo s Indexem
    shortDesc: "Hardwarová implementace AES-256 na Artix-7.",
    fullDesc: "Projekt zaměřený na vysokorychlostní šifrování dat. Implementace algoritmu AES-256 přímo v hradlovém poli (FPGA) umožňuje dosáhnout propustnosti v řádu gigabitů za sekundu, což je řádově rychlejší než softwarové řešení na běžném CPU. Návrh byl realizován v jazyce VHDL s důrazem na pipelining a paralelní zpracování.",
    image: "/image_d658d5.png",
    tags: ["FPGA", "VHDL", "Security", "Xilinx"],
    techDetails: [
      "Chip: Xilinx Artix-7",
      "Interface: PCIe Gen2 x4",
      "Architektura: 128-bit Pipeline",
      "Verifikace: Testbench v ModelSim"
    ],
    platform: "Xilinx Vivado",
    language: "VHDL",
    year: "2023"
  },
  {
    title: "Smart Energy Meter",
    shortDesc: "Vlastní hardware pro měření spotřeby celého domu.",
    fullDesc: "Návrh a realizace vlastního hardware pro neinvazivní měření spotřeby elektrické energie na 3 fázích. Zařízení využívá proudová trafa (CT) a dedikovaný měřicí čip ATM90E32 pro vysokou přesnost. Data o napětí, proudu a účiníku jsou odesílána každou sekundu do systému Home Assistant.",
    image: "/project_energy.jpg", 
    tags: ["Hardware", "PCB", "Home Assistant"],
    techDetails: [
      "ADC: ATM90E32 (Energy Metering IC)",
      "MCU: ESP32-S3",
      "PCB: 4-vrstvá deska, oddělená VN část",
      "Integrace: ESPHome / YAML"
    ],
    platform: "Custom PCB",
    language: "C++ / YAML",
    year: "2025"
  },
  {
    title: "Drone Flight Controller",
    shortDesc: "Vlastní řídicí jednotka pro kvadrokoptéru.",
    fullDesc: "Vývoj kompletního 'mozku' pro dron od nuly. Nejedná se o použití hotového řešení (Betaflight), ale o vlastní implementaci stabilizačních algoritmů a mixeru motorů. Deska obsahuje STM32F7, gyroskop MPU6000 a barometr. Firmware zajišťuje čtení senzorů při 8kHz a výpočet PID smyčky.",
    image: "/project_drone.jpg",
    tags: ["Embedded", "STM32", "Control Theory"],
    techDetails: [
      "MCU: STM32F745 (216 MHz)",
      "IMU: MPU6000 (SPI)",
      "Protokol: DSHOT600 pro ESC",
      "Algoritmy: Kaskádní PID regulace, Quaterniony"
    ],
    platform: "STM32 HAL",
    language: "Embedded C",
    year: "2024"
  }
]

const openDocs = (project) => {
  activeProject.value = project
  dialogOpen.value = true
}

// 3. AUTOMATICKÉ OTEVŘENÍ PŘI NAČTENÍ
onMounted(() => {
  const projectTitle = route.query.project
  if (projectTitle) {
    // Najdeme projekt, který má stejný název (nebo obsahuje část názvu)
    const foundProject = projectsDB.find(p => p.title.includes(projectTitle))
    if (foundProject) {
      openDocs(foundProject)
    }
  }
})
</script>

<style scoped>
.border-hover {
  border: 1px solid transparent;
  transition: all 0.3s ease;
}
.border-hover:hover {
  border-color: #7DF9FF;
  transform: translateX(10px);
  background: #212121;
}
.glow-btn { box-shadow: 0 0 10px rgba(125, 249, 255, 0.2); }
.border-bottom-primary { border-bottom: 1px solid #7DF9FF; }
.border-primary { border: 1px solid #7DF9FF; }
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>