<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Equipment"
      :items="[
        {
          label: 'Equipment',
        },
        {
          label: 'View Equipment',
          to: { name: 'view-equipment' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        :to="{ name: 'add-equipment' }"
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
          :rows="equipments"
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
                        @click="viewEquipmentDetails(props.row.id)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editEquipment(props.row.id)"
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
              Are you sure you want to archive this equipment?
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <span class="text-bold">Equipment Name: </span>
              {{ selectedRow.equipment_name }}
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
                :disable="archiveEquipmentLoading"
              >
                <q-spinner v-if="archiveEquipmentLoading" />
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
    name: "equipment_id",
    required: true,
    label: "Equipment ID",
    align: "left",
    field: (row) => row.equipment_id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "equipment_name",
    required: true,
    label: "Equipment Name",
    align: "left",
    field: (row) => row.equipment_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    required: true,
    label: "Category",
    align: "left",
    field: (row) => row.category,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "location",
    required: true,
    label: "Location",
    align: "left",
    field: (row) => row.location,
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
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const equipments = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveEquipmentLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    equipments.value = [
      {
        id: 1,
        equipment_id: "EQ-001",
        equipment_name: "Equipment 1",
        category: "Category 1",
        location: "Location 1",
        status: "Active",
      },
      {
        id: 2,
        equipment_id: "EQ-002",
        equipment_name: "Equipment 2",
        category: "Category 2",
        location: "Location 2",
        status: "Active",
      },
      {
        id: 3,
        equipment_id: "EQ-003",
        equipment_name: "Equipment 3",
        category: "Category 3",
        location: "Location 3",
        status: "Active",
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewEquipmentDetails = (id) => {
  router.push({
    name: "view-equipment-details",
    params: { id },
  });
};

const editEquipment = (id) => {
  router.push({
    name: "edit-equipment",
    params: { id },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
  console.log("Archive Equipment", rowData);
};

const archiveEquipment = (id) => {
  archiveEquipmentLoading.value = true;
  console.log("Archive Equipment", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveEquipmentLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
