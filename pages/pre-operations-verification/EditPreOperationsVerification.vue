<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Pre-Operations Verification"
      :items="[
        {
          label: 'Pre-Operations Verification',
        },
        {
          label: 'Edit Pre-Operations Verification',
          to: { name: 'edit-pre-operations-verification' },
        },
      ]"
    />

    <!-- Pre-operations Verification details -->
    <SectionWrapperLoader v-if="loading" has-header class="q-mb-xl q-mt-xl" />
    <SectionWrapper v-else class="q-mt-xl">
      <template #header>
        <p class="text-grey-8">
          Please fill out the required fields <span class="text-red">*</span>
        </p>
      </template>

      <template #default>
        <!-- Production batch number -->
        <div class="q-mt-xl" style="max-width: 304px">
          <label>Production Batch Number <span class="text-red">*</span></label>
          <q-select
            use-input
            outlined
            dense
            disable
            v-model="productionBatchNumber"
            :options="productionBatchNumberList"
            option-label="batch_number"
            option-value="id"
            input-debounce="500"
            hide-selected
            hide-dropdown-icon
            fill-input
            map-options
            emit-value
            @filter="productionBatchNumberListFilter"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
            class="q-mt-sm q-mb-md"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          v-for="(
            inspection, index
          ) in preOperationVerification.preoperation_verifications_inspections"
          :key="inspection.key"
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
              @click="openDeleteDialog(inspection.key)"
            />

            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Inspection -->
              <div>
                <label>Inspection <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="inspection.inspection"
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
                  v-model="inspection.status"
                  :options="statusOptions"
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- SOP reference -->
              <div>
                <label>SOP Reference</label>
                <q-file
                  outlined
                  v-model="inspection.new_sop_reference"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
                <div v-if="inspection.sop_reference">
                  <p>Current File - {{ inspection.sop_reference }}</p>
                </div>
              </div>
            </div>

            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Performed By -->
              <div style="height: 88px">
                <label>Performed By <span class="text-red">*</span></label>
                <q-select
                  use-input
                  outlined
                  dense
                  v-model="inspection.performed_by"
                  :options="UserList"
                  option-label="personnel_name"
                  option-value="personnel_name"
                  input-debounce="500"
                  hide-selected
                  hide-dropdown-icon
                  fill-input
                  map-options
                  emit-value
                  @filter="userListFilter"
                  class="q-mt-sm q-mb-md"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-select>
                <p
                  class="text-red q-ma-none"
                  style="
                    font-size: 11px;
                    transform: translateY(-10px);
                    padding-left: 12px;
                  "
                >
                  {{ performedByError }}
                </p>
              </div>

              <!-- Performed Date and time -->
              <div>
                <label
                  >Performed Date & Time <span class="text-red">*</span></label
                >
                <q-input
                  outlined
                  v-model="inspection.performed_date_and_time"
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
                          v-model="inspection.performed_date_and_time"
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
                          v-model="inspection.performed_date_and_time"
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
              <div style="height: 88px">
                <label>Verified By <span class="text-red">*</span></label>
                <q-select
                  use-input
                  outlined
                  dense
                  v-model="inspection.verified_by"
                  :options="UserList"
                  option-label="personnel_name"
                  option-value="personnel_name"
                  input-debounce="500"
                  hide-selected
                  hide-dropdown-icon
                  fill-input
                  map-options
                  emit-value
                  @filter="userListFilter"
                  class="q-mt-sm q-mb-md"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-select>
                <p
                  class="text-red q-ma-none"
                  style="
                    font-size: 11px;
                    transform: translateY(-10px);
                    padding-left: 12px;
                  "
                >
                  {{ verifiedByError }}
                </p>
              </div>

              <!-- Verified Date and time -->
              <div>
                <label
                  >Verified Date & Time <span class="text-red">*</span></label
                >
                <q-input
                  outlined
                  v-model="inspection.verified_date_and_time"
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
                          v-model="inspection.verified_date_and_time"
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
                          v-model="inspection.verified_date_and_time"
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

          <div
            v-if="
              inspection.status !== null &&
              (inspection.status.value === 'non_compliant' ||
                inspection.status === 'Non Compliant')
            "
            class="q-mt-md"
          >
            <div
              class="row justify-between full-height no-wrap"
              style="gap: 68px"
            >
              <div class="q-gutter-y-md" style="width: 100%">
                <!-- Observation -->
                <div>
                  <label>Observation <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="inspection.observation"
                    type="textarea"
                    dense
                    class="q-mt-sm"
                    input-style="height: 140px"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
              </div>

              <div class="q-gutter-y-md" style="width: 100%">
                <!-- Corrected By -->
                <div style="height: 88px">
                  <label>Corrected By <span class="text-red">*</span></label>
                  <q-select
                    use-input
                    outlined
                    dense
                    v-model="inspection.corrected_by"
                    :options="UserList"
                    option-label="personnel_name"
                    option-value="personnel_name"
                    input-debounce="500"
                    hide-selected
                    hide-dropdown-icon
                    fill-input
                    map-options
                    emit-value
                    @filter="userListFilter"
                    class="q-mt-sm q-mb-md"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                  <p
                    class="text-red q-ma-none"
                    style="
                      font-size: 11px;
                      transform: translateY(-10px);
                      padding-left: 12px;
                    "
                  >
                    {{ correctedByError }}
                  </p>
                </div>

                <!-- Corrected Date and time -->
                <div>
                  <label
                    >Corrected Date & Time
                    <span class="text-red">*</span></label
                  >
                  <q-input
                    outlined
                    v-model="inspection.corrected_date_and_time"
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
                            v-model="inspection.corrected_date_and_time"
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
                            v-model="inspection.corrected_date_and_time"
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

            <!-- Corrective Action -->
            <div class="q-mt-lg">
              <label>Corrective Action <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="inspection.corrective_action"
                type="textarea"
                dense
                class="q-mt-sm"
                input-style="height: 140px"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
        </div>

        <div
          v-if="addInspectionLoading"
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
          Are you sure you want to remove this inspection?
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
            @click="deleteInspection(selectedInspection.key)"
            :disable="deleteInspectionLoading"
          >
            <q-spinner v-if="deleteInspectionLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Action Buttons -->
    <div class="q-mt-xl">
      <q-btn @click="addInspection" no-caps flat class="bg-primary text-white">
        <q-spinner
          v-if="deleteInspectionLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Inspection
      </q-btn>
    </div>

    <div>
      <q-btn
        @click="updatePreOperationsVerification"
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
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { usePreOperationsVerificationStore } from "../../stores/pre-operations-verification-store";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const preOperationsVerificationStore = usePreOperationsVerificationStore();
const productionBatchNumber = ref([]);
const productionBatchNumberId = ref(null);
const productionBatchNumberList = ref([]);

