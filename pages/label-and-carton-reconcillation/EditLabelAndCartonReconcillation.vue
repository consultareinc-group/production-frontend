<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Label & Carton Reconciliation"
      :items="[
        {
          label: 'Label & Carton Reconciliation',
          to: { name: 'view-label-and-carton-reconcillation' },
        },
        {
          label: 'Edit Label & Carton Reconciliation',
          to: { name: 'edit-label-and-carton-reconcillation' },
        },
      ]"
    />

    <!-- Compounding/Mixing -->
    <SectionWrapperLoader v-if="loading" has-header class="q-mb-xl q-mt-xl" />
    <SectionWrapper v-else class="q-mt-xl">
      <template #header>
        <p class="text-grey-8">
          Please fill out the required fields <span class="text-red">*</span>
        </p>
      </template>

      <template #default>
        <div class="q-mt-xl row justify-between full-width" style="gap: 34px">
          <!-- Production batch number -->
          <div class="col">
            <label>
              Production Batch Number <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="labelAndCartonReconcillationData.production_batch_number"
              dense
              class="q-mt-sm"
              :rules="[
                (val) =>
                  (val !== null && val !== undefined) || 'Field is required',
              ]"
            />
          </div>

          <!-- Product Name -->
          <div class="col">
            <label> Product Name </label>
            <q-input
              outlined
              v-model="labelAndCartonReconcillationData.product_name"
              dense
              class="q-mt-sm"
              style="background-color: #f3f4f6"
              disable
            />
          </div>

          <!-- SOP Reference -->
          <div class="col">
            <label>SOP Reference <span class="text-red">*</span></label>
            <q-file
              outlined
              v-model="labelAndCartonReconcillationData.sop_reference"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            >
              <template v-slot:append>
                <q-icon name="upload" />
              </template>
            </q-file>
          </div>
        </div>

        <div
          class="relative-position q-pa-xl"
          style="border: 1px solid #c6c6c6"
        >
          <div class="column q-mt-none">
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- Label Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Issued -->
                  <div>
                    <label>Issued <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.issued"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Consumed -->
                  <div>
                    <label>Consumed <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.consumed"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Scrapped -->
                  <div>
                    <label>Scrapped <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.scrapped"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Returned -->
                  <div>
                    <label>Returned <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.returned"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Revision -->
                  <div>
                    <label>Revision <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.revision"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Count -->
                  <div>
                    <label>Count <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.count"
                      dense
                      class="label-count q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                      disable
                    />
                  </div>

                  <!-- Percentage -->
                  <div>
                    <label>Percentage <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.label.percentage
                      "
                      dense
                      class="label-percentage q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                      disable
                    />
                  </div>

                  <!-- Lot -->
                  <div>
                    <label>Lot <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.lot"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Counted By -->
                  <div>
                    <label>Counted By <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.label.counted_by
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Label Date and Time -->
                  <div>
                    <label>
                      Date and Time
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.label.date_and_time
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="
                                labelAndCartonReconcillationData.label
                                  .date_and_time
                              "
                              mask="YYYY-MM-DD HH:mm"
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="
                                labelAndCartonReconcillationData.label
                                  .date_and_time
                              "
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <!-- Remarks -->
                  <div>
                    <label>Remarks</label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.label.remarks"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 142px"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <!-- Packaging Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Packaging Type -->
                  <div>
                    <label
                      >Packaging Type <span class="text-red">*</span></label
                    >
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="
                        labelAndCartonReconcillationData.packaging
                          .packaging_type
                      "
                      :options="packagingTypeOptions"
                      :option-label="packagingTypeOptions.label"
                      :option-value="packagingTypeOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterPackagingTypeOptions"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Issued -->
                  <div>
                    <label>Issued <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.issued
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Unit of Measure -->
                  <div>
                    <label
                      >Unit of Measure <span class="text-red">*</span></label
                    >
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="labelAndCartonReconcillationData.packaging.uom"
                      :options="uomOptions"
                      :option-label="uomOptions.label"
                      :option-value="uomOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterUomOptions"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Consumed -->
                  <div>
                    <label>Consumed <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.consumed
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Scrapped -->
                  <div>
                    <label>Scrapped <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.scrapped
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Returned -->
                  <div>
                    <label>Returned <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.returned
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Revision -->
                  <div>
                    <label>Revision <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.revision
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Count -->
                  <div>
                    <label>Count <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.packaging.count"
                      dense
                      class="packaging-count q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                      disable
                    />
                  </div>

                  <!-- Percentage -->
                  <div>
                    <label>Percentage <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.percentage
                      "
                      dense
                      class="packaging-percentage q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                      disable
                    />
                  </div>

                  <!-- Lot -->
                  <div>
                    <label>Lot <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="labelAndCartonReconcillationData.packaging.lot"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Counted By -->
                  <div>
                    <label>Counted By <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.counted_by
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Label Date and Time -->
                  <div>
                    <label>
                      Date and Time
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.date_and_time
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="
                                labelAndCartonReconcillationData.packaging
                                  .date_and_time
                              "
                              mask="YYYY-MM-DD HH:mm"
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="
                                labelAndCartonReconcillationData.packaging
                                  .date_and_time
                              "
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <!-- Remarks -->
                  <div>
                    <label>Remarks</label>
                    <q-input
                      outlined
                      v-model="
                        labelAndCartonReconcillationData.packaging.remarks
                      "
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 142px"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <!-- Action Buttons -->
    <div>
      <q-btn
        @click="updateLabelAndCartonReconcillation"
        label="Update"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const route = useRoute();
