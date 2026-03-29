<template>
  <q-page class="bg-dark text-white q-pa-xl relative-position overflow-hidden">
    
    <div class="absolute-full" style="opacity: 0.1; background-image: radial-gradient(#7DF9FF 1px, transparent 1px); background-size: 30px 30px;"></div>

    <div class="container relative-position" style="z-index: 2; max-width: 1100px; margin: 0 auto;">

      <div class="text-center q-mb-xl">
        <div class="text-mono text-primary text-h6">> SECURE_CHANNEL_ESTABLISHED</div>
        <h1 class="text-h3 text-bold q-mt-sm">KONTAKTNÍ SPOJENÍ</h1>
        <p class="text-grey-5 text-subtitle1">
          Přímá linka na vývojové centrum.
        </p>
      </div>

      <div class="row q-col-gutter-lg justify-center q-mb-xl">
        
        <div class="col-12 col-md-7">
          <q-card dark bordered class="bg-dark border-primary shadow-glow q-pa-lg relative-position">
            <div class="absolute-top-right q-pa-md text-mono text-primary text-caption">ID: NEX-2026</div>

            <div class="row items-center">
              <div class="col-12 col-sm-3 text-center q-mb-md-none q-mb-sm">
                <q-avatar size="100px" font-size="50px" color="primary" text-color="dark" icon="fingerprint" class="shadow-box" />
              </div>

              <div class="col-12 col-sm-9 q-pl-md">
                <div class="text-overline text-grey-5">OFFICIAL BUSINESS CONTACT</div>
                
                <div class="text-h4 text-bold text-white q-mb-xs">David Vangár</div>
                <div class="text-primary text-subtitle2 q-mb-md">Lead System Architect</div>

                <q-separator dark class="q-my-md" />

                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-7">
                    <div class="text-caption text-grey">EMAIL UPLINK</div>
                    <div 
                      class="text-body1 text-bold hover-text cursor-pointer copy-btn" 
                      style="word-break: break-all; line-height: 1.2;"
                      @click="copyToClipboard('jsemdavidvangarajmenujisedavidvangar@vangar.com')"
                    >
                      jsemdavidvangarajmenujisedavidvangar@vangar.com
                      <q-icon name="content_copy" size="xs" color="grey-6" class="q-ml-sm" />
                    </div>
                  </div>
                  
                  <div class="col-12 col-sm-5">
                    <div class="text-caption text-grey">VOICE CHANNEL</div>
                    <div class="text-h6 hover-text">
                      <a href="tel:+420123456789" class="text-white non-decorated">+420 123 456 789</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <div class="col-12 col-md-5">
          <q-card dark bordered class="bg-transparent border-grey q-pa-lg full-height column justify-center">
            <div class="text-mono text-primary q-mb-md">// BILLING_DATA</div>
            
            <div class="row q-col-gutter-sm text-body2">
              <div class="col-4 text-grey">Sídlo:</div>
              <div class="col-8">Technologická 123, Brno</div>
              <div class="col-4 text-grey">IČO:</div>
              <div class="col-8 text-mono">09876543</div>
              <div class="col-4 text-grey">Banka:</div>
              <div class="col-8">Fio Banka, a.s.</div>
            </div>

            <div class="q-mt-lg">
              <div class="text-caption text-grey q-mb-sm">DATA_LINKS:</div>
              <div class="row q-gutter-md">
                <q-btn round color="grey-9" text-color="white" icon="code" type="a" :href="githubUrl" target="_blank">
                  <q-tooltip>GitHub Repository</q-tooltip>
                </q-btn>
                <q-btn round color="blue-9" text-color="white" icon="work" type="a" href="#" target="_blank">
                  <q-tooltip>LinkedIn Profile</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <div class="q-mb-xl">
        <TeamSection />
      </div>

      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <div class="text-mono text-primary text-caption">// EMERGENCY_OVERRIDE_CONSOLE</div>
        </div>
        <ContactSection />
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import TeamSection from '../components/TeamSection.vue'
import ContactSection from '../components/ContactSection.vue'

const $q = useQuasar()

// --- TADY SI ZMĚŇ SVŮJ GITHUB ---
const githubUrl = 'https://github.com/TVOJE_PREZDIVKA' 

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  $q.notify({
    message: 'Email zkopírován do schránky',
    color: 'primary',
    textColor: 'dark',
    icon: 'content_copy',
    position: 'top',
    timeout: 1000
  })
}
</script>

<style scoped>
.border-primary { border: 1px solid #7DF9FF; }
.border-grey { border: 1px solid rgba(255, 255, 255, 0.2); }
.shadow-glow { box-shadow: 0 0 30px rgba(125, 249, 255, 0.15); }
.shadow-box { box-shadow: 0 0 15px #7DF9FF; }
.non-decorated { text-decoration: none; }
.hover-text { transition: color 0.3s; }
.hover-text:hover { color: #7DF9FF; }
.copy-btn:active { transform: scale(0.95); }
</style>