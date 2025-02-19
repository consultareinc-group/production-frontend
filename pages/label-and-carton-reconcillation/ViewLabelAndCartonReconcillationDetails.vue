<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Label & Carton Reconciliation"
      :items="[
        {
          label: 'Label & Carton Reconciliation',
          to: { name: 'view-label-and-carton-reconcillation' },
        },
        {
          label: 'View Label & Carton Reconciliation Details',
          to: { name: 'view-label-and-carton-reconcillation-details' },
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
              {{ labelAndCartonReconcillationDetails.batch_number }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Production Date:</h6>
            <span>
              {{ labelAndCartonReconcillationDetails.production_date }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Date & Time:</h6>
            <span>
              {{
                date.formatDate(
                  labelAndCartonReconcillationDetails.date_and_time,
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
              {{ labelAndCartonReconcillationDetails.sop_reference }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
            <q-select
              outlined
              dense
              v-model="labelAndCartonReconcillationDetails.status"
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

      <div
        class="row q-mt-xl q-pa-xl"
        style="gap: 140px; border: 1px solid #c6c6c6"
      >
        <!-- 1st column -->
        <div class="column q-gutter-y-md full-width" style="max-width: 297px">
          <h6 class="q-ma-none text-weight-bold">Label</h6>
          <div>
            <h6 class="q-ma-none text-subtitle1">Issued:</h6>
            <p class="text-subtitle2">1000</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Consumed:</h6>
            <p class="text-subtitle2">900</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Scrapped:</h6>
            <p class="text-subtitle2">50</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Returned:</h6>
            <p class="text-subtitle2">50</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Revision:</h6>
            <p class="text-subtitle2">0</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Count:</h6>
            <p class="text-subtitle2">1000</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Percentage:</h6>
            <p class="text-subtitle2">90</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Lot:</h6>
            <p class="text-subtitle2">ABC123</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Counted By:</h6>
            <p class="text-subtitle2">James Thompson</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Date & Time:</h6>
            <p class="text-subtitle2">September 10, 2024 9:00 AM</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Remarks:</h6>
            <p class="text-subtitle2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Distinctio maiores consectetur consequatur voluptas quod
              voluptatum, itaque similique molestias iure maxime?
            </p>
          </div>
        </div>

        <!-- 2nd column -->
        <div class="column q-gutter-y-md full-width" style="max-width: 297px">
          <h6 class="q-ma-none text-weight-bold">Packaging</h6>
          <div>
            <h6 class="q-ma-none text-subtitle1">Packaging Type:</h6>
            <p class="text-subtitle2">Cartons</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Issued:</h6>
            <p class="text-subtitle2">10000</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Unit of Measure:</h6>
            <p class="text-subtitle2">Piece (pc)</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Consumed:</h6>
            <p class="text-subtitle2">900</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Scrapped:</h6>
            <p class="text-subtitle2">50</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Returned:</h6>
            <p class="text-subtitle2">50</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Revision:</h6>
            <p class="text-subtitle2">Carton Revision</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Count:</h6>
            <p class="text-subtitle2">1000</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Percentage:</h6>
            <p class="text-subtitle2">90</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Lot:</h6>
            <p class="text-subtitle2">DEF123</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Counted By:</h6>
            <p class="text-subtitle2">Michael Anderson</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Date & Time:</h6>
            <p class="text-subtitle2">September 10, 2024 9:00 AM</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Remarks:</h6>
            <p class="text-subtitle2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              temporibus beatae deleniti hic molestias ducimus suscipit
              consequatur ab. Officia, debitis!
            </p>
          </div>
        </div>
      </div>

      <div>
        <h6 class="q-mb-lg">Activity Logs</h6>
        <q-table
          flat
          :rows="labelAndCartonReconcillationDetails.activity_logs"
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
          <span class="text-bold">{{
            labelAndCartonReconcillationDetails.status.label
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
            @click="
              changeStatus(labelAndCartonReconcillationDetails.status.label)
            "
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

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const loading = ref(false);

const labelAndCartonReconcillationDetails = ref({
  batch_number: null,
  production_date: null,
  date_and_time: null,
  sop_reference: null,
  status: null,
  activity_logs: [],
});

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

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  loading.value = true;
  setTimeout(() => {
    labelAndCartonReconcillationDetails.value = {
      batch_number: "BATCH-001",
      production_date: "September 10, 2024",
      date_and_time: new Date(),
      sop_reference: "sopreference.pdf",
      status: "Pending",
      activity_logs: [
        {
          id: 1,
          action: "Created",
          personnel: "John Doe",
          date_and_time: new Date(),
        },
        {
          id: 2,
          action: "Updated",
          personnel: "Jane Doe",
          date_and_time: new Date(),
        },
        {
          id: 3,
          action: "Deleted",
          personnel: "John Doe",
          date_and_time: new Date(),
        },
        // Add more data as needed
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

  labelAndCartonReconcillationDetails.value.status = getPreviousStatusValue(
    labelAndCartonReconcillationDetails.value.status
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
    labelAndCartonReconcillationDetails.value.status = status;
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
