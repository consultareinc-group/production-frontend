<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Finished Goods"
      :items="[
        {
          label: 'Finished Goods',
        },
        {
          label: 'View Finished Goods',
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
          :rows="finishedGoods"
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
              Are you sure you want to archive this Finished Goods?
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
                @click="archiveFinishedGoods(selectedRow.id)"
                :disable="archiveFinishedGoodsLoading"
              >
                <q-spinner v-if="archiveFinishedGoodsLoading" />
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
    name: "product_name",
    required: true,
    label: "Product Name",
    align: "left",
    field: (row) => row.product_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: (row) => row.quantity,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "production_date",
    required: true,
    label: "Production Date",
    align: "left",
    field: (row) => date.formatDate(row.production_date, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "best_before_date",
    required: true,
    label: "Best Before Date",
    align: "left",
    field: (row) =>
      date.formatDate(row.best_before_date, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "storage_condition",
    required: true,
    label: "Storage Condition",
    align: "left",
    field: (row) => row.storage_condition,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const finishedGoods = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveFinishedGoodsLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    finishedGoods.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        product_name: "Product 1",
        quantity: 100,
        production_date: "2021-10-01",
        best_before_date: "2021-12-01",
        storage_condition: "Room Temperature",
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        product_name: "Product 2",
        quantity: 200,
        production_date: "2021-10-02",
        best_before_date: "2021-12-02",
        storage_condition: "Room Temperature",
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        product_name: "Product 3",
        quantity: 300,
        production_date: "2021-10-03",
        best_before_date: "2021-12-03",
        storage_condition: "Room Temperature",
      },
    ];

    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewFinishedGoodsDetails = (id) => {
  router.push({
    name: "view-finished-goods-details",
    params: { id },
  });
};

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

const archiveFinishedGoods = (id) => {
  archiveFinishedGoodsLoading.value = true;
  console.log("Archive Finished Goods", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveFinishedGoodsLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
