<template>
  <div class="hero-container relative-position window-height overflow-hidden">
    <vue-particles
      id="tsparticles"
      :options="particlesConfig"
      class="absolute-full"
      style="z-index: 1"
    />

    <div
      class="absolute-full flex flex-center"
      style="z-index: 0; opacity: 0.3"
    >
      <img
        src="/image_d6ae55.jpg"
        style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.2);
        "
      />
    </div>

    <div class="absolute-full flex column flex-center" style="z-index: 2">
      <h1 class="hero-title text-mono text-white q-mb-md">EMBEDDED SYSTEMS</h1>
      <p class="hero-subtitle text-h6 text-primary">
        _HARDWARE_DESIGN_&_FIRMWARE
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const particlesConfig = {
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: "#7DF9FF" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 2 } },
    links: {
      enable: true,
      distance: 150,
      color: "#7DF9FF",
      opacity: 0.3,
      width: 1,
    },
    move: { enable: true, speed: 1.5 },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 180, links: { opacity: 1 } } },
  },
};

onMounted(() => {
  // ZMĚNA: Nastaveno opacity: 1 (bude vidět hned)
  gsap.from(".hero-title", {
    duration: 1.5,
    y: 50,
    opacity: 1,
    ease: "power3.out",
    delay: 0.5,
  });
  gsap.from(".hero-subtitle", {
    duration: 1.5,
    y: 20,
    opacity: 1,
    ease: "power3.out",
    delay: 0.8,
  });
});
</script>

<style scoped>
.hero-title {
  font-size: 4rem;
  letter-spacing: -2px;
  text-shadow: 0 0 20px rgba(125, 249, 255, 0.3);
}
@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
