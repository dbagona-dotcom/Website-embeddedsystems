<template>
  <q-page class="bg-dark text-white q-pa-xl relative-position overflow-hidden">
    
    <div class="absolute-full">
      <q-img 
        src="/consultation_bg.jpg" 
        class="fit" 
        style="filter: brightness(0.3) blur(2px); object-fit: cover;"
      >
        <template v-slot:error>
          <div class="absolute-full bg-dark"></div>
        </template>
      </q-img>
    </div>

    <div class="container relative-position" style="z-index: 2; max-width: 1200px; margin: 0 auto;">
      
      <div class="text-center q-mb-xl">
        <div class="text-mono text-primary text-h6">> INITIALIZE_COLLABORATION</div>
        <h1 class="text-h3 text-bold q-mt-sm">ZAHÁJENÍ SPOLUPRÁCE</h1>
        <p class="text-grey-4 text-subtitle1" style="max-width: 700px; margin: 0 auto;">
          Nezávazná poptávka. Vyberte parametry projektu a preferovaný čas konzultace.
        </p>
      </div>

      <div class="row q-col-gutter-xl justify-center">
        
        <div class="col-12 col-md-5">
          <div class="q-mb-xl">
            <div class="text-mono text-primary q-mb-sm text-caption">// 01_PROJECT_SCOPE (Filtr)</div>
            <q-btn-toggle
              v-model="form.type"
              spread
              no-caps
              rounded
              toggle-color="primary"
              color="grey-9"
              text-color="grey-5"
              toggle-text-color="dark"
              :options="[
                {label: 'Firmware', value: 'fw'},
                {label: 'PCB Design', value: 'pcb'},
                {label: 'Full-Stack', value: 'full'}
              ]"
              class="border-primary shadow-box"
            />
          </div>

          <div class="q-mb-lg">
            <div class="text-mono text-primary q-mb-sm text-caption">// 02_REFERENCE_PROJECTS ({{ filteredProjects.length }})</div>
            
            <transition-group 
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut absolute"
              tag="div"
              class="q-list dark separator rounded-borders bg-transparent-dark relative-position"
            >
              <q-item 
                v-for="proj in filteredProjects" 
                :key="proj.title" 
                clickable 
                v-ripple 
                @click="showPrice(proj)" 
                class="hover-effect q-mb-sm"
              >
                <q-item-section avatar>
                  <q-avatar rounded size="40px">
                    <img :src="proj.image" style="object-fit: cover;">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold">{{ proj.title }}</q-item-label>
                  <q-item-label caption class="text-grey-5">{{ proj.shortDesc }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip outline color="primary" size="sm" icon="payments" clickable>Info</q-chip>
                </q-item-section>
              </q-item>
            </transition-group>

          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="text-mono text-primary q-mb-sm text-caption">// 03_SELECT_DATE_&_CONTACT</div>
          <q-card dark bordered class="bg-transparent-dark border-glow q-pa-lg">
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-12 col-sm-6">
                <q-input dark filled v-model="form.date" label="Datum schůzky" mask="date" :rules="['date']" color="primary" class="tech-input">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer text-primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.date" dark color="primary" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-6">
                <q-input dark filled v-model="form.time" label="Čas" mask="time" :rules="['time']" color="primary" class="tech-input">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer text-primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="form.time" dark color="primary" format24h />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <q-input dark filled v-model="form.email" label="Váš pracovní Email" type="email" color="primary" class="q-mb-xl tech-input" hint="Na tento email vám přijde potvrzení.">
              <template v-slot:prepend><q-icon name="alternate_email" color="grey-5" /></template>
            </q-input>

            <q-btn unelevated color="primary" text-color="dark" class="full-width text-bold q-py-md text-h6" label="ODESLAT POPTÁVKU" icon-right="send" @click="submitForm" />
             <div class="text-center text-grey-6 text-caption q-mt-md">Kliknutím odešlete nezávaznou poptávku.</div>
          </q-card>
        </div>
      </div>

      <div class="text-center q-mt-xl">
        <q-btn flat color="grey" label="< ZPĚT NA DASHBOARD" to="/" />
      </div>
    </div>

    <q-dialog v-model="priceDialog" backdrop-filter="blur(4px)">
      <q-card class="bg-dark text-white border-primary shadow-glow" style="width: 450px; border: 1px solid #7DF9FF;">
        <q-card-section class="bg-grey-9">
          <div class="text-h6 text-primary">> {{ activePriceItem.title }}</div>
          <div class="text-subtitle2 text-grey">Orientační kalkulace</div>
        </q-card-section>
        <q-card-section class="q-pt-md">
          <div class="row justify-between items-center q-mb-md">
            <span class="text-grey-4">Kategorie:</span>
            <q-badge color="grey-8">{{ activePriceItem.category === 'fw' ? 'FIRMWARE' : activePriceItem.category === 'pcb' ? 'PCB DESIGN' : 'FULL-STACK' }}</q-badge>
          </div>
          <div class="row justify-between items-center q-mb-md">
            <span class="text-grey-4">Náročnost:</span>
            <q-badge :color="activePriceItem.color" class="q-py-xs q-px-sm">{{ activePriceItem.difficulty }}</q-badge>
          </div>
          <div class="row justify-between items-center q-mb-md">
            <span class="text-grey-4">Doba vývoje:</span>
            <span class="text-bold">{{ activePriceItem.duration }}</span>
          </div>
          <q-separator dark class="q-my-md" />
          <div class="row justify-between items-center">
            <span class="text-h6 text-grey-4">Budget od:</span>
            <span class="text-h4 text-primary text-bold">{{ activePriceItem.price }}</span>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Rozumím" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="terminalOpen" persistent maximized transition-show="fade" transition-hide="fade">
      <div class="bg-black text-green-13 q-pa-xl font-mono flex flex-center" style="opacity: 0.95">
        <div style="max-width: 800px; width: 100%">
          <div class="text-h4 q-mb-lg">> SYSTEM_UPLINK</div>
          <div class="column q-gutter-y-sm text-h6">
            <div v-for="(line, index) in terminalLogs" :key="index">{{ line }}</div>
            <div v-if="loadingTerminal">> <span class="blink">_</span></div>
          </div>
          <div class="q-mt-xl text-center" v-if="!loadingTerminal">
             <q-btn outline color="green-13" label="ZAVŘÍT TERMINÁL" v-close-popup />
          </div>
        </div>
      </div>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue' // PŘIDÁNO: computed
import { useQuasar } from 'quasar'

const $q = useQuasar()

const form = ref({ type: 'full', date: '2026-02-15', time: '10:00', email: '' }) // Default 'full' aby bylo vidět vše

// --- DATABÁZE VŠECH PROJEKTŮ PRO FILTRACI ---
const allProjects = [
  { 
    title: 'Autonomní Robot', 
    shortDesc: 'Komplexní robotika & AI',
    image: "/image_d65bf7.jpg",
    category: 'full', // Kategorie pro filtraci
    difficulty: 'EXTRÉMNÍ', color: 'red', duration: '3 - 5 měsíců', price: '85.000 Kč' 
  },
  { 
    title: 'IoT Senzorická Síť', 
    shortDesc: 'Sběr dat & Cloud dashboard',
    image: "/image_d65bdc.png",
    category: 'full',
    difficulty: 'STŘEDNÍ', color: 'orange', duration: '1 - 2 měsíce', price: '45.000 Kč' 
  },
  { 
    title: 'FPGA Akcelerátor', 
    shortDesc: 'High-speed processing',
    image: "/image_d658d5.png",
    category: 'fw', // FPGA bereme jako Firmware (kód)
    difficulty: 'VYSOKÁ', color: 'deep-orange', duration: '2 - 3 měsíce', price: '60.000 Kč' 
  },
  { 
    title: 'Smart Energy Meter', 
    shortDesc: 'Měření spotřeby a HW návrh',
    image: "/project_energy.jpg",
    category: 'pcb', // Čistě PCB/HW
    difficulty: 'STŘEDNÍ', color: 'blue', duration: '1 měsíc', price: '30.000 Kč' 
  },
  { 
    title: 'Drone Controller', 
    shortDesc: 'Vlastní řídící jednotka',
    image: "/project_drone.jpg",
    category: 'fw', // Kombinace, ale dejme FW (algoritmy)
    difficulty: 'VYSOKÁ', color: 'purple', duration: '2 - 4 měsíce', price: '55.000 Kč' 
  }
]

// --- COMPUTED FILTR ---
// Toto automaticky vrací jen ty projekty, které odpovídají form.type
const filteredProjects = computed(() => {
  // Pokud je vybráno 'full', ukážeme všechno, co je full, NEBO pokud chceš úplně všechno tak smaž podmínku.
  // Ale ty jsi chtěl filtr. Takže:
  
  // Pokud uživatel vybere 'full', ukážeme Full-Stack projekty + ty co jsou těžké (Autonomní vozidlo, IoT)
  // Pokud 'pcb', tak Energy Meter.
  // Pokud 'fw', tak FPGA a Dron.
  
  // Můžeme to udělat chytřeji: "full" ukáže VŠE (jako výchozí stav), a ostatní filtrují.
  if (form.value.type === 'full') {
    return allProjects // Ukáže všechno, pokud je přepínač na "Full-Stack" (nebo si to přejmenuj na "Vše")
  }
  
  return allProjects.filter(p => p.category === form.value.type)
})

const priceDialog = ref(false)
const activePriceItem = ref({})

const showPrice = (project) => {
  activePriceItem.value = project
  priceDialog.value = true
}

// --- TERMINÁLOVÁ LOGIKA (Stejná) ---
const terminalOpen = ref(false)
const terminalLogs = ref([])
const loadingTerminal = ref(true)

const submitForm = () => {
  if (!form.value.email || !form.value.email.includes('@')) {
    $q.notify({ type: 'warning', message: 'Zadejte prosím platný email.', position: 'top' })
    return
  }
  terminalOpen.value = true
  terminalLogs.value = []
  loadingTerminal.value = true
  setTimeout(() => terminalLogs.value.push('> INITIALIZING SECURE CONNECTION...'), 500)
  setTimeout(() => terminalLogs.value.push('> CONNECTING TO SERVER [192.168.X.X]...'), 1200)
  setTimeout(() => terminalLogs.value.push('> ENCRYPTING PAYLOAD (AES-256)...'), 2000)
  setTimeout(() => terminalLogs.value.push('> UPLOADING REQUEST PACKET...'), 2800)
  setTimeout(() => {
    terminalLogs.value.push('> SUCCESS: MESSAGE RECEIVED BY HQ.')
    terminalLogs.value.push('> SYSTEM WILL CONTACT YOU SHORTLY.')
    loadingTerminal.value = false
  }, 3800)
}
</script>

<style scoped>
.bg-transparent-dark { background: rgba(10, 10, 20, 0.6); backdrop-filter: blur(10px); }
.border-glow { border: 1px solid rgba(125, 249, 255, 0.3); box-shadow: 0 0 30px rgba(125, 249, 255, 0.05); }
.hover-effect { transition: all 0.3s ease; border-radius: 8px; border: 1px solid transparent; }
.hover-effect:hover { background: rgba(255, 255, 255, 0.05); border: 1px solid #7DF9FF; transform: translateX(5px); }
.shadow-glow { box-shadow: 0 0 50px rgba(125, 249, 255, 0.2); }
.tech-input :deep(.q-field__control) { background: rgba(255, 255, 255, 0.05); }
.font-mono { font-family: 'Courier New', Courier, monospace; letter-spacing: 1px; }
.text-green-13 { color: #00ff00; text-shadow: 0 0 10px #00ff00; }
.blink { animation: blinker 1s linear infinite; }
@keyframes blinker { 50% { opacity: 0; } }

/* Animace pro transition-group */
.animated { animation-duration: 0.5s; animation-fill-mode: both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-10px); } }
.absolute { position: absolute; width: 100%; }
</style>