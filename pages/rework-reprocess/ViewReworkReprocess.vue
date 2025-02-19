<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Rework/Reprocess"
      :items="[
        {
          label: 'Rework/Reprocess',
        },
        {
          label: 'View Rework/Reprocess',
          to: { name: 'view-rework-reprocess' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        :to="{ name: 'add-rework-reprocess' }"
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
          :rows="reworkReprocess"
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
                        @click="viewReworkReprocessDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editReworkReprocess(props.row.id)"
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
              Are you sure you want to archive this rework/reproces?
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
                @click="archiveReworkReprocess(selectedRow.id)"
                :disable="archiveReworkReprocessLoading"
              >
                <q-spinner v-if="archiveReworkReprocessLoading" />
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
    name: "material_name",
    required: true,
    label: "Material Name",
    align: "left",
    field: (row) => row.material_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "material_quantity_for_reprocessing",
    required: true,
    label: "Material Quantity for Reprocessing",
    align: "left",
    field: (row) => row.material_quantity_for_reprocessing,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "material_quantity_for_rework",
    required: true,
    label: "Material Quantity for Rework",
    align: "left",
    field: (row) => row.material_quantity_for_rework,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const reworkReprocess = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveReworkReprocessLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    reworkReprocess.value = [
      {
        id: 1,
        batch_number: "PB-0001",
        material_name: "Material 1",
        material_quantity_for_reprocessing: 10,
        material_quantity_for_rework: 5,
      },
      {
        id: 2,
        batch_number: "PB-0002",
        material_name: "Material 2",
        material_quantity_for_reprocessing: 15,
        material_quantity_for_rework: 7,
      },
      {
        id: 3,
        batch_number: "PB-0003",
        material_name: "Material 3",
        material_quantity_for_reprocessing: 20,
        material_quantity_for_rework: 10,
      },
    ];

    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewReworkReprocessDetails = (id) => {
  router.push({
    name: "view-rework-reprocess-details",
    params: { id },
  });
};

const editReworkReprocess = (id) => {
  router.push({
    name: "edit-rework-reprocess",
    params: { id },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archiveReworkReprocess = (id) => {
  archiveReworkReprocessLoading.value = true;
  console.log("Archive Rework Reprocess", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveReworkReprocessLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
