<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Yield Calculation"
      :items="[
        {
          label: 'Yield Calculation',
          to: { name: 'view-yield-calculations' },
        },
        {
          label: 'Add Yield Calculation',
          to: { name: 'add-yield-calculation' },
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
        <div class="q-mt-xl row full-width" style="gap: 34px">
          <!-- Production batch number -->
          <div style="width: 304px">
            <label>
              Production Batch Number <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="productionBatchNumber"
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
              v-model="sopReference"
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
          v-for="(material, index) in yieldCalculationMaterials"
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
                  <div style="height: 90px">
                    <label>Material Name</label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.material_name"
                      :options="materialNameOptions"
                      :option-label="materialNameOptions.label"
                      :option-value="materialNameOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterMaterialNameOptions"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Planned Quantity -->
                  <div>
                    <label
                      >Planned Quantity <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.planned_quantity"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity of Materials in Finished Products -->
                  <div>
                    <label
                      >Quantity of Materials in Finished Products
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="
                        material.quantity_of_materials_in_finished_products
                      "
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Location/Area -->
                  <div>
                    <label>Location/Area <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.location_area"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Unit of Measure -->
                  <div>
                    <label
                      >Unit of Measure <span class="text-red">*</span></label
                    >
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

                  <!-- Process Loss Percentage -->
                  <div>
                    <label
                      >Process Loss Percentage
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      disable
                      outlined
                      :model-value="calculateProcessLossPercentage(material)"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Yield Percentage -->
                  <div>
                    <label
                      >Yield Percentage <span class="text-red">*</span></label
                    >
                    <q-input
                      disable
                      outlined
                      :model-value="calculateYieldPercentage(material)"
                      dense
                      class="q-mt-sm"
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
          Are you sure you want to delete the material?
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
    <div class="q-mt-xl">
      <q-btn @click="addMaterial" no-caps flat class="bg-primary text-white">
        <q-spinner
          v-if="addMaterialLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Material
      </q-btn>
    </div>

    <div>
      <q-btn
        @click="saveProcess"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
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

const yieldCalculationMaterials = ref([]);

const materialNameOptions = ref([
  { label: "Material A - MAT-100001", value: 0 },
  { label: "Material B - MAT-100002", value: 1 },
  { label: "Material C - MAT-100003", value: 2 },
  { label: "Material D - MAT-100004", value: 3 },
  { label: "Material E - MAT-100005", value: 4 },
  { label: "Material F - MAT-100006", value: 5 },
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

const addMaterialLoading = ref(false);
const materialsDeleteDialog = ref(false);
const deleteMaterialLoading = ref(false);
const selectedMaterial = ref(null);

const saveProcessLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  addSampleWeighOutMaterial();
});

// Functions
const addSampleWeighOutMaterial = () => {
  yieldCalculationMaterials.value.push({
    key: Math.random(),
    material_code: null,
    component_description: null,
    uom: null,
    lot_number: null,
    use_by_date: null,
    supplier_name: null,
    storage_location: null,
    grams_per_piece: null,
    grams_per_batch: null,
    weighing_scale_id: null,
    quantity_required: null,
    quantity_weighed: null,
    tolerance: null,
    issued_by: null,
    issued_date_and_time: null,
    amount_issued: null,
    operator_name: null,
  });
};

const addMaterial = () => {
  addMaterialLoading.value = true;

  setTimeout(() => {
    addSampleWeighOutMaterial();
    addMaterialLoading.value = false;
  }, 1000);
};

const openMaterialsDeleteDialog = (key) => {
  materialsDeleteDialog.value = true;
  selectedMaterial.value = yieldCalculationMaterials.value.find(
    (v) => v.key === key
  );
  console.log("Selected Material", selectedMaterial.value);
};

const closeMaterialsDeleteDialog = () => {
  materialsDeleteDialog.value = false;
  selectedMaterial.value = null;
};

const deleteMaterial = (key) => {
  deleteMaterialLoading.value = true;

  setTimeout(() => {
    yieldCalculationMaterials.value = yieldCalculationMaterials.value.filter(
      (v) => v.key !== key
    );
    deleteMaterialLoading.value = false;
    closeMaterialsDeleteDialog();
  }, 1000);
};

const filterMaterialNameOptions = (val, update) => {
  update(() => {
    materialNameOptions.value = [
      { label: "Material A - MAT-100001", value: 0 },
      { label: "Material B - MAT-100002", value: 1 },
      { label: "Material C - MAT-100003", value: 2 },
      { label: "Material D - MAT-100004", value: 3 },
      { label: "Material E - MAT-100005", value: 4 },
      { label: "Material F - MAT-100006", value: 5 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    materialNameOptions.value = materialNameOptions.value.filter(
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

const calculateProcessLossPercentage = (material) => {
  if (
    material.quantity_of_materials_in_finished_products &&
    material.planned_quantity
  ) {
    return (
      ((material.planned_quantity -
        material.quantity_of_materials_in_finished_products) /
        material.planned_quantity) *
      100
    ).toFixed(2);
  }

  return 0;
};

const calculateYieldPercentage = (material) => {
  if (
    material.quantity_of_materials_in_finished_products &&
    material.planned_quantity
  ) {
    return (
      (material.quantity_of_materials_in_finished_products /
        material.planned_quantity) *
      100
    ).toFixed(2);
  }

  return 0;
};

// save the whole process
const saveProcess = () => {
  saveProcessLoading.value = true;

  let payload = {
    production_batch_number: productionBatchNumber.value,
    sop_reference: sopReference.value,
    materials: yieldCalculationMaterials.value,
  };

  setTimeout(() => {
    console.log("Process Saved", payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The record has been saved.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });

    saveProcessLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
