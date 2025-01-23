<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Packaging Material Trace"
      :items="[
        {
          label: 'Packaging Material Trace',
          to: { name: 'view-packaging-material-traces' },
        },
        {
          label: 'View Packaging Material Traces Details',
          to: { name: 'view-packaging-material-traces-details' },
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
                  packagingMaterialTracesDetails.productionDate,
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
              {{ packagingMaterialTracesDetails.sopReference }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
            <q-select
              outlined
              dense
              v-model="packagingMaterialTracesDetails.status"
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

      <template #default>
        <div class="relative-position">
          <!-- Material Details -->
          <div class="q-mt-lg">
            <q-table
              flat
              :rows="packagingMaterialTracesDetails.materials"
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
              :rows="packagingMaterialTracesDetails.activity_logs"
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
          <span class="text-bold">{{
            packagingMaterialTracesDetails.status.label
          }}</span>
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
            @click="changeStatus(packagingMaterialTracesDetails.status.label)"
            :disable="changeStatusLoading"
          >
            <q-spinner v-if="changeStatusLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
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

const packagingMaterialTracesDetails = ref({
  productionBatchNumber: null,
  productionDate: null,
  sopReference: null,
  status: null,
  materials: [],
  activity_logs: [],
});

const materialDetailsColumns = ref([
  {
    name: "packaging_material_name",
    required: true,
    label: "Packaging Material Name",
    align: "left",
    field: (row) => row.packaging_material_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_issued",
    required: true,
    label: "Quantity Issued",
    align: "left",
    field: (row) => row.quantity_issued,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_used",
    required: true,
    label: "Quantity Used",
    align: "left",
    field: (row) => row.quantity_used,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_rejected",
    required: true,
    label: "Quantity Rejected",
    align: "left",
    field: (row) => row.quantity_rejected,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "remaining_quantity",
    required: true,
    label: "Remaining Quantity",
    align: "left",
    field: (row) => row.remaining_quantity,
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

const changeStatusDialog = ref(false);
const changeStatusLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    packagingMaterialTracesDetails.value = {
      productionBatchNumber: "PBN-0001",
      productionDate: "2022-01-01",
      sopReference: "SOP-0001",
      status: "Pending",
      materials: [
        {
          id: 1,
          packaging_material_name: "Packaging Material 1",
          quantity_issued: 100,
          quantity_used: 50,
          quantity_rejected: 10,
          remaining_quantity: 40,
          uom: "kg",
        },
        {
          id: 2,
          packaging_material_name: "Packaging Material 2",
          quantity_issued: 200,
          quantity_used: 100,
          quantity_rejected: 20,
          remaining_quantity: 80,
          uom: "kg",
        },
      ],
      activity_logs: [
        {
          id: 1,
          action: "Issued",
          personnel: "John Doe",
          date_and_time: "2022-01-01 08:00:00",
        },
        {
          id: 2,
          action: "Used",
          personnel: "Jane Doe",
          date_and_time: "2022-01-01 09:00:00",
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

  packagingMaterialTracesDetails.value.status = getPreviousStatusValue(
    packagingMaterialTracesDetails.value.status
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
    packagingMaterialTracesDetails.value.status = status;
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
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
