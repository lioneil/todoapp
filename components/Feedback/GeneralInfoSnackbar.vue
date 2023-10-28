<script setup>
import { useGeneralInfoStore } from '~/store/general-info';

const $store = useGeneralInfoStore();
</script>

<template>
  <v-btn
    class="ma-10"
    color="primary"
    icon="mdi-information-variant"
    location="bottom right"
    position="fixed"
    size="small"
    @click="$store.toggle"
  ></v-btn>

  <v-snackbar
    v-model="$store.shown"
    class="mb-10 mr-8"
    color="primary"
    density="dense"
    location="bottom right"
    rounded="xl"
    timeout="-1"
    transition="slide-x-reverse-transition"
  >
    {{ $store.text }}

    <template v-slot:actions>
      <v-btn
        color="light"
        icon="mdi-close-circle"
        size="small"
        @click="$store.toggle"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>
