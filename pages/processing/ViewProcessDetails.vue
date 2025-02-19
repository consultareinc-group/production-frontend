<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Processing"
      :items="[
        {
          label: 'Processing',
          to: { name: 'view-processes' },
        },
        {
          label: 'View Process Details',
          to: { name: 'view-process-details' },
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

      <template #default>
        <div
          v-for="(process, index) in processDetails"
          :key="process.id"
          style="border: 1px solid #c6c6c6"
          class="relative-position q-mt-xl q-pa-xl"
        >
          <h6 class="absolute-top-left q-ma-none q-pl-md q-pt-md">
            {{ index + 1 }}.
          </h6>
          <div class="q-mt-lg">
            <q-table
              flat
              :rows="process.process"
              :columns="processColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
            >
            </q-table>
          </div>

          <div class="q-mt-lg">
            <h6 class="q-ma-none">Equipment Details</h6>
            <q-table
              flat
              :rows="process.equipments"
              :columns="equipmentDetailsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
            >
            </q-table>
          </div>

          <div class="q-mt-lg">
            <h6 class="q-ma-none">Materials</h6>
            <q-table
              flat
              :rows="process.materials"
              :columns="materialDetailsColumns"
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
import { date } from "quasar";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const route = useRoute();

const processDetails = ref([]);

const processColumns = ref([
  {
    name: "process_name",
    required: true,
    label: "Process Name",
    align: "left",
    field: (row) => row.process_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "process_steps",
    required: true,
    label: "Process Steps",
    align: "left",
    field: (row) => row.process_steps,
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
  {
    name: "start_date_and_time_of_processing",
    required: true,
    label: "Start Date & Time of Processing",
    align: "left",
    field: (row) =>
      date.formatDate(
        row.start_date_and_time_of_processing,
        "MMMM D, YYYY h:mm A"
      ),
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);

const equipmentDetailsColumns = ref([
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

const loading = ref(false);

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

// Lifecycle Hooks
onMounted(() => {
  statusValue.value = statusOptions.value[0];
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    processDetails.value = [
      {
        process: [
          {
            id: 1,
            process_name: "Process 1",
            process_steps: "Step 1, Step 2, Step 3",
            standard_duration: "2 hours",
            start_date_and_time_of_processing: new Date(),
          },
          {
            id: 2,
            process_name: "Process 2",
            process_steps: "Step 1, Step 2, Step 3",
            standard_duration: "3 hours",
            start_date_and_time_of_processing: new Date(),
          },
        ],
        equipments: [
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
        ],
        materials: [
          {
            id: 1,
            material_name: "Material 1",
            instructions: "Instruction 1",
            actual_amount: "100 ml",
            start_date_and_time_of_mixing: new Date(),
            end_date_and_time_of_mixing: new Date(),
            standard_duration: "1 hour",
          },
          {
            id: 2,
            material_name: "Material 2",
            instructions: "Instruction 2",
            actual_amount: "200 ml",
            start_date_and_time_of_mixing: new Date(),
            end_date_and_time_of_mixing: new Date(),
            standard_duration: "2 hours",
          },
        ],
      },
      {
        process: [
          {
            id: 1,
            process_name: "Process 1",
            process_steps: "Step 1, Step 2, Step 3",
            standard_duration: "2 hours",
            start_date_and_time_of_processing: new Date(),
          },
          {
            id: 2,
            process_name: "Process 2",
            process_steps: "Step 1, Step 2, Step 3",
            standard_duration: "3 hours",
            start_date_and_time_of_processing: new Date(),
          },
        ],
        equipments: [
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
        ],
        materials: [
          {
            id: 1,
            material_name: "Material 1",
            instructions: "Instruction 1",
            actual_amount: "100 ml",
            start_date_and_time_of_mixing: new Date(),
            end_date_and_time_of_mixing: new Date(),
            standard_duration: "1 hour",
          },
          {
            id: 2,
            material_name: "Material 2",
            instructions: "Instruction 2",
            actual_amount: "200 ml",
            start_date_and_time_of_mixing: new Date(),
            end_date_and_time_of_mixing: new Date(),
            standard_duration: "2 hours",
          },
        ],
      },
    ];

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
