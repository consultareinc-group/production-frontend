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
          label: 'View Scrap Material Report Details',
          to: { name: 'view-scrap-material-report-details' },
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
                  scrapMaterialReportDetails.productionDate,
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
              {{ scrapMaterialReportDetails.sopReference }}
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
              :rows="scrapMaterialReportDetails.materials"
              :columns="materialsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
            >
            </q-table>
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

const scrapMaterialReportDetails = ref({
  productionBatchNumber: null,
  productionDate: null,
  sopReference: null,
  materials: [],
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
    name: "uom",
    required: true,
    label: "Unit of Measure",
    align: "left",
    field: (row) => row.uom,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "lot_number",
    required: true,
    label: "Lot Number",
    align: "left",
    field: (row) => row.lot_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_scrapped",
    required: true,
    label: "Quantity Scrapped",
    align: "left",
    field: (row) => row.quantity_scrapped,
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
    scrapMaterialReportDetails.value = {
      productionBatchNumber: "PB-0001",
      productionDate: new Date(),
      sopReference: "SOP-0001",
      materials: [
        {
          id: 1,
          material_name: "Material 1",
          uom: "kg",
          lot_number: "LOT-0001",
          quantity_scrapped: 10,
        },
        {
          id: 2,
          material_name: "Material 2",
          uom: "kg",
          lot_number: "LOT-0002",
          quantity_scrapped: 20,
        },
        {
          id: 3,
          material_name: "Material 3",
          uom: "kg",
          lot_number: "LOT-0003",
          quantity_scrapped: 30,
        },
      ],
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
</style>
