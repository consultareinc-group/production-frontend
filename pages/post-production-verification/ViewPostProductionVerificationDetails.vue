<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Post Production Verification"
      :items="[
        {
          label: 'Post Production Verification',
          to: { name: 'view-post-production-verification' },
        },
        {
          label: 'View Post Production Verification Details',
          to: { name: 'view-post-production-verification-details' },
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
        </div>
      </template>

      <template #default>
        <div class="relative-position">
          <!-- Material Details -->
          <div class="q-mt-lg">
            <q-table
              flat
              :rows="postProductionVerificationDetails.inspections"
              :columns="inspectionsColumns"
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

const postProductionVerificationDetails = ref({
  productionBatchNumber: null,
  inspections: [],
});

const inspectionsColumns = ref([
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

const loading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    postProductionVerificationDetails.value = {
      productionBatchNumber: "PB-0001",
      inspections: [
        {
          id: 1,
          inspection: "Inspection 1",
          status: "Pending",
          sop_reference: "SOP-0001",
          performed_by: "John Doe",
          performed_date_and_time: new Date(),
          verified_by: "Jane Doe",
        },
        {
          id: 2,
          inspection: "Inspection 2",
          status: "Pending",
          sop_reference: "SOP-0002",
          performed_by: "John Doe",
          performed_date_and_time: new Date(),
          verified_by: "Jane Doe",
        },
        {
          id: 3,
          inspection: "Inspection 3",
          status: "Pending",
          sop_reference: "SOP-0003",
          performed_by: "John Doe",
          performed_date_and_time: new Date(),
          verified_by: "Jane Doe",
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
