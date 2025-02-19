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
        <span>{{ route.params.id }}</span>
      </template>

      <q-table
        flat
        :rows="preOperationVerificationsDetails"
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
import { date } from "quasar";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";

// Variables
const route = useRoute();

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

const preOperationVerificationsDetails = ref([]);
const tableLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    preOperationVerificationsDetails.value = [
      {
        inspection: "Inspection 1",
        status: "Passed",
        sop_reference: "SOP-001",
        performed_by: "John Doe",
        performed_date_and_time: "2021-10-01 08:00:00",
        verified_by: "Jane Doe",
      },
      {
        inspection: "Inspection 2",
        status: "Failed",
        sop_reference: "SOP-002",
        performed_by: "John Doe",
        performed_date_and_time: "2021-10-01 08:00:00",
        verified_by: "Jane Doe",
      },
      {
        inspection: "Inspection 3",
        status: "Passed",
        sop_reference: "SOP-003",
        performed_by: "John Doe",
        performed_date_and_time: "2021-10-01 08:00:00",
        verified_by: "Jane Doe",
      },
    ];
    tableLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
