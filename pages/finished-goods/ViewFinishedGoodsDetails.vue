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
          label: 'View Finished Goods Details',
          to: { name: 'view-finished-goods-details' },
        },
      ]"
    />

    <SectionWrapperLoader v-if="loading" />
    <SectionWrapper v-else class="q-mt-lg">
      <template #header>
        <div class="row q-gutter-x-lg text-subtitle1">
          <div>
            <h6 class="q-ma-none">Production Batch Number:</h6>
            <span
              class="text-primary cursor-pointer q-pb-xs"
              style="text-decoration: underline"
            >
              {{ finishedGoodsDetails.batch_number }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Production Date:</h6>
            <span>
              {{ finishedGoodsDetails.production_date }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">SOP reference:</h6>
            <span
              class="text-primary cursor-pointer"
              style="text-decoration: underline"
            >
              {{ finishedGoodsDetails.sop_reference }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
            <q-select
              outlined
              dense
              v-model="finishedGoodsDetails.status"
              :options="statusOptions"
              :option-value="statusOptions.value"
              :option-label="statusOptions.label"
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
              style="width: 200px"
              @update:model-value="openChangeStatusDialog"
            />
          </div>
        </div>
      </template>

      <div class="row q-mt-xl" style="gap: 50px">
        <!-- 1st column -->
        <div class="column q-gutter-y-md full-width" style="max-width: 229px">
          <!-- Product Name -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Product Name:</h6>
            <p class="text-subtitle2">Product B</p>
          </div>
          <!-- Quantity -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Quantity:</h6>
            <p class="text-subtitle2">900</p>
          </div>
          <!-- Unit of Measure -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Unit of Measure:</h6>
            <p class="text-subtitle2">Kilogram</p>
          </div>
          <!-- Packaging Type -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Packaging Type:</h6>
            <p class="text-subtitle2">Bags</p>
          </div>
        </div>

        <!-- 2nd column -->
        <div class="column q-gutter-y-md full-width" style="max-width: 229px">
          <!-- Storage Location -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Storage Location:</h6>
            <p class="text-subtitle2">Location B</p>
          </div>
          <!-- Best Before Date -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Best Before Date:</h6>
            <p class="text-subtitle2">August 13, 2026 8:00 AM</p>
          </div>
          <!-- Storage Condition -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Storage Condition:</h6>
            <p class="text-subtitle2">Room Temperature</p>
          </div>
          <!-- Remarks -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Remarks:</h6>
            <p class="text-subtitle2"></p>
          </div>
        </div>
      </div>

      <div class="q-mt-xl" style="gap: 50px">
        <h6 class="q-ma-none q-mb-md">Quality Control Inspection</h6>
        <div class="column q-gutter-y-md full-width" style="max-width: 229px">
          <!-- Inspection Date -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Inspection Date:</h6>
            <p class="text-subtitle2">September 10, 2024 9:00 AM</p>
          </div>
          <!-- Inspector Name -->
          <div>
            <h6 class="q-ma-none text-subtitle1">Inspector Name:</h6>
            <p class="text-subtitle2">James William</p>
          </div>
        </div>
      </div>

      <div class="q-mt-xl">
        <q-table
          flat
          :rows="finishedGoodsDetails.criterias"
          :columns="criteriaColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div v-if="props.row.status === 'Fail'" class="table-menu">
                <q-btn dense icon="more_vert" flat round>
                  <q-menu style="width: 100px">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="openFailDialog(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>

      <div>
        <h6 class="q-mb-lg">Activity Logs</h6>
        <q-table
          flat
          :rows="finishedGoodsDetails.activity_logs"
          :columns="activityLogsColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          style="max-width: 460px"
        >
        </q-table>
      </div>
    </SectionWrapper>

    <q-dialog v-model="changeStatusDialog" persistent>
      <q-card>
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeChangeStatusDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="archive" color="orange-10" size="lg" />
          <div class="text-h6 text-weight-bold">Status Change</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to change the status?
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <span class="text-bold">{{ finishedGoodsDetails.status.label }}</span>
        </q-card-section>

        <q-card-section class="flex justify-center q-my-lg">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="border-000000-all q-px-lg"
            @click="closeChangeStatusDialog"
          />
          <div class="q-mx-md"></div>
          <q-btn
            flat
            no-caps
            class="bg-accent text-white q-px-lg"
            @click="changeStatus(finishedGoodsDetails.status.label)"
            :disable="changeStatusLoading"
          >
            <q-spinner v-if="changeStatusLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="failStatusDialog">
      <q-card class="q-pa-lg">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeFailStatusDialog"
        />
        <q-card-section>
          <h6 class="text-subtitle2 text-bold">Mode of Failure/Reject</h6>
          <p class="q-ma-none">Total Quantity Rejected:</p>
          <span>5</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-table
            flat
            :rows="defectsRows"
            :columns="defectsColumns"
            row-key="id"
            table-header-class="bg-dark text-white"
            class="overflow-auto"
            style="max-width: 460px"
          >
            <template v-slot:body-cell-defects="props">
              <q-td :props="props" style="min-width: 300px">
                {{ props.row.defects }}
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </MainContentWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date, useQuasar } from "quasar";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const loading = ref(false);

const finishedGoodsDetails = ref({
  batch_number: null,
  production_date: null,
  sop_reference: null,
  status: null,
  criterias: [],
  activity_logs: [],
});

const criteriaColumns = ref([
  {
    name: "criteria",
    required: true,
    label: "Criteria",
    align: "left",
    field: (row) => row.criteria,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "standard",
    required: true,
    label: "Standard",
    align: "left",
    field: (row) => row.standard,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "evaluation_result",
    required: true,
    label: "Evaluation Result",
    align: "left",
    field: (row) => row.evaluation_result,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: (row) => row.status,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
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

const changeStatusDialog = ref(false);
const changeStatusLoading = ref(false);

const defectsColumns = ref([
  {
    name: "id",
    required: true,
    label: "No.",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "defects",
    required: true,
    label: "Defects",
    align: "left",
    field: (row) => row.defects,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: (row) => row.quantity,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

const defectsRows = ref([
  { id: 1, defects: "Substandard Size", quantity: 2 },
  { id: 2, defects: "Physical Contamination", quantity: 3 },
]);

const failStatusDialog = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  loading.value = true;
  setTimeout(() => {
    finishedGoodsDetails.value = {
      batch_number: "BATCH-001",
      production_date: "September 10, 2024 9:00 AM",
      sop_reference: "SOP-001",
      status: { label: "Pending", value: 0 },
      criterias: [
        {
          id: 1,
          criteria: "Packaging Integrity",
          standard: "No leaks, properly sealed",
          evaluation_result: "All bags are sealed",
          status: "Pass",
        },
        {
          id: 2,
          criteria: "Labeling",
          standard: "Clear, legible, accurate",
          evaluation_result: "Incorrect labels",
          status: "Fail",
        },
      ],
      activity_logs: [
        {
          id: 1,
          action: "Action A",
          personnel: "Personnel A",
          date_and_time: "September 10, 2024 9:00 AM",
        },
        {
          id: 2,
          action: "Action B",
          personnel: "Personnel B",
          date_and_time: "September 10, 2024 9:00 AM",
        },
        {
          id: 3,
          action: "Action C",
          personnel: "Personnel C",
          date_and_time: "September 10, 2024 9:00 AM",
        },
      ],
    };

    loading.value = false;
  }, 1000);
};

const openChangeStatusDialog = () => {
  changeStatusDialog.value = true;
};

const closeChangeStatusDialog = () => {
  changeStatusDialog.value = false;

  finishedGoodsDetails.value.status = getPreviousStatusValue(
    finishedGoodsDetails.value.status
  );
};

const getPreviousStatusValue = (status) => {
  switch (status) {
    case "Pending":
      return { label: "Pending", value: 0 };
    case "Verified":
      return { label: "Verified", value: 1 };
    case "In Progress":
      return { label: "In Progress", value: 2 };
    case "On Hold":
      return { label: "On Hold", value: 3 };
    case "Completed":
      return { label: "Completed", value: 4 };
    case "Closed":
      return { label: "Closed", value: 5 };
    case "Cancelled":
      return { label: "Cancelled", value: 6 };
    case "Delayed":
      return { label: "Delayed", value: 7 };
    default:
      return { label: "Pending", value: 0 };
  }
};

const changeStatus = (status) => {
  changeStatusLoading.value = true;
  setTimeout(() => {
    finishedGoodsDetails.value.status = status;
    changeStatusLoading.value = false;
    changeStatusDialog.value = false;

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> The status has been updated.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });
  }, 1000);
};

const openFailDialog = (id) => {
  failStatusDialog.value = true;
};

const closeFailStatusDialog = () => {
  failStatusDialog.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
