import { createApp } from "vue";
import { Quasar } from "quasar";
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import router from "./router";

// Import Quasar CSS and Icons
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./style.css";

import App from "./App.vue";

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  config: {
    dark: true,
  },
});

app.use(router);

app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});

app.mount("#app");
