<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Scrap Material Report"
      :items="[
        {
          label: 'Scrap Material Report',
        },
        {
          label: 'View Scrap Material Reports',
          to: { name: 'view-finished-goods' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn label="Add New" no-caps flat class="bg-primary text-white" />
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
          :rows="scrapMaterialReports"
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
                        @click="viewFinishedGoodsDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editFinishedGoods(props.row.id)"
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
              Are you sure you want to archive this scrap material report?
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
                @click="archiveScrapMaterialReport(selectedRow.id)"
                :disable="archiveScrapMaterialReportLoading"
              >
                <q-spinner v-if="archiveScrapMaterialReportLoading" />
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
import { date } from "quasar";
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
    name: "lot_number",
    required: true,
    label: "Lot Number",
    align: "left",
    field: (row) => row.lot_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_scrapped",
    required: true,
    label: "Quantity Scrapped",
    align: "left",
    field: (row) => row.quantity_scrapped,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "reason_for_scrapping",
    required: true,
    label: "Reason for Scrapping",
    align: "left",
    field: (row) => row.reason_for_scrapping,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const scrapMaterialReports = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveScrapMaterialReportLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    scrapMaterialReports.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        material_name: "Material 1",
        lot_number: "LOT-001",
        quantity_scrapped: 10,
        reason_for_scrapping: "Reason 1",
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        material_name: "Material 2",
        lot_number: "LOT-002",
        quantity_scrapped: 20,
        reason_for_scrapping: "Reason 2",
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        material_name: "Material 3",
        lot_number: "LOT-003",
        quantity_scrapped: 30,
        reason_for_scrapping: "Reason 3",
      },
    ];

    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

// const viewFinishedGoodsDetails = (id) => {
//   router.push({
//     name: "view-finished-goods-details",
//     params: { id },
//   });
// };

// const editFinishedGoods = (id) => {
//   router.push({
//     name: "edit-finished-goods",
//     params: { id },
//   });
// };

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archiveScrapMaterialReport = (id) => {
  archiveScrapMaterialReportLoading.value = true;
  console.log("Archive Scrap Material Report", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveScrapMaterialReportLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
