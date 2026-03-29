<template>
  <q-page
    class="bg-dark text-white flex flex-center relative-position overflow-hidden"
  >
    <div class="absolute-full">
      <q-img
        src="/image_d6ae55.jpg"
        class="fit"
        style="filter: brightness(0.2) blur(3px); transform: scale(1.1)"
      />
    </div>

    <div
      class="container relative-position q-pa-md"
      style="z-index: 1; width: 100%; max-width: 1000px"
    >
      <div class="text-center q-mb-xl">
        <div class="text-mono text-primary text-weight-bold">
          > NEW_MISSION_PROTOCOL
        </div>
        <h1 class="text-h3 text-bold q-mt-sm text-uppercase">
          Domluvení schůzky
        </h1>
      </div>

      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-5">
          <q-card
            dark
            bordered
            class="bg-transparent q-pa-lg full-height backdrop-blur column justify-center"
          >
            <div class="text-h6 text-primary q-mb-md">> PRE-FLIGHT CHECK</div>
            <p class="text-grey-4 text-body1">
              Před zahájením vývoje potřebujeme sladit frekvence. Vyberte si typ
              spojení a čas, který vám vyhovuje pro úvodní analýzu projektu.
            </p>

            <q-separator dark class="q-my-lg" />

            <div class="q-gutter-y-lg">
              <div class="row items-center group-hover">
                <q-avatar
                  icon="wifi"
                  color="primary"
                  text-color="dark"
                  size="md"
                  class="q-mr-md"
                />
                <div>
                  <div class="text-bold text-white">ONLINE LINK</div>
                  <div class="text-caption text-primary">
                    Google Meet / Teams
                  </div>
                </div>
              </div>

              <div class="row items-center group-hover">
                <q-avatar
                  icon="place"
                  color="primary"
                  text-color="dark"
                  size="md"
                  class="q-mr-md"
                />
                <div>
                  <div class="text-bold text-white">BASE CAMP (LAB)</div>
                  <div class="text-caption text-primary">
                    Osobně v naší laboratoři (Brno)
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <div class="col-12 col-md-7">
          <q-card dark class="bg-dark q-pa-xl border-primary glow-box">
            <div class="row items-center justify-between q-mb-lg">
              <div class="text-mono text-grey">// MISSION_PARAMETERS</div>
              <q-icon name="settings" color="primary" />
            </div>

            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="q-mb-md">
                <div class="text-caption text-grey q-mb-sm">
                  CONNECTION_TYPE:
                </div>
                <div class="row q-gutter-md bg-grey-9 q-pa-sm rounded-borders">
                  <q-radio
                    dark
                    v-model="form.type"
                    val="online"
                    label="Online Call"
                    color="primary"
                  />
                  <q-radio
                    dark
                    v-model="form.type"
                    val="person"
                    label="Osobně (Lab)"
                    color="primary"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    dark
                    filled
                    v-model="form.date"
                    type="date"
                    label="T-MINUS (Datum)"
                    color="primary"
                    class="tech-input"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    dark
                    filled
                    v-model="form.time"
                    type="time"
                    label="TIME (Čas)"
                    color="primary"
                    class="tech-input"
                  />
                </div>
              </div>

              <q-input
                dark
                filled
                v-model="form.email"
                label="COMMS_CHANNEL (Váš Email)"
                color="primary"
                class="tech-input"
              >
                <template v-slot:prepend
                  ><q-icon name="alternate_email" color="primary"
                /></template>
              </q-input>

              <q-input
                dark
                filled
                v-model="form.note"
                type="textarea"
                label="MISSION_OBJECTIVE (Stručný popis projektu)"
                rows="3"
                color="primary"
                class="tech-input"
              />

              <div class="row justify-between items-center q-mt-xl">
                <q-btn flat color="grey" label="< ABORT" to="/" />
                <q-btn
                  unelevated
                  color="primary"
                  text-color="dark"
                  label="CONFIRM_MISSION"
                  type="submit"
                  icon-right="check_circle"
                  class="q-px-lg q-py-sm text-bold"
                />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Data formuláře
const form = ref({
  type: "online",
  date: "",
  time: "",
  email: "",
  note: "",
});

// Akce po odeslání
const onSubmit = () => {
  $q.notify({
    color: "dark",
    textColor: "primary",
    icon: "verified",
    message: "MISSION CONFIRMED: Pozvánka odeslána do vašeho emailu.",
    position: "top",
    timeout: 3000,
    classes: "border-primary",
  });
};
</script>

<style scoped>
/* Rozmazané sklo */
.backdrop-blur {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Zářící rámeček formuláře */
.border-primary {
  border: 1px solid #7df9ff;
}
.glow-box {
  box-shadow: 0 0 30px rgba(125, 249, 255, 0.05);
}

/* Styly inputů */
.tech-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}
</style>
