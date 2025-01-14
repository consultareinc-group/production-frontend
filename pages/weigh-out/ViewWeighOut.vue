<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Weigh Out"
      :items="[
        {
          label: 'Weigh Out',
        },
        {
          label: 'View Weigh Out',
          to: { name: 'view-weigh-out' },
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
          :rows="weighOuts"
          :columns="columns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          :loading="tableLoading"
        >
          <template v-slot:body-cell-quantity_required="props">
            <q-td :props="props"> {{ props.row.quantity_required }} kg </q-td>
          </template>

          <template v-slot:body-cell-quantity_weighed="props">
            <q-td :props="props"> {{ props.row.quantity_weighed }} kg </q-td>
          </template>

          <template v-slot:body-cell-tolerance="props">
            <q-td :props="props"> {{ props.row.tolerance }} kg </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="table-menu">
                <q-btn dense icon="more_vert" flat round>
                  <q-menu style="width: 100px">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="viewWeighOutDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editWeighOut(props.row.id)"
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
              Are you sure you want to archive the weigh out?
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
                @click="archiveEquipment(selectedRow.id)"
                :disable="archiveWeighOutLoading"
              >
                <q-spinner v-if="archiveWeighOutLoading" />
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
    name: "material_code",
    required: true,
    label: "Material Code",
    align: "left",
    field: (row) => row.equipment_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "component_description",
    required: true,
    label: "Component Description",
    align: "left",
    field: (row) => row.component_description,
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
    name: "quantity_weighed",
    required: true,
    label: "Quantity Weighed",
    align: "left",
    field: (row) => row.quantity_weighed,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tolerance",
    required: true,
    label: "Tolerance",
    align: "left",
    field: (row) => row.tolerance,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const weighOuts = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveWeighOutLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    weighOuts.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        equipment_name: "EQUIP-001",
        component_description: "Component Description",
        quantity_required: 100,
        quantity_weighed: 100,
        tolerance: 0.5,
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        equipment_name: "EQUIP-002",
        component_description: "Component Description",
        quantity_required: 200,
        quantity_weighed: 200,
        tolerance: 0.5,
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        equipment_name: "EQUIP-003",
        component_description: "Component Description",
        quantity_required: 300,
        quantity_weighed: 300,
        tolerance: 0.5,
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewWeighOutDetails = (id) => {
  router.push({
    name: "view-weigh-out-details",
    params: { id },
  });
};

// const editWeighOut = (id) => {
//   router.push({
//     name: "edit-equipment",
//     params: { id },
//   });
// };

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archiveEquipment = (id) => {
  archiveWeighOutLoading.value = true;
  console.log("Archive Weigh-Out", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveWeighOutLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
