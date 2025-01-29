<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Finished Goods"
      :items="[
        {
          label: 'Finished Goods',
          to: { name: 'view-finished-goods' },
        },
        {
          label: 'Edit Finished Goods',
          to: { name: 'edit-finished-goods' },
        },
      ]"
    />

    <!-- Finished Goods Details -->
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
              v-model="finishedGoodsDetails.production_batch_number"
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
              v-model="finishedGoodsDetails.sop_reference"
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

        <!-- Finished Goods Details -->
        <div
          class="relative-position q-pa-xl q-mt-md"
          style="border: 1px solid #c6c6c6"
        >
          <!-- Details -->
          <div class="column q-mt-none">
            <div class="relative-position">
              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <!-- First Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Product Name -->
                  <div>
                    <label>Product Name <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="finishedGoodsDetails.product_name"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Quantity -->
                  <div>
                    <label>Quantity <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="finishedGoodsDetails.quantity"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Unit of Measure -->
                  <div>
                    <label>UOM <span class="text-red">*</span></label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="finishedGoodsDetails.uom"
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

                  <!-- Packaging Type -->
                  <div>
                    <label
                      >Packaging Type <span class="text-red">*</span></label
                    >
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="finishedGoodsDetails.packaging_type"
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
                </div>

                <!-- 2nd Column -->
                <div class="q-gutter-y-md full-width">
                  <!-- Storage Location -->
                  <div>
                    <label
                      >Storage Location <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="finishedGoodsDetails.storage_location"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Best Before Date -->
                  <div>
                    <label
                      >Best Before Date <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="finishedGoodsDetails.best_before_date"
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
                              v-model="finishedGoodsDetails.best_before_date"
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

                  <!-- Storage Condition -->
                  <div>
                    <label
                      >Storage Condition <span class="text-red">*</span></label
                    >
                    <q-select
                      outlined
                      dense
                      v-model="finishedGoodsDetails.storage_condition"
                      :options="storageConditionOptions"
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>

                  <!-- Remarks -->
                  <div>
                    <label>Remarks <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="finishedGoodsDetails.remarks"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 140px"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quality Control Inspection -->
          <div class="column q-mt-xl">
            <h6 class="q-ma-none q-mb-md">Quality Control Inspection</h6>
            <div class="q-gutter-y-md full-width">
              <!-- Inspection Date -->
              <div style="max-width: 426px">
                <label>Inspection Date <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="finishedGoodsDetails.inspection_date"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Inspector Name -->
              <div style="max-width: 426px">
                <label>Inspector Name <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="finishedGoodsDetails.inspector_name"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
            </div>

            <!-- Inspection Criterias -->
            <div>
              <h6 class="text-subtitle2 text-weight-bold">
                Inspection Criteria:
              </h6>
              <div class="column q-gutter-y-xl">
                <div
                  v-for="(
                    criteria, index
                  ) in finishedGoodsDetails.inspection_criterias"
                  :key="criteria.key"
                  class="relative-position column q-pa-xl"
                  style="border: 1px solid #c6c6c6"
                >
                  <!-- Delete Criteria Icon -->
                  <q-btn
                    v-if="index !== 0"
                    unelevated
                    icon="delete"
                    class="absolute fixed-top-right q-ma-sm"
                    @click="openDeleteDialog(criteria)"
                  />

                  <div
                    class="row justify-between full-height no-wrap"
                    style="gap: 68px"
                  >
                    <!-- First Column -->
                    <div class="q-gutter-y-md full-width">
                      <!-- Criteria -->
                      <div>
                        <label>Criteria <span class="text-red">*</span></label>
                        <q-input
                          outlined
                          v-model="criteria.criteria"
                          dense
                          class="q-mt-sm"
                          :rules="[(val) => !!val || 'Field is required']"
                        />
                      </div>

                      <!-- Standard -->
                      <div>
                        <label>Standard <span class="text-red">*</span></label>
                        <q-input
                          outlined
                          v-model="criteria.remarks"
                          type="textarea"
                          dense
                          class="q-mt-sm"
                          input-style="height: 140px"
                          :rules="[(val) => !!val || 'Field is required']"
                        />
                      </div>
                    </div>

                    <!-- 2nd Column -->
                    <div class="q-gutter-y-md full-width">
                      <!-- Evaluation Result -->
                      <div>
                        <label
                          >Evaluation Result
                          <span class="text-red">*</span></label
                        >
                        <q-input
                          outlined
                          v-model="criteria.remarks"
                          type="textarea"
                          dense
                          class="q-mt-sm"
                          input-style="height: 140px"
                          :rules="[(val) => !!val || 'Field is required']"
                        />
                      </div>

                      <!-- Status -->
                      <div>
                        <label>Status <span class="text-red">*</span></label>
                        <q-select
                          outlined
                          dense
                          v-model="criteria.status"
                          :options="criteriaStatusOptions"
                          class="q-mt-sm"
                          :rules="[(val) => !!val || 'Field is required']"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Shown if Status is Fail -->
                  <div
                    v-if="
                      criteria.status !== null && criteria.status.value === 1
                    "
                  >
                    <div
                      class="row justify-between full-height no-wrap"
                      style="gap: 68px"
                    >
                      <!-- First Column -->
                      <div class="q-gutter-y-md full-width">
                        <!-- Corrective Action -->
                        <div>
                          <label
                            >Corrective Action
                            <span class="text-red">*</span></label
                          >
                          <q-input
                            outlined
                            v-model="criteria.corrective_action"
                            type="textarea"
                            dense
                            class="q-mt-sm"
                            input-style="height: 140px"
                            :rules="[(val) => !!val || 'Field is required']"
                          />
                        </div>
                      </div>

                      <!-- 2nd Column -->
                      <div class="q-gutter-y-md full-width">
                        <!-- Corrected By -->
                        <div>
                          <label
                            >Corrected By <span class="text-red">*</span></label
                          >
                          <q-input
                            outlined
                            v-model="criteria.corrected_by"
                            dense
                            class="q-mt-sm"
                            :rules="[(val) => !!val || 'Field is required']"
                          />
                        </div>

                        <!-- Correct Date and Time -->
                        <div>
                          <label>
                            Correct Date and Time
                            <span class="text-red">*</span>
                          </label>
                          <q-input
                            outlined
                            v-model="criteria.corrected_date_and_time"
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
                                    v-model="criteria.corrected_date_and_time"
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
                                    v-model="criteria.corrected_date_and_time"
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
                    </div>

                    <!-- Mode of Failure/Reject -->
                    <div class="q-mt-md">
                      <h6
                        class="q-ma-none q-mb-md text-subtitle2 text-weight-bold"
                      >
                        Mode of Failure/Reject
                      </h6>
                      <!-- Total Quantity Rejected -->
                      <div style="max-width: 368px; height: 90px">
                        <label>Total Quantity Rejected</label>
                        <q-input
                          outlined
                          v-model="criteria.total_quantity_rejected"
                          dense
                          type="number"
                          class="q-mt-sm"
                          disable
                          style="background: #f3f4f6"
                        />
                      </div>

                      <!-- Defects -->
                      <div v-if="criteria.defects.length > 0">
                        <div
                          v-for="defect in criteria.defects"
                          :key="defect.id"
                          class="row justify-between full-height no-wrap"
                          style="gap: 68px"
                        >
                          <!-- First Column -->
                          <div class="q-gutter-y-md full-width">
                            <!-- Defect -->
                            <div>
                              <label
                                >Defect <span class="text-red">*</span></label
                              >
                              <q-input
                                outlined
                                v-model="defect.defect"
                                dense
                                class="q-mt-sm"
                                :rules="[(val) => !!val || 'Field is required']"
                              />
                            </div>
                          </div>

                          <!-- 2nd Column -->
                          <div class="q-gutter-y-md full-width">
                            <!-- Quantity -->
                            <div>
                              <label>
                                Quantity <span class="text-red">*</span>
                              </label>
                              <q-input
                                outlined
                                v-model="defect.quantity"
                                dense
                                type="number"
                                class="q-mt-sm"
                                :rules="[(val) => !!val || 'Field is required']"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Add Defect Button -->
                    <div class="q-mt-xl">
                      <q-btn
                        :disable="addDefectLoading"
                        @click="addDefect(criteria.key)"
                        no-caps
                        flat
                        class="bg-primary text-white"
                      >
                        <q-spinner
                          v-if="addDefectLoading"
                          size="24px"
                          color="positive"
                          class="q-mr-md"
                        />
                        Add Defect
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Criteria Button -->
            <div class="q-mt-xl">
              <q-btn
                :disable="addCriteriaLoading"
                @click="addCriteria"
                no-caps
                flat
                class="bg-primary text-white"
              >
                <q-spinner
                  v-if="addCriteriaLoading"
                  size="24px"
                  color="positive"
                  class="q-mr-md"
                />
                Add Criteria
              </q-btn>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <!-- Delete Dialog -->
    <q-dialog v-model="criteriaDeleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeCriteriaDeleteDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete this criteria from the quality control
          inspection record?
        </q-card-section>

        <q-card-section
          v-if="
            selectedCriteria.criteria !== null &&
            selectedCriteria.criteria !== undefined &&
            selectedCriteria.criteria !== ''
          "
          class="q-pt-none text-center"
        >
          <span class="text-bold">Criteria: </span>
          {{ selectedCriteria.criteria }}
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
            @click="deleteCriteria(selectedCriteria.key)"
            :disable="deleteCriteriaLoading"
          >
            <q-spinner v-if="deleteCriteriaLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Action Buttons -->
    <div>
      <q-btn
        :disable="saveFinishedGoodsLoading"
        @click="saveFinishedGoods"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      >
        <q-spinner
          v-if="saveFinishedGoodsLoading"
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
import { onMounted, ref, watch } from "vue";
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

