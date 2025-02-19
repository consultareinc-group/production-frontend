<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Rework/Reprocess"
      :items="[
        {
          label: 'Rework/Reprocess',
          to: { name: 'view-rework-reprocess' },
        },
        {
          label: 'Edit Rework/Reprocess Details',
          to: { name: 'edit-rework-reprocess-details' },
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
              v-model="reworkReprocessDetails.productionBatchNumber"
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
              v-model="reworkReprocessDetails.sopReference"
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
          v-for="(material, index) in reworkReprocessDetails.materials"
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
              </div>

              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <div class="q-gutter-y-md full-width">
                  <!-- Material Quantity for Reprocessing -->
                  <div>
                    <label
                      >Material Quantity for Reprocessing
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.material_quantity_for_reprocessing"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <div class="q-gutter-y-md full-width">
                  <!-- Material Quantity for Rework -->
                  <div>
                    <label
                      >Material Quantity for Rework
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      outlined
                      v-model="material.material_quantity_for_rework"
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

        <div
          class="row justify-between full-height no-wrap q-mt-xl"
          style="gap: 68px"
        >
          <div class="q-gutter-y-md full-width">
            <!-- Performed By -->
            <div>
              <label>Performed By <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="reworkReprocessDetails.performed_by"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- Performed Date and Time -->
            <div>
              <label>
                Performed Date and Time <span class="text-red">*</span>
              </label>
              <q-input
                outlined
                v-model="reworkReprocessDetails.performed_date_and_time"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>

          <div class="q-gutter-y-md full-width">
            <!-- Verified By -->
            <div>
              <label>Verified By <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="reworkReprocessDetails.verified_by"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- Verified Date and Time -->
            <div>
              <label
                >Verified Date and Time <span class="text-red">*</span></label
              >
              <q-input
                outlined
                v-model="reworkReprocessDetails.verified_date_and_time"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
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

    <!-- Action Buttons -->
    <div>
      <q-btn
        :disable="saveReworkReprocessLoading"
        @click="saveReworkReprocess"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      >
        <q-spinner
          v-if="saveReworkReprocessLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Save
      </q-btn>
    </div>

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
          Are you sure you want to delete this material from the
          rework/reprocess?
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
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";
import { useRoute } from "vue-router";

// Variables
const route = useRoute();
const $q = useQuasar();
const loading = ref(false);

const reworkReprocessDetails = ref({
  productionBatchNumber: null,
  sopReference: null,
  materials: [],
  performed_by: null,
  performed_date_and_time: null,
  verified_by: null,
  verified_date_and_time: null,
});

const addMaterialLoading = ref(false);
const materialsDeleteDialog = ref(false);
const deleteMaterialLoading = ref(false);
const selectedMaterial = ref(null);

const saveReworkReprocessLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    reworkReprocessDetails.value.productionBatchNumber = +route.params.id;
    loading.value = false;
  }, 1000);

  addSampleMaterial();
});

// Functions
const addSampleMaterial = () => {
  reworkReprocessDetails.value.materials.push({
    key: Date.now(),
    material_name: null,
    material_quantity_for_reprocessing: null,
    material_quantity_for_rework: null,
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
  selectedMaterial.value = reworkReprocessDetails.value.materials.find(
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
    reworkReprocessDetails.value.materials =
      reworkReprocessDetails.value.materials.filter((v) => v.key !== key);

    closeMaterialsDeleteDialog();
    deleteMaterialLoading.value = false;
  }, 1000);
};

// save the whole process
const saveReworkReprocess = () => {
  saveReworkReprocessLoading.value = true;

  const payload = {
    productionBatchNumber: reworkReprocessDetails.value.productionBatchNumber,
    sopReference: reworkReprocessDetails.value.sopReference,
    materials: reworkReprocessDetails.value.materials,
    performed_by: reworkReprocessDetails.value.performed_by,
    performed_date_and_time:
      reworkReprocessDetails.value.performed_date_and_time,
    verified_by: reworkReprocessDetails.value.verified_by,
    verified_date_and_time: reworkReprocessDetails.value.verified_date_and_time,
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

    saveReworkReprocessLoading.value = false;
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
