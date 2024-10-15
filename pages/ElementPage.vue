<template>
  <div class="q-pa-xl">
    <h3 class="q-mb-lg">Form Components</h3>
    <!-- INPUT FIELDS -->
    <h5 class="q-mb-lg">Input Field</h5>
    <div>
      <label>Text <span class="text-red">*</span></label>
      <q-input outlined v-model="form.input_text" dense class="q-mt-sm" />
    </div>
    <div class="q-my-lg"></div>
    <div>
      <label>Date <span class="text-red">*</span></label>
      <q-input outlined v-model="form.input_date" dense class="q-mt-sm">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date minimal v-model="form.input_date" @update:model-value="() => $refs.qDateProxy.hide()" mask="YYYY-MM-DD" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-my-lg"></div>
    <div>
      <label>Date and Time <span class="text-red">*</span></label>
      <q-input outlined v-model="form.input_date" dense class="q-mt-sm">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="form.input_date" mask="YYYY-MM-DD HH:mm" color="dark">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="form.input_date" mask="YYYY-MM-DD HH:mm" format24h color="dark">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <!-- SELECT FIELDS -->
    <h5 class="q-mb-lg">Select Field</h5>
    <div>
      <label>Select <span class="text-red">*</span></label>
      <q-select outlined dense v-model="form.select" :options="options" class="q-mt-sm" />
    </div>
    <div class="q-my-lg"></div>
    <div>
      <label>Select and Search <span class="text-red">*</span></label>
      <q-select use-input outlined dense v-model="form.select" :options="options" hide-dropdown-icon @filter="filterOptions" class="q-mt-sm" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let form = ref({
  input_text: null,
  input_date: null,
  select: null,
});

let options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);
let originalOptions = [...options.value];

// Filter options based on user input
const filterOptions = (val, update) => {
  update(() => {
    if (val === "") {
      options.value = originalOptions;
    } else {
      const needle = val.toLowerCase();
      options.value = originalOptions.filter((option) => option.toLowerCase().includes(needle));
    }
  });
};
</script>
