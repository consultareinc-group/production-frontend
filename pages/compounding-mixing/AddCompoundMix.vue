<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Compounding/Mixing"
      :items="[
        {
          label: 'Compounding/Mixing',
        },
        {
          label: 'Add Compounds/Mixes',
          to: { name: 'add-compound-mix' },
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
        <!-- Production batch number -->
        <div class="q-mt-xl row full-width">
          <div
            class="full-width"
            style="max-width: 304px; margin-right: 34px !important"
          >
            <label>
              Production Batch Number <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="productionBatchNumber"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="full-width" style="max-width: 304px">
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
          v-for="(compoundMix, index) in compoundsMixes"
          :key="compoundMix.key"
          class="relative-position q-pa-xl"
          :class="index === 0 ? '' : 'q-mt-xl'"
          style="border: 1px solid #c6c6c6"
        >
          <div
            class="row justify-between full-height no-wrap"
            style="gap: 68px"
          >
            <q-btn
              v-if="index !== 0"
              unelevated
              icon="delete"
              class="absolute fixed-top-right q-ma-sm"
              @click="openDeleteDialog(compoundMix.key)"
            />

            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Material Name -->
              <div>
                <label>Material Name <span class="text-red">*</span></label>
                <q-select
                  use-input
                  outlined
                  dense
                  v-model="compoundMix.material_name"
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
                  :rules="[(val) => !!val || 'Field is required']"
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-select>
              </div>

              <!-- Actual Amount -->
              <div>
                <label>Actual Amount <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="compoundMix.actual_amount"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Standard Duration -->
              <div>
                <label>Standard Duration <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="compoundMix.standard_duration"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Start Date & Time of Mixing -->
              <div>
                <label>
                  Start Date & Time of Mixing <span class="text-red">*</span>
                </label>
                <q-input
                  outlined
                  v-model="compoundMix.start_date_and_time_of_mixing"
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
                          v-model="compoundMix.start_date_and_time_of_mixing"
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
                          v-model="compoundMix.start_date_and_time_of_mixing"
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

              <!-- End Date & Time of Mixing -->
              <div>
                <label>
                  End Date & Time of Mixing <span class="text-red">*</span>
                </label>
                <q-input
                  outlined
                  v-model="compoundMix.end_date_and_time_of_mixing"
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
                          v-model="compoundMix.end_date_and_time_of_mixing"
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
                          v-model="compoundMix.end_date_and_time_of_mixing"
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

              <!-- Operator Name(s) -->
              <div>
                <label>Operator Name(s) <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="compoundMix.operator_name"
                  type="textarea"
                  dense
                  class="q-mt-sm"
                  input-style="height: 140px"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <span class="text-caption">Enter comma separated names.</span>
              </div>
            </div>

            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Instructions -->
              <div>
                <label>Instructions <span class="text-red">*</span></label>
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

              <!-- Reviewed By -->
              <div>
                <label>Reviewed By <span class="text-red">*</span></label>
                <q-select
                  use-input
                  outlined
                  dense
                  v-model="compoundMix.reviewed_by"
                  :options="reviewers"
                  option-label="value"
                  option-value="value"
                  input-debounce="500"
                  hide-selected
                  hide-dropdown-icon
                  fill-input
                  map-options
                  emit-value
                  @filter="filterReviewers"
                  :rules="[(val) => !!val || 'Field is required']"
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-select>
              </div>

              <!-- Reviewed Date and time -->
              <div>
                <label
                  >Reviewed Date & Time <span class="text-red">*</span></label
                >
                <q-input
                  outlined
                  v-model="compoundMix.reviewed_date_and_time"
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
                          v-model="compoundMix.reviewed_date_and_time"
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
                          v-model="compoundMix.reviewed_date_and_time"
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

              <!-- Approved By -->
              <div>
                <label>Approved By <span class="text-red">*</span></label>
                <q-select
                  use-input
                  outlined
                  dense
                  v-model="compoundMix.approved_by"
                  :options="approvers"
                  option-label="value"
                  option-value="value"
                  input-debounce="500"
                  hide-selected
                  hide-dropdown-icon
                  fill-input
                  map-options
                  emit-value
                  @filter="filterApprovers"
                  :rules="[(val) => !!val || 'Field is required']"
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-select>
              </div>

              <!-- Approved Date and time -->
              <div>
                <label
                  >Approved Date & Time <span class="text-red">*</span></label
                >
                <q-input
                  outlined
                  v-model="compoundMix.approved_date_and_time"
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
                          v-model="compoundMix.approved_date_and_time"
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
                          v-model="compoundMix.approved_date_and_time"
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
                <label>Remarks <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="compoundMix.remarks"
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

        <div
          v-if="addMaterialLoading"
          class="q-mt-xl"
          style="border: 1px solid #c6c6c6"
        >
          <SectionWrapperLoader class="q-mt-xl" />
        </div>
      </template>
    </SectionWrapper>

    <!-- Delete Inspection Modal -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="deleteDialog = false"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete this material from the
          compounding/mixing process?
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
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
          v-if="deleteMaterialLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Material
      </q-btn>
    </div>

    <div>
      <q-btn
        @click="saveCompoundingMixing"
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
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const productionBatchNumber = ref("");
const sopReference = ref(null);

const compoundsMixes = ref([
  {
    key: Date.now(),
    material_name: null,
    actual_amount: null,
    standard_duration: null,
    start_date_and_time_of_mixing: null,
    end_date_and_time_of_mixing: null,
    operator_name: null,
    instructions: null,
    reviewed_by: null,
    reviewed_date_and_time: null,
    approved_by: null,
    approved_date_and_time: null,
    remarks: null,
  },
]);

const materialNameOptions = ref([
  {
    label: "Material 1",
    value: "material_1",
  },
  {
    label: "Material 2",
    value: "material_2",
  },
]);

const reviewers = ref([
  {
    id: 1,
    value: "Reviewer 1",
  },
  {
    id: 2,
    value: "Reviewer 2",
  },
]);

const approvers = ref([
  {
    id: 1,
    value: "Approver 1",
  },
  {
    id: 2,
    value: "Approver 2",
  },
]);

const loading = ref(false);
const addMaterialLoading = ref(false);
const deleteMaterialLoading = ref(false);

const deleteDialog = ref(false);
const selectedMaterial = ref(null);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Functions
const addMaterial = () => {
  addMaterialLoading.value = true;

  setTimeout(() => {
    compoundsMixes.value.push({
      key: Date.now(),
      material_name: null,
      actual_amount: null,
      standard_duration: null,
      start_date_and_time_of_mixing: null,
      end_date_and_time_of_mixing: null,
      operator_name: null,
      instructions: null,
      reviewed_by: null,
      reviewed_date_and_time: null,
      approved_by: null,
      approved_date_and_time: null,
      remarks: null,
    });

    addMaterialLoading.value = false;
  }, 1000);
};

const openDeleteDialog = (inspectionKey) => {
  deleteDialog.value = true;
  selectedMaterial.value = compoundsMixes.value.find(
    (inspection) => inspection.key === inspectionKey
  );
};

const deleteMaterial = (key) => {
  console.log("Delete Material", key);
  deleteMaterialLoading.value = true;

  setTimeout(() => {
    compoundsMixes.value = compoundsMixes.value.filter(
      (inspection) => inspection.key !== key
    );

    deleteDialog.value = false;
    deleteMaterialLoading.value = false;
  }, 1000);
};

const saveCompoundingMixing = () => {
  console.log("Save Compounding/Mixing");

  $q.notify({
    html: true,
    message: `<strong>Success!</strong> Compounding/Mixing has been added successfully.`,
    position: "top-right",
    timeout: 2000,
    classes: "quasar-notification-success",
  });
};

const filterMaterialNameOptions = (val, update) => {
  if (val === "") {
    update(() => {
      materialNameOptions.value = [
        {
          label: "Material 1",
          value: "material_1",
        },
        {
          label: "Material 2",
          value: "material_2",
        },
      ];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    materialNameOptions.value = materialNameOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterReviewers = (val, update) => {
  if (val === "") {
    update(() => {
      reviewers.value = [
        {
          id: 1,
          value: "Reviewer 1",
        },
        {
          id: 2,
          value: "Reviewer 2",
        },
      ];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    reviewers.value = reviewers.value.filter(
      (v) => v.value.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterApprovers = (val, update) => {
  if (val === "") {
    update(() => {
      approvers.value = [
        {
          id: 1,
          value: "Approver 1",
        },
        {
          id: 2,
          value: "Approver 2",
        },
      ];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    approvers.value = approvers.value.filter(
      (v) => v.value.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
