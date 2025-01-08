<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Equipment"
      :items="[
        {
          label: 'Equipment',
          to: { name: 'view-equipments' },
        },
        {
          label: 'View Equipment Details',
          to: { name: 'view-equipment-details' },
        },
      ]"
    />

    <SectionWrapper class="q-mt-lg">
      <template #header>
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
          @update:model-value="openChangeStatusDialog"
        />
      </template>

      <div class="row justify-between q-mt-xl">
        <div class="column q-gutter-y-md full-width" style="max-width: 297px">
          <div>
            <h6 class="q-ma-none text-subtitle1">Equipment ID:</h6>
            <p class="text-subtitle2">EQP-100004</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Equipment Name:</h6>
            <p class="text-subtitle2">Stainless Steel Mixer</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Category:</h6>
            <p class="text-subtitle2">Mixing</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Manufacturer:</h6>
            <p class="text-subtitle2">MixMaster Corp.</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Model Number:</h6>
            <p class="text-subtitle2">MX-2000</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Serial Number:</h6>
            <p class="text-subtitle2">SN123456789</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Purchase Date:</h6>
            <p class="text-subtitle2">September 11, 2024</p>
          </div>
        </div>

        <div class="column q-gutter-y-md full-width" style="max-width: 297px">
          <div>
            <h6 class="q-ma-none text-subtitle1">Purchase Price:</h6>
            <p class="text-subtitle2">$12,500</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Supplier:</h6>
            <p class="text-subtitle2">Industrial Supplies Co.</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Condition:</h6>
            <p class="text-subtitle2">New</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Location:</h6>
            <p class="text-subtitle2">Production Area 2</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Assigned To:</h6>
            <p class="text-subtitle2">Maintenance Team</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Maintenance Schedule:</h6>
            <p class="text-subtitle2">October 11, 2024</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Description:</h6>
            <p class="text-subtitle2">
              High-capacity mixer for blending large batches of ingredients.
            </p>
          </div>
        </div>

        <div class="column q-gutter-y-md full-width" style="max-width: 297px">
          <div>
            <h6 class="q-ma-none text-subtitle1">Calibration Validity:</h6>
            <p class="text-subtitle2">October 11, 2024</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Equipment Image:</h6>
            <q-img
              src="https://placehold.co/600x400@2x.png"
              alt="Equipment Image"
              fit="cover"
              class="q-mt-sm"
              style="width: 212px; height: 196px"
            ></q-img>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Operation Manual:</h6>
            <p class="text-subtitle2">operation_manual.pdf</p>
          </div>
          <div>
            <h6 class="q-ma-none text-subtitle1">Remarks:</h6>
            <p class="text-subtitle2">
              Ensure regular lubrication of moving parts.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h6 class="q-mb-lg">Activity Logs</h6>
        <q-table
          flat
          :rows="activityLogs"
          :columns="activityLogsColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          :loading="tableLoading"
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
          <span class="text-bold">{{ statusValue.label }}</span>
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
            @click="changeStatus(statusValue)"
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
import { date } from "quasar";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";

// Variables
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

const statusValue = ref("Available");
const statusOptions = ref([
  { value: 0, label: "Available" },
  { value: 1, label: "Checked Out" },
  { value: 2, label: "Under Maintenance" },
  { value: 3, label: "Retired" },
]);
const changeStatusDialog = ref(false);
const changeStatusLoading = ref(false);

const activityLogs = ref([]);
const tableLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;
  setTimeout(() => {
    activityLogs.value = [
      {
        id: 1,
        action: "Sample Action",
        personnel: "Sample Personnel",
        date_and_time: new Date(),
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const openChangeStatusDialog = () => {
  changeStatusDialog.value = true;
};

const closeChangeStatusDialog = () => {
  changeStatusDialog.value = false;
};

const changeStatus = (status) => {
  changeStatusLoading.value = true;
  setTimeout(() => {
    changeStatusLoading.value = false;
    closeChangeStatusDialog();
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
