<template>
    <q-footer bordered class="bg-black text-green-13 border-top q-py-xs q-px-md custom-footer">
      <div class="row justify-between items-center text-mono text-caption full-width">
        
        <div class="row items-center">
          <span class="blink q-mr-sm">●</span> 
          <span>SYSTEM: ONLINE</span>
        </div>
  
        <div class="gt-xs text-grey-6">
          VERSION: 1.0.4-STABLE
        </div>
  
        <div class="row items-center">
          <q-icon name="network_check" class="q-mr-xs" />
          <span>LATENCY: {{ latency }}ms</span>
        </div>
  
      </div>
    </q-footer>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const latency = ref(12)
  let interval
  
  // Simulace kolísání odezvy sítě (aby to vypadalo živě)
  onMounted(() => {
    interval = setInterval(() => {
      // Náhodné číslo mezi 8 a 24
      latency.value = Math.floor(Math.random() * (24 - 8 + 1) + 8)
    }, 2000)
  })
  
  onUnmounted(() => {
    clearInterval(interval)
  })
  </script>
  
  <style scoped>
  .text-mono {
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 1px;
  }
  .border-top {
    border-top: 1px solid #333;
  }
  .blink {
    animation: blinker 1.5s linear infinite;
    color: #00ff00;
  }
  @keyframes blinker {
    50% { opacity: 0; }
  }
  .text-green-13 {
    color: #00ff00;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  }
  </style>