<template>
  <div>
    <label :for="attrs.id || ''">{{ label }}</label>
    <q-input v-bind="attrs" stack-label square dense outlined :model-value="modelValue" @update:model-value="updateModelValue">
      <slot />
    </q-input>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const updateModelValue = (value) => {
  emits("update:modelValue", value);
};
</script>
