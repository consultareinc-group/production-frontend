<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Compounding/Mixing"
      :items="[
        {
          label: 'Compounding/Mixing',
          to: { name: 'view-compounds-mixes' },
        },
        {
          label: 'View Compounds/Mixes',
          to: { name: 'view-compound-mix-details' },
        },
      ]"
    />

    <SectionWrapper class="q-mt-lg">
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
            <span>January 1, 2025</span>
          </div>
          <div>
            <h6 class="q-ma-none">SOP reference:</h6>
            <span
              class="text-primary cursor-pointer"
              style="text-decoration: underline"
            >
              sopreference.pdf
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
            <q-select
              outlined
              dense
              v-model="statusValue"
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

      <div class="q-mt-lg">
        <h6 class="q-ma-none">Materials</h6>
        <q-table
          flat
          :rows="compoundMixMaterials"
          :columns="materialsColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto q-mt-md"
          :loading="materialsTableLoading"
        >
        </q-table>
      </div>

      <div class="q-mt-xl">
        <h6 class="q-ma-none">Activity Logs</h6>
        <q-table
          flat
          :rows="compoundMixActivityLogs"
          :columns="activityLogsColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto q-mt-md"
          style="max-width: 479px"
          :loading="activityLogsTableLoading"
        >
        </q-table>
      </div>
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

// Variables
const route = useRoute();

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
    name: "instructions",
    required: true,
    label: "Instructions",
    align: "left",
    field: (row) => row.instructions,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "actual_amount",
    required: true,
    label: "Actual Amount",
    align: "left",
    field: (row) => row.actual_amount,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "start_date_and_time_of_mixing",
    required: true,
    label: "Start Date & Time of Mixing",
    align: "left",
    field: (row) =>
      date.formatDate(row.start_date_and_time_of_mixing, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "end_date_and_time_of_mixing",
    required: true,
    label: "End Date & Time of Mixing",
    align: "left",
    field: (row) =>
      date.formatDate(row.end_date_and_time_of_mixing, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "standard_duration",
    required: true,
    label: "Standard Duration",
    align: "left",
    field: (row) => row.standard_duration,
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

const statusValue = ref({});
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

const compoundMixMaterials = ref([]);
const materialsTableLoading = ref(false);

const compoundMixActivityLogs = ref([]);
const activityLogsTableLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  statusValue.value = statusOptions.value[0];
  fetchSampleData();
});

const fetchSampleData = () => {
  materialsTableLoading.value = true;
  activityLogsTableLoading.value = true;

  setTimeout(() => {
    compoundMixMaterials.value = [
      {
        id: 1,
        material_name: "Material 1",
        instructions: "Instructions 1",
        actual_amount: "100",
        start_date_and_time_of_mixing: "2025-01-01T08:00:00",
        end_date_and_time_of_mixing: "2025-01-01T09:00:00",
        standard_duration: "1 hour",
      },
      {
        id: 2,
        material_name: "Material 2",
        instructions: "Instructions 2",
        actual_amount: "200",
        start_date_and_time_of_mixing: "2025-01-01T09:00:00",
        end_date_and_time_of_mixing: "2025-01-01T10:00:00",
        standard_duration: "1 hour",
      },
      {
        id: 3,
        material_name: "Material 3",
        instructions: "Instructions 3",
        actual_amount: "300",
        start_date_and_time_of_mixing: "2025-01-01T10:00:00",
        end_date_and_time_of_mixing: "2025-01-01T11:00:00",
        standard_duration: "1 hour",
      },
    ];

    compoundMixActivityLogs.value = [
      {
        id: 1,
        action: "Action 1",
        personnel: "Personnel 1",
        date_and_time: "2025-01-01T08:00:00",
      },
      {
        id: 2,
        action: "Action 2",
        personnel: "Personnel 2",
        date_and_time: "2025-01-01T09:00:00",
      },
      {
        id: 3,
        action: "Action 3",
        personnel: "Personnel 3",
        date_and_time: "2025-01-01T10:00:00",
      },
    ];

    materialsTableLoading.value = false;
    activityLogsTableLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
