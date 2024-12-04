<template>
  <q-btn
    v-bind="attrs"
    square
    unelevated
    color="primary"
    class="text-capitalize"
  >
    <slot />
  </q-btn>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>
