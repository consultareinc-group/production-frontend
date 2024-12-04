<template>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <slot name="header">
          <div class="text-h6">{{ title }}</div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const alert = ref(false);
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>
