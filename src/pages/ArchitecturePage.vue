<template>
  <q-page class="bg-dark text-white q-pa-xl">
    <div class="text-center q-mb-xl">
      <div class="text-mono text-primary text-h6">> SYSTEM_DESIGN_PROTOCOL</div>
      <h1 class="text-h3 text-bold q-mt-sm">ARCHITEKTURA & VÝVOJ</h1>
      <p class="text-grey-5 text-subtitle1" style="max-width: 600px; margin: 0 auto">
        Komplexní proces návrhu embedded zařízení od specifikace po sériovou výrobu.
      </p>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-timeline color="primary" dark>
          <q-timeline-entry
            title="FÁZE 01: Analýza & Specifikace"
            subtitle="Týden 1-2"
            icon="assignment"
          >
            <div class="text-grey-4">
              Definice požadavků, výběr klíčových komponent (MCU, senzory, Power
              Management) a blokové schéma zapojení.
              </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="FÁZE 02: Návrh Hardware (EDA)"
            subtitle="Týden 3-5"
            icon="memory"
            side="left"
          >
            <div class="text-grey-4">
              Kreslení schematického zapojení a návrh PCB v Altium Designer.
              Důraz na EMC kompatibilitu, diferenciální páry a impedanční
              přizpůsobení.
              </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="FÁZE 03: Prototyping & Assembly"
            subtitle="Týden 6"
            icon="build"
          >
            <div class="text-grey-4">
              Výroba prototypových desek a osazování komponent. Oživení
              napájecích větví a základní test funkčnosti (Smoke Test).
              </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="FÁZE 04: Firmware Development"
            subtitle="Týden 7-10"
            icon="code"
            side="left"
          >
            <div class="text-grey-4">
              Vývoj ovladačů (HAL/LL), implementace RTOS a aplikační logiky.
              Ladění přes JTAG/SWD a logický analyzátor.
              </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>

    <div class="text-center q-mt-xl">
      <q-btn outline color="primary" label="< ZPĚT NA DASHBOARD" to="/" />
    </div>
  </q-page>
</template>

<script setup>
// Tady zatím žádnou logiku nepotřebujeme
</script>