<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Pre-Operations Verification"
      :items="[
        {
          label: 'Pre-Operations Verification',
        },
        {
          label: 'View Pre-Operations Verification',
          to: { name: 'view-pre-operations-verification' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn
        :to="{ name: 'add-pre-operations-verification' }"
        label="Add New"
        no-caps
        flat
        class="bg-primary text-white"
      />
    </div>

    <div class="q-mt-lg">
      <div class="full-width">
        <div class="flex justify-end q-mb-md">
          <div class="flex justify-end items-center">
            <div class="q-mr-md">Search:</div>
            <q-input
              v-model="search_keyword"
              outlined
              dense
              class="bg-white"
              debounce="1000"
              @update:model-value="search"
            />
          </div>
        </div>

        <q-table
          flat
          :rows="preOperationVerifications"
          :columns="columns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          :loading="tableLoading"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="table-menu">
                <q-btn dense icon="more_vert" flat round>
                  <q-menu style="width: 100px">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="
                          viewPreOperationVerificationDetails(props.row.id)
                        "
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editPreOperationsVerification(props.row.id)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showArchiveDialog(props.row)"
                      >
                        <q-item-section>Archive</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>

        <q-dialog v-model="archiveDialog" persistent>
          <q-card class="q-px-xl relative-position">
            <q-icon
              name="cancel"
              color="grey"
              size="sm"
              class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
              @click="archiveDialog = false"
            />
            <q-card-section class="text-center q-mt-lg">
              <q-icon name="archive" color="orange-10" size="lg" />
              <div class="text-h6 text-weight-bold">Archive Confirmation</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              Are you sure you want to archive this pre-operations verification?
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <span class="text-bold">Batch Number: </span>
              {{ selectedRow.batch_number }}
            </q-card-section>

            <q-card-section class="flex justify-center q-my-lg">
              <q-btn
                flat
                no-caps
                label="Cancel"
                class="border-000000-all q-px-lg"
                v-close-popup
              />
              <div class="q-mx-md"></div>
              <q-btn
                flat
                no-caps
                class="bg-accent text-white q-px-lg"
                @click="archivePreOperationsVerification(selectedRow.id)"
                :disable="archiveProductionPlanLoading"
              >
                <q-spinner v-if="archiveProductionPlanLoading" />
                <span v-else>Confirm</span>
              </q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import { useRouter } from "vue-router";

// Variables
const router = useRouter();

const columns = ref([
  {
    name: "batch_number",
    required: true,
    label: "Batch Number",
    align: "left",
    field: (row) => row.batch_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "inspections",
    required: true,
    label: "Inspections",
    align: "left",
    field: (row) => row.inspections,
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
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const preOperationVerifications = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveProductionPlanLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    preOperationVerifications.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        inspections: "Inspection 1, Inspection 2",
        status: "Pending",
        sop_reference: "SOP-001",
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        inspections: "Inspection 1, Inspection 2",
        status: "Pending",
        sop_reference: "SOP-002",
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        inspections: "Inspection 1, Inspection 2",
        status: "Pending",
        sop_reference: "SOP-003",
      },
      {
        id: 4,
        batch_number: "BATCH-004",
        inspections: "Inspection 1, Inspection 2",
        status: "Pending",
        sop_reference: "SOP-004",
      },
      {
        id: 5,
        batch_number: "BATCH-005",
        inspections: "Inspection 1, Inspection 2",
        status: "Pending",
        sop_reference: "SOP-005",
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewPreOperationVerificationDetails = (id) => {
  router.push({
    name: "view-pre-operations-verification-details",
    params: { id },
  });
};

const editPreOperationsVerification = (id) => {
  router.push({
    name: "edit-pre-operations-verification",
    params: { id },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
  console.log("Archive Pre-operations verification", rowData);
};

const archivePreOperationsVerification = (id) => {
  archiveProductionPlanLoading.value = true;
  console.log("Archive Pre-operations verification", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveProductionPlanLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
