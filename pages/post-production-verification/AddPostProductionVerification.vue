<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Post Production Verification"
      :items="[
        {
          label: 'Post Production Verification',
        },
        {
          label: 'Add Post Production Verification',
          to: { name: 'add-post-production-verification' },
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
          <q-input
            outlined
            v-model="productionBatchNumber"
            dense
            class="q-mt-sm"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <div
          v-for="(inspection, index) in inspections"
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
                <label>SOP Reference <span class="text-red">*</span></label>
                <q-file
                  outlined
                  v-model="inspection.sop_reference"
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

            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Performed By -->
              <div>
                <label>Performed By <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="inspection.performed_by"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
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
              <div>
                <label>Verified By <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="inspection.verified_by"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
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
              inspection.status.value === 'non_compliant'
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
                <div>
                  <label>Corrected By <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="inspection.corrected_by"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
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

        <q-card-section
          v-if="
            selectedInspection.inspection !== null &&
            selectedInspection.inspection !== undefined &&
            selectedInspection.inspection !== ''
          "
          class="q-pt-none text-center"
        >
          <span class="text-bold">Inspection: </span>
          {{ selectedInspection.inspection }}
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
        @click="savePostProductionVerification"
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

const inspections = ref([
  {
    key: Date.now(),
    inspection: null,
    status: null,
    sop_reference: null,
    performed_by: null,
    performed_date_and_time: null,
    verified_by: null,
    verified_date_and_time: null,
  },
]);

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

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Functions
const addInspection = () => {
  addInspectionLoading.value = true;

  setTimeout(() => {
    inspections.value.push({
      key: Date.now(),
      inspection: null,
      status: null,
      sop_reference: null,
      performed_by: null,
      performed_date_and_time: null,
      verified_by: null,
      verified_date_and_time: null,
    });

    addInspectionLoading.value = false;
  }, 1000);
};

const openDeleteDialog = (inspectionKey) => {
  deleteDialog.value = true;
  selectedInspection.value = inspections.value.find(
    (inspection) => inspection.key === inspectionKey
  );
};

const deleteInspection = (key) => {
  console.log("Delete Inspection", key);
  deleteInspectionLoading.value = true;

  setTimeout(() => {
    inspections.value = inspections.value.filter(
      (inspection) => inspection.key !== key
    );

    deleteDialog.value = false;
    deleteInspectionLoading.value = false;
  }, 1000);
};

const savePostProductionVerification = () => {
  const payload = {
    productionBatchNumber: productionBatchNumber.value,
    inspections: inspections.value,
  };

  console.log("Save Post Production Verification", payload);

  $q.notify({
    html: true,
    message: `<strong>Success!</strong> The record has been saved.`,
    position: "top-right",
    timeout: 2000,
    classes: "quasar-notification-success",
  });
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
