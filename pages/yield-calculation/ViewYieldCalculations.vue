<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Yield Calculation"
      :items="[
        {
          label: 'Yield Calculation',
        },
        {
          label: 'View Yield Calculation',
          to: { name: 'view-yield-calculations' },
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
          :rows="yieldCalculations"
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
                        @click="viewYieldCalculationDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editYieldCalculation(props.row.id)"
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
              Are you sure you want to archive the yield calculation?
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
                @click="archiveYieldCalculation(selectedRow.id)"
                :disable="archiveYieldCalculationLoading"
              >
                <q-spinner v-if="archiveYieldCalculationLoading" />
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
    name: "planned_quantity",
    required: true,
    label: "Planned Quantity",
    align: "left",
    field: (row) => row.planned_quantity,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity_of_material_in_finished_products",
    required: true,
    label: "Quantity of Material in Finished Products",
    align: "left",
    field: (row) => row.quantity_of_material_in_finished_products,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "process_loss_percentage",
    required: true,
    label: "Process Loss Percentage",
    align: "left",
    field: (row) => row.process_loss_percentage,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "yield_percentage",
    required: true,
    label: "Yield Percentage",
    align: "left",
    field: (row) => row.yield_percentage,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const yieldCalculations = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveYieldCalculationLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    yieldCalculations.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        material_name: "Material 1",
        planned_quantity: 100,
        quantity_of_material_in_finished_products: 90,
        process_loss_percentage: 10,
        yield_percentage: 90,
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        material_name: "Material 2",
        planned_quantity: 200,
        quantity_of_material_in_finished_products: 180,
        process_loss_percentage: 20,
        yield_percentage: 90,
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        material_name: "Material 3",
        planned_quantity: 300,
        quantity_of_material_in_finished_products: 270,
        process_loss_percentage: 30,
        yield_percentage: 90,
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewYieldCalculationDetails = (id) => {
  router.push({
    name: "view-yield-calculation-details",
    params: { id },
  });
};

// const editYieldCalculation = (id) => {
//   router.push({
//     name: "edit-weigh-out",
//     params: { id },
//   });
// };

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archiveYieldCalculation = (id) => {
  archiveYieldCalculationLoading.value = true;
  console.log("Archive Yield Calculation", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveYieldCalculationLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
