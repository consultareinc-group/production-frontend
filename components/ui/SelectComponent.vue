<template>
  <div>
    <label class="select-header">{{ label }}</label>
    <q-select
      dense
      square
      outlined
      label-stack
      v-model="model"
      use-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      style="width: 200px"
      class="q-mt-xs"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  optionsArray: { type: Array, required: true },
});

const options = ref(props.optionsArray);
const model = ref(props.optionsArray[0]);

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = props.optionsArray;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = props.optionsArray.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>

<style lang="scss" scoped>
.select-header {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}
</style>