const finishedGoodsDetails = ref({
  production_batch_number: null,
  sop_reference: null,
  product_name: null,
  quantity: null,
  uom: null,
  packaging_type: null,
  storage_location: null,
  best_before_date: null,
  storage_condition: null,
  remarks: null,
  inspection_date: null,
  inspector_name: null,
  inspection_criterias: [
    {
      key: Date.now(),
      criteria: null,
      standard: null,
      evaluation_result: null,
      status: null,
      corrective_action: null,
      corrected_by: null,
      corrected_date_and_time: null,
      total_quantity_rejected: null,
      defects: [
        {
          key: Date.now(),
          defect: null,
          quantity: null,
        },
      ],
    },
  ],
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

const packagingTypeOptions = ref([
  { label: "Bottles", value: 0 },
  { label: "Cans", value: 1 },
  { label: "Boxes", value: 2 },
  { label: "Pouches", value: 3 },
  { label: "Bags", value: 4 },
  { label: "Jars", value: 5 },
  { label: "Tetra Paks", value: 6 },
  { label: "Trays", value: 7 },
  { label: "Bucket", value: 8 },
  { label: "Tins", value: 9 },
  { label: "Wraps", value: 10 },
  { label: "Drums", value: 11 },
  { label: "Cartons", value: 12 },
  { label: "Blisters", value: 13 },
  { label: "Clamshells", value: 14 },
  { label: "Rolls", value: 15 },
  { label: "Pallets", value: 16 },
  { label: "Cups", value: 17 },
  { label: "Tubes", value: 18 },
  { label: "Packets", value: 19 },
]);

const storageConditionOptions = ref([
  { label: "Freezer", value: 0 },
  { label: "Chiller", value: 1 },
  { label: "Room Temperature", value: 2 },
  { label: "Others", value: 3 },
]);

const criteriaStatusOptions = ref([
  { label: "Pass", value: 0 },
  { label: "Fail", value: 1 },
]);

const addCriteriaLoading = ref(false);
const criteriaDeleteDialog = ref(false);
const deleteCriteriaLoading = ref(false);
const selectedCriteria = ref(null);

const addDefectLoading = ref(false);

const saveFinishedGoodsLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    finishedGoodsDetails.value.production_batch_number = +route.params.id;
    loading.value = false;
  }, 1000);

  // addSampleLabelTrace();
});

