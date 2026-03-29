<template>
  <div class="q-py-lg">
    <div class="text-center q-mb-xl">
      <h3 class="text-mono text-white">
        <span class="text-primary">#</span> ACTIVE_PERSONNEL
      </h3>
      <p class="text-grey-5">Specializované jednotky nasazené v poli.</p>
    </div>

    <div class="row q-col-gutter-xl justify-center">
      
      <div v-for="(member, index) in teamMembers" :key="index" class="col-12 col-md-6">
        
        <q-card dark bordered class="bg-transparent team-card text-center q-pa-lg full-height column justify-between">
          
          <div>
            <q-avatar 
              size="120px" 
              :color="member.color" 
              text-color="white" 
              :icon="member.icon" 
              class="q-mb-md shadow-box"
            />
            
            <div class="text-h5 q-mb-xs">{{ member.name }}</div>
            <div class="text-primary text-uppercase text-bold q-mb-md">{{ member.role }}</div>
            
            <q-separator dark class="q-my-md" />
            
            <div class="text-grey-4 text-body1 q-mb-lg" style="min-height: 60px;">
              {{ member.desc }}
            </div>
          </div>

          <div class="bg-dark q-pa-md rounded-borders text-body2 text-grey-5 text-mono ellipsis overflow-hidden" style="border: 1px dashed #555;">
            <q-icon name="alternate_email" size="sm" class="q-mr-sm" />
            {{ member.email }}
            <q-tooltip>{{ member.email }}</q-tooltip>
          </div>

        </q-card>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    name: 'Ing. Tomáš "Sparky" Zkrat',
    role: 'Hardware Hazard',
    desc: 'Specialista na vnucování magického kouře zpět do součástek. Pokud to nevybuchlo, nebylo to zapojené.',
    email: 'horelo.to.uz.kdyz.jsem.prisel@nexus.cz',
    icon: 'flash_on',
    color: 'red-9'
  },
  {
    name: 'Bc. Jakub Lesní',
    role: 'Backend & Moss Developer',
    desc: 'Programuje jen v C, protože Python žere moc paměti. Nesnáší monitory, kód píše na kůru stromů.',
    email: 'chci.zit.v.lese.bez.elektriny@gmail.com',
    icon: 'forest',
    color: 'green-9'
  },
  {
    name: 'Lukáš "Ctrl+C" Nováček',
    role: 'Senior Coffee Courier',
    desc: 'Jeho hlavní prací je restartovat router a ptát se, proč mu nefunguje StackOverflow.',
    email: 'senior.rek.ze.to.mam.udelat.ja@nexus.cz',
    icon: 'child_care',
    color: 'blue-9'
  },
  {
    name: 'The Oracle',
    role: 'Senior Legend',
    desc: 'Ví to, co nejde vědět. Vidí bugy dřív, než je napíšeš. Nikdo ho nikdy neviděl naživo.',
    email: '42@universe.end',
    icon: 'visibility',
    color: 'amber-10'
  }
])
</script>

<style scoped>
.team-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}
.team-card:hover {
  transform: translateY(-5px);
  border-color: var(--q-primary);
  background: rgba(255, 255, 255, 0.05);
}
.shadow-box {
  box-shadow: 0 0 15px currentColor;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>