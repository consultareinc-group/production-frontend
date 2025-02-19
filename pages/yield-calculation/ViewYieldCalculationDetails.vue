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
          label: 'View Yield Calculation Details',
          to: { name: 'view-yield-calculation-details' },
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
                  yieldCalculationDetails.productionDate,
                  "MMMM D, YYYY"
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
              {{ yieldCalculationDetails.sopReference }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
            <q-select
              outlined
              dense
              v-model="yieldCalculationDetails.status"
              :options="statusOptions"
              :option-value="statusOptions.value"
              :option-label="statusOptions.label"
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
              style="width: 200px"
            />
          </div>
        </div>
      </template>

      <template #default>
        <div class="relative-position">
          <!-- Material Details -->
          <div class="q-mt-lg">
            <q-table
              flat
              :rows="yieldCalculationDetails.materials"
              :columns="materialDetailsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
            >
            </q-table>
          </div>

          <!-- Activity Logs -->
          <div class="q-mt-lg">
            <h6 class="q-ma-none">Activity Logs</h6>
            <q-table
              flat
              :rows="yieldCalculationDetails.activity_logs"
              :columns="activityLogsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
              style="max-width: 460px"
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
import { date } from "quasar";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const route = useRoute();

const yieldCalculationDetails = ref({
  productionBatchNumber: null,
  productionDate: null,
  sopReference: null,
  status: null,
  materials: [],
  activity_logs: [],
});

const materialDetailsColumns = ref([
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
    name: "planned_quantity",
    required: true,
    label: "Planned Quantity",
    align: "left",
    field: (row) => row.planned_quantity,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_of_material_in_finished_products",
    required: true,
    label: "Quantity of Material in Finished Products",
    align: "left",
    field: (row) => row.quantity_of_material_in_finished_products,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "process_loss_percentage",
    required: true,
    label: "Process Loss Percentage",
    align: "left",
    field: (row) => row.process_loss_percentage,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "yield_percentage",
    required: true,
    label: "Yield Percentage",
    align: "left",
    field: (row) => row.yield_percentage,
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);

const activityLogsColumns = ref([
  {
    name: "action",
    required: true,
    label: "Action",
    align: "left",
    field: (row) => row.action,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "personnel",
    required: true,
    label: "Personnel",
    align: "left",
    field: (row) => row.personnel,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date_and_time",
    required: true,
    label: "Date & Time",
    align: "left",
    field: (row) => date.formatDate(row.date_and_time, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },

  // Add more columns as needed
]);

const loading = ref(false);

const statusOptions = ref([
  { label: "Pending", value: 0 },
  { label: "Verified", value: 1 },
  { label: "In Progress", value: 2 },
  { label: "On Hold", value: 3 },
  { label: "Completed", value: 4 },
  { label: "Closed", value: 5 },
  { label: "Canceled", value: 6 },
  { label: "Delayed", value: 7 },
]);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    yieldCalculationDetails.value = {
      productionBatchNumber: "123",
      productionDate: new Date(),
      sopReference: "sopreference.pdf",
      status: "Pending",
      materials: [
        {
          id: 1,
          material_name: "Material 1",
          planned_quantity: 100,
          quantity_of_material_in_finished_products: 90,
          process_loss_percentage: 10,
          yield_percentage: 90,
        },
        {
          id: 2,
          material_name: "Material 2",
          planned_quantity: 200,
          quantity_of_material_in_finished_products: 180,
          process_loss_percentage: 20,
          yield_percentage: 90,
        },
        {
          id: 3,
          material_name: "Material 3",
          planned_quantity: 300,
          quantity_of_material_in_finished_products: 270,
          process_loss_percentage: 30,
          yield_percentage: 90,
        },
      ],
      activity_logs: [
        {
          id: 1,
          action: "Action 1",
          personnel: "Personnel 1",
          date_and_time: new Date(),
        },
        {
          id: 2,
          action: "Action 2",
          personnel: "Personnel 2",
          date_and_time: new Date(),
        },
        {
          id: 3,
          action: "Action 3",
          personnel: "Personnel 3",
          date_and_time: new Date(),
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