// Functions
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

const filterPackagingTypeOptions = (val, update) => {
  update(() => {
    packagingTypeOptions.value = [
      { label: "Bottles", value: 0 },
      { label: "Cans", value: 1 },
      { label: "Boxes", value: 2 },
      { label: "Pouches", value: 3 },
      { label: "Bags", value: 4 },
      { label: "Jars", value: 5 },
      { label: "Tetra Paks", value: 6 },
      { label: "Trays", value: 7 },
      { label: "Bucket", value: 8 },
      { label: "Tins", value: 9 },
      { label: "Wraps", value: 10 },
      { label: "Drums", value: 11 },
      { label: "Cartons", value: 12 },
      { label: "Blisters", value: 13 },
      { label: "Clamshells", value: 14 },
      { label: "Rolls", value: 15 },
      { label: "Pallets", value: 16 },
      { label: "Cups", value: 17 },
      { label: "Tubes", value: 18 },
      { label: "Packets", value: 19 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    packagingTypeOptions.value = packagingTypeOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const addCriteria = () => {
  finishedGoodsDetails.value.inspection_criterias.push({
    key: Date.now(),
    criteria: null,
    standard: null,
    evaluation_result: null,
    status: null,
    corrective_action: null,
    corrected_by: null,
    corrected_date_and_time: null,
    total_quantity_rejected: null,
    defects: [
      {
        key: Date.now(),
        defect: null,
        quantity: null,
      },
    ],
  });
};

const openDeleteDialog = (criteria) => {
  selectedCriteria.value = criteria;
  console.log("Selected Criteria", selectedCriteria.value);
  criteriaDeleteDialog.value = true;
};

const closeCriteriaDeleteDialog = () => {
  criteriaDeleteDialog.value = false;
};

const addDefect = (criteriaKey) => {
  addDefectLoading.value = true;

  setTimeout(() => {
    const criteria = finishedGoodsDetails.value.inspection_criterias.find(
      (criteria) => criteria.key === criteriaKey
    );

    criteria.defects.push({
      key: Date.now(),
      defect: null,
      quantity: null,
    });

    addDefectLoading.value = false;
  }, 1000);
};

const deleteCriteria = (key) => {
  deleteCriteriaLoading.value = true;

  setTimeout(() => {
    finishedGoodsDetails.value.inspection_criterias =
      finishedGoodsDetails.value.inspection_criterias.filter(
        (criteria) => criteria.key !== key
      );

    criteriaDeleteDialog.value = false;
    deleteCriteriaLoading.value = false;
  }, 1000);
};

// save the whole process
const saveFinishedGoods = () => {
  saveFinishedGoodsLoading.value = true;

  let payload = finishedGoodsDetails.value;

  setTimeout(() => {
    console.log("Process Saved", payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The record has been saved.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });

    saveFinishedGoodsLoading.value = false;
  }, 1000);
};

// Watchers
// Watch for changes in defects and update total_quantity_rejected
watch(
  () => finishedGoodsDetails.value.inspection_criterias,
  (newVal) => {
    newVal.forEach((criteria) => {
      criteria.total_quantity_rejected = criteria.defects.reduce(
        (sum, defect) => sum + (+defect.quantity || 0),
        0
      );
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}

:deep(.remaining-quantity-disabled .q-field__control) {
  background: #f3f4f6;
}
</style>
