<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Scrap Material Report"
      :items="[
        {
          label: 'Scrap Material Report',
          to: { name: 'view-scrap-material-reports' },
        },
        {
          label: 'Add Scrap Material Report',
          to: { name: 'add-scrap-material-report' },
        },
      ]"
    />

    <!-- Scrap Material Report -->
    <SectionWrapperLoader v-if="loading" has-header class="q-mb-xl q-mt-xl" />
    <SectionWrapper v-else class="q-mt-xl">
      <template #header>
        <p class="text-grey-8">
          Please fill out the required fields <span class="text-red">*</span>
        </p>
      </template>

      <template #default>
        <div class="q-mt-xl row full-width" style="gap: 34px">
          <!-- Production batch number -->
          <div style="width: 304px">
            <label>
              Production Batch Number <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="scrapMaterialReportDetails.productionBatchNumber"
              dense
              class="q-mt-sm"
              :rules="[
                (val) =>
                  (val !== null && val !== undefined) || 'Field is required',
              ]"
            />
          </div>

          <!-- SOP Reference -->
          <div style="width: 304px">
            <label>SOP Reference <span class="text-red">*</span></label>
            <q-file
              outlined
              v-model="scrapMaterialReportDetails.sopReference"
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
          v-for="(material, index) in scrapMaterialReportDetails.materials"
          :key="material.key"
          class="relative-position q-pa-xl"
          :class="{ 'q-mt-xl': index !== 0, 'q-mt-md': index === 0 }"
          style="border: 1px solid #c6c6c6"
        >
          <q-btn
            v-if="index !== 0"
            unelevated
            icon="delete"
            class="absolute fixed-top-right q-ma-sm"
            @click="openMaterialsDeleteDialog(material.key)"
          />
          <!-- Material Details -->
          <div class="column q-mt-none">
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- First Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Material Name -->
                  <div>
                    <label>Material Name <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.material_name"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Lot Number -->
                  <div>
                    <label> Lot Number <span class="text-red">*</span> </label>
                    <q-input
                      outlined
                      v-model="material.lot_number"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity Scrapped -->
                  <div>
                    <label
                      >Quantity Scrapped <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.quantity_scrapped"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Unit of Measure -->
                  <div>
                    <label>
                      Unit of Measure <span class="text-red">*</span>
                    </label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.uom"
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

                  <!-- Reason for Scrapping -->
                  <div>
                    <label>
                      Reason for Scrapping<span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.reason_for_scrapping"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 142px"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Operator Name -->
                  <div>
                    <label>Operator Name <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.operator_name"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Reported By -->
                  <div>
                    <label>Reported By <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.reported_by"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Reported Date and Time -->
                  <div>
                    <label>
                      Reported Date and Time <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.reported_date_and_time"
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
                              v-model="material.reported_date_and_time"
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
                              v-model="material.reported_date_and_time"
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

                  <!-- Verified By -->
                  <div>
                    <label>Verified By <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.verified_by"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Verified Date and Time -->
                  <div>
                    <label>
                      Verified Date and Time <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.verified_date_and_time"
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
                              v-model="material.verified_date_and_time"
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
                              v-model="material.verified_date_and_time"
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

                  <!-- Disposition -->
                  <div>
                    <label> Disposition <span class="text-red">*</span> </label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.disposition"
                      :options="dispositionOptions"
                      :option-label="dispositionOptions.label"
                      :option-value="dispositionOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterDispositionOptions"
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

                  <!-- Remarks -->
                  <div>
                    <label>Remarks</label>
                    <q-input
                      outlined
                      v-model="material.remarks"
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

        <!-- Add Material Button -->
        <div class="q-mt-xl">
          <q-btn
            :disable="addMaterialLoading"
            @click="addMaterial"
            no-caps
            flat
            class="bg-primary text-white"
          >
            <q-spinner
              v-if="addMaterialLoading"
              size="24px"
              color="positive"
              class="q-mr-md"
            />
            Add Material
          </q-btn>
        </div>
      </template>
    </SectionWrapper>

    <!-- Delete Dialog -->
    <q-dialog v-model="materialsDeleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeMaterialsDeleteDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete this material from the scrap material
          report?
        </q-card-section>

        <q-card-section
          v-if="
            selectedMaterial.material_name !== null &&
            selectedMaterial.material_name !== undefined &&
            selectedMaterial.material_name !== ''
          "
          class="q-pt-none text-center"
        >
          <span class="text-bold">Material Name: </span>
          {{ selectedMaterial.material_name }}
        </q-card-section>

        <q-card-section class="flex justify-center q-my-lg">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="border-000000-all q-px-lg"
            v-close-popup
          />
          <div class="q-mx-md"></div>
          <q-btn
            flat
            no-caps
            class="bg-accent text-white q-px-lg"
            @click="deleteMaterial(selectedMaterial.key)"
            :disable="deleteMaterialLoading"
          >
            <q-spinner v-if="deleteMaterialLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Action Buttons -->
    <div>
      <q-btn
        :disable="saveScrapMaterialReportLoading"
        @click="saveScrapMaterialReport"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      >
        <q-spinner
          v-if="saveScrapMaterialReportLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Save
      </q-btn>
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const loading = ref(false);
const productionBatchNumber = ref(null);
const sopReference = ref(null);

