<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Pre-Operations Verification"
      :items="[
        {
          label: 'Pre-Operations Verification',
        },
        {
          label: 'View Pre-Operations Verification Details',
          to: { name: 'view-pre-operation-verification-details' },
        },
      ]"
    />

    <SectionWrapper class="q-mt-lg">
      <template #header>
        <h6 class="q-ma-none">Production Batch Number:</h6>
        <!-- <span v-if="preOperationVerificationsDetails.batch_number">{{
          preOperationVerificationsDetails.batch_number
        }}</span> -->
      </template>

      <q-table
        flat
        :rows="inspections"
        :columns="columns"
        row-key="id"
        table-header-class="bg-dark text-white"
        class="overflow-auto q-mt-xl"
        :loading="tableLoading"
      >
      </q-table>
    </SectionWrapper>
  </MainContentWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date, useQuasar } from "quasar";
import { usePreOperationsVerificationStore } from "../../stores/pre-operations-verification-store";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";

// Variables
const route = useRoute();
const preOperationsVerificationStore = usePreOperationsVerificationStore();
const $q = useQuasar();

const columns = ref([
  {
    name: "inspection",
    required: true,
    label: "Inspection",
    align: "left",
    field: (row) => row.inspection,
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
  {
    name: "sop_reference",
    required: true,
    label: "SOP Reference",
    align: "left",
    field: (row) => row.sop_reference,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "performed_by",
    required: true,
    label: "Performed By",
    align: "left",
    field: (row) => row.performed_by,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "performed_date_and_time",
    required: true,
    label: "Performed Date & Time",
    align: "left",
    field: (row) =>
      date.formatDate(row.performed_date_and_time, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "verified_by",
    required: true,
    label: "Verified By",
    align: "left",
    field: (row) => row.verified_by,
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);

const preOperationVerificationsDetails = ref();
const inspections = ref([]);
const tableLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  getPreOperationsVerification();
});

const getPreOperationsVerification = () => {
  tableLoading.value = true;

  preOperationsVerificationStore
    .GetPreOperationVerification(route.params.id)
    .then((response) => {
      response.data.preoperation_verifications_inspections.forEach(
        (inspection) => {
          inspection.status =
            inspection.status === 1 ? "Compliant" : "Non Compliant";
        }
      );

      preOperationVerificationsDetails.value = response.data;
      inspections.value = response.data.preoperation_verifications_inspections;
    })
    .catch((error) => {
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Pre-Operations Verification not found.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-error",
      });
    })
    .finally(() => {
      tableLoading.value = false;
    });
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
