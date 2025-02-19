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
          label: 'View Rework/Reprocess Details',
          to: { name: 'view-rework-reprocess-details' },
        },
      ]"
    />

    <SectionWrapperLoader v-if="loading" hasHeader />
    <SectionWrapper v-else class="q-mt-lg">
      <template #header>
        <div class="row q-gutter-x-lg text-subtitle1">
          <div>
            <h6 class="q-ma-none">Production Batch Number:</h6>
            <span
              class="text-primary cursor-pointer q-pb-xs"
              style="text-decoration: underline"
            >
              {{ route.params.id }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Production Date:</h6>
            <span>
              {{
                date.formatDate(
                  reworkReprocessDetails.productionDate,
                  "MMMM D, YYYY h:mm A"
                )
              }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">SOP reference:</h6>
            <span
              class="text-primary cursor-pointer"
              style="text-decoration: underline"
            >
              {{ reworkReprocessDetails.sopReference }}
            </span>
          </div>
        </div>
      </template>

      <template #default>
        <div class="relative-position">
          <!-- Material Details -->
          <div class="q-mt-lg">
            <q-table
              flat
              :rows="reworkReprocessDetails.materials"
              :columns="materialsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
            >
            </q-table>
          </div>
        </div>

        <div class="q-mt-xl">
          <div class="row">
            <div class="perform-verify col q-mr-lg">
              <h6 class="q-ma-none text-subtitle1">Performed By:</h6>
              <span>{{ reworkReprocessDetails.performed_by }}</span>
            </div>
            <div>
              <h6 class="q-ma-none text-subtitle1">Performed Date and Time:</h6>
              <span>
                {{
                  date.formatDate(
                    reworkReprocessDetails.performed_date_and_time,
                    "MMMM D, YYYY h:mm A"
                  )
                }}
              </span>
            </div>
          </div>

          <div class="row q-mt-lg">
            <div class="perform-verify col q-mr-lg">
              <h6 class="q-ma-none text-subtitle1">Verified By:</h6>
              <span>{{ reworkReprocessDetails.verified_by }}</span>
            </div>
            <div>
              <h6 class="q-ma-none text-subtitle1">Verified Date and Time:</h6>
              <span>
                {{
                  date.formatDate(
                    reworkReprocessDetails.verified_date_and_time,
                    "MMMM D, YYYY h:mm A"
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>
  </MainContentWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date, useQuasar } from "quasar";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const route = useRoute();
const $q = useQuasar();

const reworkReprocessDetails = ref({
  productionBatchNumber: null,
  productionDate: null,
  sopReference: null,
  materials: [],
  performed_by: null,
  performed_date_and_time: null,
  verified_by: null,
  verified_date_and_time: null,
});

const materialsColumns = ref([
  {
    name: "material_name",
    required: true,
    label: "Material Name",
    align: "left",
    field: (row) => row.material_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "material_quantity_for_reprocessing",
    required: true,
    label: "Material Quantity for Reprocessing",
    align: "left",
    field: (row) => row.material_quantity_for_reprocessing,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "material_quantity_for_rework",
    required: true,
    label: "Material Quantity for Rework",
    align: "left",
    field: (row) => row.material_quantity_for_rework,
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);

const loading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    reworkReprocessDetails.value = {
      productionBatchNumber: "PB-0001",
      productionDate: new Date(),
      sopReference: "SOP-0001",
      materials: [
        {
          id: 1,
          material_name: "Material 1",
          material_quantity_for_reprocessing: 10,
          material_quantity_for_rework: 5,
        },
        {
          id: 2,
          material_name: "Material 2",
          material_quantity_for_reprocessing: 15,
          material_quantity_for_rework: 10,
        },
        {
          id: 3,
          material_name: "Material 3",
          material_quantity_for_reprocessing: 20,
          material_quantity_for_rework: 15,
        },
      ],
      performed_by: "John Doe",
      performed_date_and_time: new Date(),
      verified_by: "Jane Doe",
      verified_date_and_time: new Date(),
    };

    loading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}

.perform-verify {
  min-width: 150px;
  max-width: 300px;
  width: 100%;
  word-wrap: break-word;
}
</style>