const scrapMaterialReportDetails = ref({
  productionBatchNumber: null,
  sopReference: null,
  materials: [],
});

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

const dispositionOptions = ref([
  { label: "Release", value: 0 },
  { label: "Hold", value: 1 },
  { label: "Rework", value: 2 },
  { label: "Reject/Dispose", value: 3 },
  { label: "Others(Specify)", value: 4 },
]);

const addMaterialLoading = ref(false);
const materialsDeleteDialog = ref(false);
const deleteMaterialLoading = ref(false);
const selectedMaterial = ref(null);

const saveScrapMaterialReportLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  addSampleMaterial();
});

// Functions
const addSampleMaterial = () => {
  scrapMaterialReportDetails.value.materials.push({
    key: Date.now(),
    material_name: null,
    lot_number: null,
    quantity_scrapped: null,
    uom: null,
    reason_for_scrapping: null,
    operator_name: null,
    reported_by: null,
    reported_date_and_time: null,
    verified_by: null,
    verified_date_and_time: null,
    disposition: null,
    remarks: null,
  });
};

const addMaterial = () => {
  addMaterialLoading.value = true;

  setTimeout(() => {
    addSampleMaterial();
    addMaterialLoading.value = false;
  }, 1000);
};

const openMaterialsDeleteDialog = (key) => {
  materialsDeleteDialog.value = true;
  selectedMaterial.value = scrapMaterialReportDetails.value.materials.find(
    (v) => v.key === key
  );
};

const closeMaterialsDeleteDialog = () => {
  materialsDeleteDialog.value = false;
  selectedMaterial.value = null;
};

const deleteMaterial = (key) => {
  deleteMaterialLoading.value = true;

  setTimeout(() => {
    scrapMaterialReportDetails.value.materials =
      scrapMaterialReportDetails.value.materials.filter((v) => v.key !== key);

    closeMaterialsDeleteDialog();
    deleteMaterialLoading.value = false;
  }, 1000);
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

const filterDispositionOptions = (val, update) => {
  update(() => {
    dispositionOptions.value = [
      { label: "Release", value: 0 },
      { label: "Hold", value: 1 },
      { label: "Rework", value: 2 },
      { label: "Reject/Dispose", value: 3 },
      { label: "Others(Specify)", value: 4 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    dispositionOptions.value = dispositionOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// save the whole process
const saveScrapMaterialReport = () => {
  saveScrapMaterialReportLoading.value = true;

  let payload = {
    productionBatchNumber:
      scrapMaterialReportDetails.value.productionBatchNumber,
    sopReference: scrapMaterialReportDetails.value.sopReference,
    materials: scrapMaterialReportDetails.value.materials,
  };

  setTimeout(() => {
    console.log("Saved", payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The record has been saved.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });

    saveScrapMaterialReportLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}

:deep(.remaining-quantity-disabled .q-field__control) {
  background: #f3f4f6;
}
</style>
