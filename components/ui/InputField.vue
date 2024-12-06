<template>
  <div>
    <label :for="attrs.id || ''"
      >{{ label }}
      <span class="text-red">{{ isRequired ? "*" : "" }}</span></label
    >
    <q-input
      v-bind="attrs"
      stack-label
      square
      dense
      outlined
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      :type="type"
      class="q-mt-sm"
      :style="{
        'max-height': px(130),
        height: '100%',
        overflow: 'hidden',
      }"
    >
      <slot />
    </q-input>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";
import { px } from "../../lib/utils";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
  isRequired: { type: Boolean, default: false },
  type: { type: String, default: "text" },
});

const emits = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const updateModelValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