const loading = ref(false);

const labelAndCartonReconcillationData = ref({
  production_batch_number: null,
  product_name: null,
  sop_reference: null,
  label: {
    issued: null,
    consumed: null,
    scrapped: null,
    returned: null,
    revision: null,
    count: null,
    percentage: null,
    lot: null,
    counted_by: null,
    date_and_time: null,
    remarks: null,
  },
  packaging: {
    packaging_type: null,
    issued: null,
    uom: null,
    consumed: null,
    scrapped: null,
    returned: null,
    revision: null,
    count: null,
    percentage: null,
    lot: null,
    counted_by: null,
    date_and_time: null,
    remarks: null,
  },
});
const packagingTypeOptions = ref([
  { label: "Cartons", value: 0 },
  { label: "Roll Film", value: 1 },
  { label: "Plastic Bags", value: 2 },
  { label: "Bottles", value: 3 },
  { label: "Cans", value: 4 },
  { label: "Trays", value: 5 },
]);

const uomOptions = ref([
  { label: "Piece (pc)", value: 0 },
  { label: "Kilogram (kg)", value: 1 },
  { label: "Gram (g)", value: 2 },
  { label: "Ton (t)", value: 3 },
  { label: "Liter (L)", value: 5 },
  { label: "Milliliter (mL)", value: 6 },
  { label: "Meter (m)", value: 7 },
  { label: "Centimeter (cm)", value: 8 },
  { label: "Square Meter (m²)", value: 9 },
  { label: "Cubic Meter (m³)", value: 10 },
  { label: "Dozen (dz)", value: 11 },
  { label: "Box (bx)", value: 12 },
  { label: "Bag (bag)", value: 13 },
  { label: "Pallet (plt)", value: 14 },
  { label: "Roll (rl)", value: 15 },
  { label: "Pair (pr)", value: 16 },
  { label: "Set (set)", value: 17 },
  { label: "Barrel (bbl)", value: 18 },
  { label: "Carton (ctn)", value: 19 },
  { label: "Hour (hr)", value: 20 },
]);

const saveLabelAndCartonReconcillationLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;
  labelAndCartonReconcillationData.value.production_batch_number =
    +route.params.id;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Functions
const filterPackagingTypeOptions = (val, update) => {
  update(() => {
    packagingTypeOptions.value = [
      { label: "Cartons", value: 0 },
      { label: "Roll Film", value: 1 },
      { label: "Plastic Bags", value: 2 },
      { label: "Bottles", value: 3 },
      { label: "Cans", value: 4 },
      { label: "Trays", value: 5 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    packagingTypeOptions.value = packagingTypeOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterUomOptions = (val, update) => {
  update(() => {
    uomOptions.value = [
      { label: "Piece (pc)", value: 0 },
      { label: "Kilogram (kg)", value: 1 },
      { label: "Gram (g)", value: 2 },
      { label: "Ton (t)", value: 3 },
      { label: "Liter (L)", value: 5 },
      { label: "Milliliter (mL)", value: 6 },
      { label: "Meter (m)", value: 7 },
      { label: "Centimeter (cm)", value: 8 },
      { label: "Square Meter (m²)", value: 9 },
      { label: "Cubic Meter (m³)", value: 10 },
      { label: "Dozen (dz)", value: 11 },
      { label: "Box (bx)", value: 12 },
      { label: "Bag (bag)", value: 13 },
      { label: "Pallet (plt)", value: 14 },
      { label: "Roll (rl)", value: 15 },
      { label: "Pair (pr)", value: 16 },
      { label: "Set (set)", value: 17 },
      { label: "Barrel (bbl)", value: 18 },
      { label: "Carton (ctn)", value: 19 },
      { label: "Hour (hr)", value: 20 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    uomOptions.value = uomOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// save the whole process
const updateLabelAndCartonReconcillation = () => {
  saveLabelAndCartonReconcillationLoading.value = true;

  let payload = {
    ...labelAndCartonReconcillationData.value,
  };

  setTimeout(() => {
    console.log(payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The record has been updated.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });

    saveLabelAndCartonReconcillationLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}

:deep(.label-count .q-field__control) {
  background: #f3f4f6;
}

:deep(.label-percentage .q-field__control) {
  background: #f3f4f6;
}

:deep(.packaging-count .q-field__control) {
  background: #f3f4f6;
}

:deep(.packaging-percentage .q-field__control) {
  background: #f3f4f6;
}
</style>
