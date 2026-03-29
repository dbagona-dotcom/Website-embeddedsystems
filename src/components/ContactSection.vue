<template>
  <div class="contact-wrapper q-pa-md">
    
    <transition name="fade" mode="out-in">
      <div v-if="!formSubmitted" class="form-container" key="form">
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <q-input dark filled v-model="form.email" label="Váš Email" class="q-mb-md tech-input" color="primary">
              <template v-slot:prepend><q-icon name="email" color="grey" /></template>
            </q-input>

            <q-input dark filled v-model="form.name" label="Jméno / Firma" class="q-mb-md tech-input" color="primary">
              <template v-slot:prepend><q-icon name="badge" color="grey" /></template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <q-input 
              dark filled 
              v-model="form.message" 
              type="textarea" 
              label="Zpráva pro velení (nebo zadej kód)" 
              class="tech-input full-height-input"
              color="primary"
              rows="4"
            />
          </div>
        </div>

        <div class="text-right q-mt-lg">
          <q-btn 
            unelevated 
            color="primary" 
            text-color="dark" 
            label="INITIATE UPLINK" 
            icon-right="send"
            class="text-bold q-px-xl q-py-sm"
            @click="submitForm"
          />
        </div>
      </div>

      <div v-else class="terminal-container bg-black text-green-13 font-mono shadow-up-10 border-top q-pa-md" key="terminal">
        <div class="row items-center q-mb-md text-grey-6 border-bottom q-pb-xs">
          <q-icon name="terminal" class="q-mr-sm" />
          <div class="text-caption">NEXUS_UPLINK_V4.2 [TRANSMITTING]</div>
        </div>
        <div class="terminal-body" style="height: 200px; overflow-y: auto;">
          <div v-for="(log, i) in logs" :key="i">
            <span class="text-grey-5">{{ log.time }}</span> <span class="text-bold q-mr-sm">></span> {{ log.text }}
          </div>
          <div v-if="loading"><span class="blink">_</span></div>
        </div>
        <div class="q-mt-md text-center" v-if="!loading">
          <q-btn outline color="green-13" label="NOVÁ ZPRÁVA" @click="resetForm" size="sm" />
        </div>
      </div>
    </transition>

    <q-dialog v-model="showEasterEgg" backdrop-filter="blur(10px)">
      <q-card class="bg-dark text-white border-primary" style="min-width: 350px">
        <q-card-section class="column items-center text-center q-pa-lg">
          
          <q-icon name="smart_toy" size="80px" color="amber" class="q-mb-md glow-icon" />
          
          <div class="text-h4 text-bold text-amber q-mb-sm">42</div>
          <div class="text-h6">Odpověď na základní otázku života, vesmíru a vůbec.</div>
          
          <q-separator dark class="q-my-md full-width" />
          
          <p class="text-grey-4">
            "Nebojte se, na výpočet této odpovědi nebudete muset čekat 7,5 milionu let."
          </p>
          
          <div class="text-caption text-primary q-mt-md">
            > SYSTEM_MESSAGE: You found the secret.
          </div>
        </q-card-section>
        
        <q-card-actions align="center" class="q-pb-md">
          <q-btn flat label="CLOSE" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const formSubmitted = ref(false)
const loading = ref(false)
const showEasterEgg = ref(false) // Nová proměnná pro dialog

const form = ref({ email: '', name: '', message: '' })
const logs = ref([])

const submitForm = () => {
  // 1. KONTROLA EASTER EGGU
  if (form.value.message.trim() === '42') {
    showEasterEgg.value = true
    return // Ukončíme funkci, neodesíláme nic
  }

  // 2. STANDARDNÍ VALIDACE
  if (!form.value.email || !form.value.message) {
    $q.notify({ type: 'warning', message: 'Vyplňte prosím email a zprávu.', position: 'top' })
    return
  }

  // 3. STANDARDNÍ ODESLÁNÍ (Matrix efekt)
  formSubmitted.value = true
  loading.value = true
  logs.value = []

  addLog('SYSTEM_INIT', 'Validating input data...')
  setTimeout(() => addLog('NET', `Connecting to secure server...`), 800)
  setTimeout(() => addLog('CRYPT', 'Encrypting message payload (AES-256)...'), 1600)
  setTimeout(() => addLog('UPLOAD', 'Packet sending: 100%...'), 3000)
  setTimeout(() => {
    addLog('SUCCESS', 'Message delivered to Architect.')
    loading.value = false
    $q.notify({ type: 'positive', message: 'Zpráva úspěšně odeslána.' })
  }, 3800)
}

const addLog = (prefix, text) => {
  const time = new Date().toLocaleTimeString('cs-CZ', { hour12: false })
  logs.value.push({ time: `[${time}] ${prefix}`, text })
}

const resetForm = () => {
  form.value = { email: '', name: '', message: '' }
  formSubmitted.value = false
}
</script>

<style scoped>
.tech-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.full-height-input :deep(.q-field__control),
.full-height-input :deep(.q-field__native) {
  height: 100%;
  min-height: 130px;
}
.font-mono { font-family: 'Courier New', Courier, monospace; }
.text-green-13 { color: #00ff00; text-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
.border-top { border-top: 2px solid #00ff00; }
.blink { animation: blinker 1s linear infinite; }
@keyframes blinker { 50% { opacity: 0; } }
.border-primary { border: 1px solid #FFC107; box-shadow: 0 0 20px rgba(255, 193, 7, 0.2); }
.glow-icon { filter: drop-shadow(0 0 10px #FFC107); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>