const preOperationVerification = ref({
  preoperation_verifications_inspections: [
    {
      key: Date.now(),
      inspection: null,
      status: null,
      sop_reference: null,
      new_sop_reference: null,
      performed_by: null,
      performed_date_and_time: null,
      verified_by: null,
      verified_date_and_time: null,
      observation: null,
      corrected_by: null,
      corrected_date_and_time: null,
      corrective_action: null,
    },
  ],
});

const loading = ref(false);
const addInspectionLoading = ref(false);
const deleteInspectionLoading = ref(false);

const statusOptions = [
  {
    label: "Compliant",
    value: "compliant",
  },
  {
    label: "Non Compliant",
    value: "non_compliant",
  },
];

const deleteDialog = ref(false);
const selectedInspection = ref(null);

const UserList = ref([]);
const performedByError = ref(null);
const verifiedByError = ref(null);
const correctedByError = ref(null);

const initialDataLoaded = ref(false);

// Lifecycle Hooks
onMounted(() => {
  getPreOperationsVerification();
  initialDataLoaded.value = true;
});

// Functions
const productionBatchNumberListFilter = (val, update) => {
  preOperationsVerificationStore
    .GetProductionBatchNumber({ batch_number: val })
    .then((response) => {
      update(() => {
        productionBatchNumberList.value = response.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const userListFilter = (val, update) => {
  preOperationsVerificationStore
    .GetUserInfo({ personnel_name: val })
    .then((response) => {
      update(() => {
        UserList.value = response.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPreOperationsVerification = () => {
  loading.value = true;

  preOperationsVerificationStore
    .GetPreOperationVerification(+route.params.id)
    .then((response) => {
      response.data.preoperation_verifications_inspections.forEach(
        (inspection) => {
          inspection.status =
            inspection.status === 0 ? "Non Compliant" : "Compliant";
        }
      );

      preOperationVerification.value = response.data;

      loadCurrentBatchNumber(response.data.batch_number);

      console.log(
        "Pre-Operations Verification",
        preOperationVerification.value
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const loadCurrentBatchNumber = (batch_number) => {
  preOperationsVerificationStore
    .GetProductionBatchNumber({ batch_number })
    .then((response) => {
      productionBatchNumberId.value = response.data[0].id;
      productionBatchNumber.value = response.data[0].batch_number;
    })
    .catch((error) => {
      console.log(error);
    });
};

const addInspection = () => {
  addInspectionLoading.value = true;

  setTimeout(() => {
    preOperationVerification.value.preoperation_verifications_inspections.push({
      key: Date.now(),
      inspection: null,
      status: null,
      sop_reference: null,
      performed_by: null,
      performed_date_and_time: null,
      verified_by: null,
      verified_date_and_time: null,
      observation: null,
      corrected_by: null,
      corrected_date_and_time: null,
      corrective_action: null,
    });

    addInspectionLoading.value = false;
  }, 1000);
};

const openDeleteDialog = (inspectionKey) => {
  deleteDialog.value = true;
  selectedInspection.value =
    preOperationVerification.value.preoperation_verifications_inspections.find(
      (inspection) => inspection.key === inspectionKey
    );
};

const deleteInspection = (key) => {
  console.log("Delete Inspection", key);
  deleteInspectionLoading.value = true;

  setTimeout(() => {
    preOperationVerification.value.preoperation_verifications_inspections =
      preOperationVerification.value.preoperation_verifications_inspections.filter(
        (inspection) => inspection.key !== key
      );

    deleteDialog.value = false;
    deleteInspectionLoading.value = false;
  }, 1000);
};

const updatePreOperationsVerification = () => {
  preOperationVerification.value.preoperation_verifications_inspections.forEach(
    (inspection) => {
      if (!inspection.performed_by) {
        performedByError.value = "Field is required";
      }
      if (!inspection.verified_by) {
        verifiedByError.value = "Field is required";
      }
      if (
        inspection.status &&
        inspection.status.value === "non_compliant" &&
        !inspection.corrected_by
      ) {
        correctedByError.value = "Field is required";
      }
    }
  );

  // validations
  if (
    !preOperationVerification.value.batch_number ||
    performedByError.value ||
    verifiedByError.value ||
    correctedByError.value ||
    preOperationVerification.value.preoperation_verifications_inspections.some(
      (inspection) =>
        !inspection.inspection ||
        !inspection.status ||
        !inspection.sop_reference ||
        !inspection.performed_date_and_time ||
        !inspection.verified_date_and_time ||
        (inspection.status.value === "non_compliant" &&
          (!inspection.observation ||
            !inspection.corrective_action ||
            !inspection.corrected_date_and_time))
    )
  ) {
    $q.notify({
      html: true,
      message: `<strong>Error!</strong> Please check the errors and fill out the required fields.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-error",
    });
    return;
  }

  // update the data
  let payload = new FormData();
  payload.append("id", preOperationVerification.value.id);
  payload.append("production_id", productionBatchNumberId.value);
  preOperationVerification.value.preoperation_verifications_inspections.forEach(
    (inspection, index) => {
      payload.append(
        `preoperation_verifications_inspections[${index}][inspection]`,
        inspection.inspection
      );
      payload.append(
        `preoperation_verifications_inspections[${index}][status]`,
        inspection.status.value === "compliant" ? 1 : 0
      );

      if (inspection.new_sop_reference instanceof File) {
        payload.append(
          `preoperation_verifications_inspections[${index}][sop_reference]`,
          inspection.new_sop_reference
        );
      }

      payload.append(
        `preoperation_verifications_inspections[${index}][performed_by]`,
        inspection.performed_by
      );
      payload.append(
        `preoperation_verifications_inspections[${index}][performed_date_and_time]`,
        inspection.performed_date_and_time
      );
      payload.append(
        `preoperation_verifications_inspections[${index}][verified_by]`,
        inspection.verified_by
      );
      payload.append(
        `preoperation_verifications_inspections[${index}][verified_date_and_time]`,
        inspection.verified_date_and_time
      );

      if (
        inspection.status === "Non Compliant" ||
        inspection.status === 0 ||
        inspection.status.value === "non_compliant"
      ) {
        if (inspection.observation) {
          payload.append(
            `preoperation_verifications_inspections[${index}][observation]`,
            inspection.observation
          );
        }

        if (inspection.corrected_by) {
          payload.append(
            `preoperation_verifications_inspections[${index}][corrected_by]`,
            inspection.corrected_by
          );
        }

        if (inspection.corrected_date_and_time) {
          payload.append(
            `preoperation_verifications_inspections[${index}][corrected_date_and_time]`,
            inspection.corrected_date_and_time
          );
        }

        if (inspection.corrective_action) {
          payload.append(
            `preoperation_verifications_inspections[${index}][corrective_action]`,
            inspection.corrective_action
          );
        }
      }
    }
  );

  console.log("Payload being sent:", Object.fromEntries(payload.entries()));

  preOperationsVerificationStore
    .EditPreOperationVerification({ id: +route.params.id, payload })
    .then((response) => {
      $q.notify({
        html: true,
        message: `<strong>Success!</strong> Pre-Operations Verification has been updated successfully.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-success",
      });

      router.push({ name: "pre-operations-verification" });
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Unable to update Pre-Operations Verification.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-error",
      });
    });
};

// Watchers
watch(
  () => preOperationVerification.value.preoperation_verifications_inspections,
  (newValues) => {
    newValues.forEach((value) => {
      const { performed_by, verified_by, corrected_by } = value;

      const errors = {
        performedBy: "",
        verifiedBy: "",
        correctedBy: "",
      };

      if (performed_by && verified_by && performed_by === verified_by) {
        errors.performedBy =
          "Performed By should be different from Verified By";
        errors.verifiedBy = "Verified By should be different from Performed By";
      }

      if (performed_by && corrected_by && performed_by === corrected_by) {
        errors.performedBy =
          "Performed By should be different from Corrected By";
        errors.correctedBy =
          "Corrected By should be different from Performed By";
      }

      if (verified_by && corrected_by && verified_by === corrected_by) {
        errors.verifiedBy = "Verified By should be different from Corrected By";
        errors.correctedBy =
          "Corrected By should be different from Verified By";
      }

      if (
        performed_by &&
        verified_by &&
        corrected_by &&
        performed_by === verified_by &&
        performed_by === corrected_by
      ) {
        errors.performedBy =
          "Performed By should be different from both Verified By and Corrected By";
        errors.verifiedBy =
          "Verified By should be different from both Performed By and Corrected By";
        errors.correctedBy =
          "Corrected By should be different from both Performed By and Verified By";
      }

      performedByError.value = errors.performedBy;
      verifiedByError.value = errors.verifiedBy;
      correctedByError.value = errors.correctedBy;
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
