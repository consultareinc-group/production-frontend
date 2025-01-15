<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Weigh Out"
      :items="[
        {
          label: 'Weigh Out',
          to: { name: 'view-weigh-out' },
        },
        {
          label: 'Edit Weigh Out',
          to: { name: 'edit-weigh-out' },
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
              v-model="productionBatchNumber"
              dense
              class="q-mt-sm"
              :rules="[
                (val) =>
                  (val !== null && val !== undefined) || 'Field is required',
              ]"
            />
          </div>

          <!-- Date and Time -->
          <div class="col">
            <label>
              Date and Time
              <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="dateAndTime"
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
                      v-model="dateAndTime"
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
                      v-model="dateAndTime"
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

          <!-- SOP Reference -->
          <div class="col">
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
          v-for="(material, index) in weighOutMaterials"
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
          <div class="column q-gutter-y-xl q-mt-none">
            <h6 class="q-ma-none">Material Details</h6>
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- First Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Material Code -->
                  <div>
                    <label>Material Code <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.material_code"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Component Description -->
                  <div>
                    <label>Component Description</label>
                    <q-input
                      outlined
                      v-model="material.component_description"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 142px"
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
                      :rules="[(val) => !!val || 'Field is required']"
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
                  <!-- Lot Number -->
                  <div>
                    <label>Lot Number <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.lot_number"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Use-by-date -->
                  <div style="height: 90px">
                    <label> Use-by-date </label>
                    <q-input
                      outlined
                      v-model="material.use_by_date"
                      dense
                      class="q-mt-sm"
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
                              v-model="material.use_by_date"
                              mask="YYYY-MM-DD"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <!-- Supplier Name -->
                  <div style="height: 90px">
                    <label>Supplier Name</label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.supplier_name"
                      :options="supplierNameOptions"
                      :option-label="supplierNameOptions.label"
                      :option-value="supplierNameOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterSupplierNameOptions"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Storage Location -->
                  <div style="height: 90px">
                    <label>Storage Location</label>
                    <q-input
                      outlined
                      v-model="material.storage_location"
                      dense
                      class="q-mt-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Equipment Details -->
          <div class="column q-gutter-y-xl q-mt-xl">
            <h6 class="q-ma-none">Weight Information</h6>
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- First Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Grams per Piece -->
                  <div>
                    <label>Grams per Piece </label>
                    <q-input
                      outlined
                      v-model="material.grams_per_piece"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Grams per Batch -->
                  <div>
                    <label>Grams per Batch </label>
                    <q-input
                      outlined
                      v-model="material.grams_per_batch"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Weighing Scale ID -->
                  <div>
                    <label>Weighing Scale ID </label>
                    <q-input
                      outlined
                      v-model="material.weighing_scale_id"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Quantity Required -->
                  <div>
                    <label
                      >Quantity Required <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.quantity_required"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity Weighed -->
                  <div>
                    <label
                      >Quantity Weighed <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.quantity_weighed"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Tolerance -->
                  <div>
                    <label>Tolerance <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.tolerance"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Issuance and Tracking -->
          <div class="column q-gutter-y-xl q-mt-xl">
            <h6 class="q-ma-none">Issuance and Tracking</h6>
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- First Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Issued By -->
                  <div>
                    <label>Issued By <span class="text-red">*</span> </label>
                    <q-input
                      outlined
                      v-model="material.issued_by"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Issued Date and Time -->
                  <div>
                    <label>
                      Issued Date and Time
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.issued_date_and_time"
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
                              v-model="material.issued_date_and_time"
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
                              v-model="material.issued_date_and_time"
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
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Amount Issued -->
                  <div>
                    <label
                      >Amount Issued <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.amount_issued"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Operator Name -->
                  <div>
                    <label
                      >Operator Name <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="material.operator_name"
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
          Are you sure you want to delete this material from the weigh out?
        </q-card-section>

        <q-card-section
          v-if="
            selectedMaterial.material_code !== null &&
            selectedMaterial.material_code !== undefined &&
            selectedMaterial.material_code !== ''
          "
          class="q-pt-none text-center"
        >
          <span class="text-bold">Material Name: </span>
          {{ selectedMaterial.material_code }}
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
        @click="updateProcess"
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
const route = useRoute();
const $q = useQuasar();
const loading = ref(false);
const productionBatchNumber = ref(null);
const dateAndTime = ref(null);
const sopReference = ref(null);

const weighOutMaterials = ref([]);

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

const supplierNameOptions = ref([
  { label: "Supplier 1", value: 0 },
  { label: "Supplier 2", value: 1 },
  { label: "Supplier 3", value: 2 },
  { label: "Supplier 4", value: 3 },
  { label: "Supplier 5", value: 4 },
  { label: "Supplier 6", value: 5 },
  { label: "Supplier 7", value: 6 },
  { label: "Supplier 8", value: 7 },
  { label: "Supplier 9", value: 8 },
  { label: "Supplier 10", value: 9 },
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

  productionBatchNumber.value = +route.params.id;
  addSampleWeighOutMaterial();
});

// Functions
const addSampleWeighOutMaterial = () => {
  weighOutMaterials.value.push({
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
  selectedMaterial.value = weighOutMaterials.value.find((v) => v.key === key);
  console.log("Selected Material", selectedMaterial.value);
};

const closeMaterialsDeleteDialog = () => {
  materialsDeleteDialog.value = false;
  selectedMaterial.value = null;
};

const deleteMaterial = (key) => {
  deleteMaterialLoading.value = true;

  setTimeout(() => {
    weighOutMaterials.value = weighOutMaterials.value.filter(
      (v) => v.key !== key
    );
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

const filterSupplierNameOptions = (val, update) => {
  update(() => {
    supplierNameOptions.value = [
      { label: "Supplier 1", value: 0 },
      { label: "Supplier 2", value: 1 },
      { label: "Supplier 3", value: 2 },
      { label: "Supplier 4", value: 3 },
      { label: "Supplier 5", value: 4 },
      { label: "Supplier 6", value: 5 },
      { label: "Supplier 7", value: 6 },
      { label: "Supplier 8", value: 7 },
      { label: "Supplier 9", value: 8 },
      { label: "Supplier 10", value: 9 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    supplierNameOptions.value = supplierNameOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// save the whole process
const updateProcess = () => {
  saveProcessLoading.value = true;

  let payload = {
    productionBatchNumber: productionBatchNumber.value,
    dateAndTime: dateAndTime.value,
    sopReference: sopReference.value,
    materials: weighOutMaterials.value,
  };

  setTimeout(() => {
    console.log("Process Updated", payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The record has been updated.`,
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
