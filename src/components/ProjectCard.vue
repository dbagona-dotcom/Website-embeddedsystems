<template>
  <q-card
    class="project-card bg-dark relative-position"
    flat
    square
    @click="handleClick"
  >
    <div class="img-wrapper relative-position overflow-hidden">
      <q-img :src="image" :ratio="16 / 9" class="project-img">
        <template v-slot:loading>
          <q-spinner-gears color="primary" />
        </template>
      </q-img>

      <div class="hover-overlay absolute-full flex flex-center">
        <q-icon name="search" color="primary" size="3rem" />
      </div>
    </div>

    <q-card-section>
      <div class="text-mono text-primary text-caption q-mb-xs">
        // PROJECT_0{{ id }}
      </div>
      <div class="text-h6 text-white">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// Přijímáme data od rodiče
const props = defineProps(["id", "title", "image"]);
const emit = defineEmits(["open"]);

// Funkce po kliknutí
const handleClick = () => {
  console.log("Kliknuto na projekt: " + props.title);
  // Tady později spustíme otevření nového okna
  emit("open", props.id);
};
</script>

<style scoped>
/* Základní styl karty */
.project-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer; /* Změní kurzor na ručičku */
}

/* Co se stane, když na kartu najedeš myší (HOVER) */
.project-card:hover {
  border-color: #7df9ff; /* Rámeček zmodrá */
  transform: translateY(-5px); /* Karta se lehce nadzvedne */
  box-shadow: 0 10px 30px rgba(125, 249, 255, 0.1); /* Záře */
}

/* Zvětšování obrázku */
.project-img {
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  height: 100%;
}

/* Tady je ten trik: Když najedeš na .project-card, ovlivní to .project-img uvnitř */
.project-card:hover .project-img {
  transform: scale(1.1); /* Zvětšení o 10% */
}

/* Překryv s lupou */
.hover-overlay {
  background: rgba(5, 5, 16, 0.8);
  opacity: 0; /* Normálně neviditelné */
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.project-card:hover .hover-overlay {
  opacity: 1; /* Při najetí se ukáže */
}
</style>
