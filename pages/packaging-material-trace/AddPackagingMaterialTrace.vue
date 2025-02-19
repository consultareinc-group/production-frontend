<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Packaging Material Trace"
      :items="[
        {
          label: 'Packaging Material Trace',
          to: { name: 'view-packaging-material-traces' },
        },
        {
          label: 'Add Packaging Material Trace',
          to: { name: 'add-packaging-material-trace' },
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
          v-for="(material, index) in packagingMaterialTraceMaterials"
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
                  <!-- Packaging Material Name -->
                  <div>
                    <label
                      >Packaging Material Name
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.packaging_material_name"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity Issued -->
                  <div>
                    <label>
                      Quantity Issued <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.quantity_issued"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity Used -->
                  <div>
                    <label>Quantity Used <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.quantity_used"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity Rejected -->
                  <div>
                    <label
                      >Quantity Rejected <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.quantity_rejected"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Remaining Quantity -->
                  <div style="height: 90px">
                    <label> Remaining Quantity </label>
                    <q-input
                      disable
                      outlined
                      v-model="material.remaining_quantity"
                      dense
                      class="remaining-quantity-disabled q-mt-sm"
                    />
                  </div>

                  <!-- Unit of Measure -->
                  <div>
                    <label>UOM <span class="text-red">*</span></label>
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
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Counted By -->
                  <div>
                    <label>Counted By <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.counted_by"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Start Time of Packing -->
                  <div>
                    <label>
                      Start Time of Packing
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.start_time_of_packing"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="material.start_time_of_packing"
                              mask="HH:mm"
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

                  <!-- End Time of Packing -->
                  <div>
                    <label>
                      End Time of Packing
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.end_time_of_packing"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="material.end_time_of_packing"
                              mask="HH:mm"
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

                  <!-- Supplier Name -->
                  <div>
                    <label>Supplier Name <span class="text-red">*</span></label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.supplier_name"
                      :options="supplierOptions"
                      :option-label="supplierOptions.label"
                      :option-value="supplierOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterSupplierOptions"
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

                  <!-- Receiving Date -->
                  <div class="col-3 q-px-sm">
                    <label>
                      Receiving Date <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.receiving_date"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              minimal
                              v-model="material.receiving_date"
                              @update:model-value="
                                () => $refs.qDateProxy.hide()
                              "
                              mask="YYYY-MM-DD"
                            />
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
          Are you sure you want to delete the material?
        </q-card-section>

        <q-card-section
          v-if="
            selectedMaterial.packaging_material_name !== null &&
            selectedMaterial.packaging_material_name !== undefined &&
            selectedMaterial.packaging_material_name !== ''
          "
          class="q-pt-none text-center"
        >
          <span class="text-bold">Material Name: </span>
          {{ selectedMaterial.packaging_material_name }}
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
        :disable="savePackagingMaterialTraceLoading"
        @click="savePackagingMaterialTrace"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      >
        <q-spinner
          v-if="savePackagingMaterialTraceLoading"
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

const packagingMaterialTraceMaterials = ref([]);

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

const supplierOptions = ref([
  { label: "Farms Co. - FFC001", value: 0 },
  { label: "Farms Co. - FFC002", value: 1 },
  { label: "Farms Co. - FFC003", value: 2 },
]);

const addMaterialLoading = ref(false);
const materialsDeleteDialog = ref(false);
const deleteMaterialLoading = ref(false);
const selectedMaterial = ref(null);

const savePackagingMaterialTraceLoading = ref(false);

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
  packagingMaterialTraceMaterials.value.push({
    key: Date.now(),
    packaging_material_name: null,
    quantity_issued: null,
    quantity_used: null,
    quantity_rejected: null,
    remaining_quantity: null,
    uom: null,
    counted_by: null,
    start_time_of_packing: null,
    end_time_of_packing: null,
    supplier_name: null,
    receiving_date: null,
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
  selectedMaterial.value = packagingMaterialTraceMaterials.value.find(
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
    packagingMaterialTraceMaterials.value =
      packagingMaterialTraceMaterials.value.filter((v) => v.key !== key);
    deleteMaterialLoading.value = false;
    closeMaterialsDeleteDialog();
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

const filterSupplierOptions = (val, update) => {
  update(() => {
    supplierOptions.value = [
      { label: "Farms Co. - FFC001", value: 0 },
      { label: "Farms Co. - FFC002", value: 1 },
      { label: "Farms Co. - FFC003", value: 2 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    supplierOptions.value = supplierOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// save the whole process
const savePackagingMaterialTrace = () => {
  savePackagingMaterialTraceLoading.value = true;

  let payload = {
    production_batch_number: productionBatchNumber.value,
    sop_reference: sopReference.value,
    materials: packagingMaterialTraceMaterials.value,
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

    savePackagingMaterialTraceLoading.value = false;
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
