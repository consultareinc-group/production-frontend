<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Packaging Material Trace"
      :items="[
        {
          label: 'Packaging Material Trace',
        },
        {
          label: 'View Packaging Material Traces',
          to: { name: 'view-packaging-material-traces' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        :to="{ name: 'add-packaging-material-trace' }"
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
          :rows="packagingMaterialTraces"
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
                        @click="viewPackagingMaterialTraceDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editPackagingMaterialTrace(props.row.id)"
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
              Are you sure you want to archive the packaging material trace?
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
                @click="archivePackagingMaterialTrace(selectedRow.id)"
                :disable="archivePackagingMaterialTraceLoading"
              >
                <q-spinner v-if="archivePackagingMaterialTraceLoading" />
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
import { useRouter } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";

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
    name: "quantity_required",
    required: true,
    label: "Quantity Required",
    align: "left",
    field: (row) => row.quantity_required,
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
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const packagingMaterialTraces = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archivePackagingMaterialTraceLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    packagingMaterialTraces.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        packaging_material_name: "Packaging Material 1",
        quantity_issued: 100,
        quantity_required: 50,
        quantity_used: 30,
        quantity_rejected: 5,
        remaining_quantity: 15,
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        packaging_material_name: "Packaging Material 2",
        quantity_issued: 200,
        quantity_required: 100,
        quantity_used: 80,
        quantity_rejected: 10,
        remaining_quantity: 10,
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        packaging_material_name: "Packaging Material 3",
        quantity_issued: 300,
        quantity_required: 150,
        quantity_used: 120,
        quantity_rejected: 15,
        remaining_quantity: 15,
      },
    ];

    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewPackagingMaterialTraceDetails = (id) => {
  router.push({
    name: "view-packaging-material-traces-details",
    params: { id },
  });
};

const editPackagingMaterialTrace = (id) => {
  router.push({
    name: "edit-packaging-material-traces",
    params: { id },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archivePackagingMaterialTrace = (id) => {
  archivePackagingMaterialTraceLoading.value = true;
  console.log("Archive Packaging Material Trace", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archivePackagingMaterialTraceLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
