<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Label & Carton Reconciliation"
      :items="[
        {
          label: 'Label & Carton Reconciliation',
        },
        {
          label: 'View Label & Carton Reconciliation',
          to: { name: 'view-label-and-carton-reconcillation' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        :to="{ name: 'add-label-and-carton-reconcillation' }"
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
          :rows="labelAndCartonReconcillations"
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
                          viewLabelAndCartonReconcillationDetails(props.row.id)
                        "
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editLabelAndCartonReconcillation(props.row.id)"
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
              Are you sure you want to archive the Label & Carton
              Reconciliation?
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
                @click="archiveLabelAndCartonReconcillation(selectedRow.id)"
                :disable="archiveLabelAndCartonReconcillationtLoading"
              >
                <q-spinner v-if="archiveLabelAndCartonReconcillationtLoading" />
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
    name: "product_name",
    required: true,
    label: "Product Name",
    align: "left",
    field: (row) => row.product_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "labels_issued",
    required: true,
    label: "Labels Issued",
    align: "left",
    field: (row) => row.labels_issued,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "labels_consumed",
    required: true,
    label: "Labels Consumed",
    align: "left",
    field: (row) => row.labels_consumed,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "packaging_materials_issued",
    required: true,
    label: "Packaging Materials Issued",
    align: "left",
    field: (row) => row.packaging_materials_issued,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "packaging_materials_consumed",
    required: true,
    label: "Packaging Materials Consumed",
    align: "left",
    field: (row) => row.packaging_materials_consumed,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const labelAndCartonReconcillations = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveLabelAndCartonReconcillationtLoading = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    labelAndCartonReconcillations.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        product_name: "Product 1",
        labels_issued: 100,
        labels_consumed: 50,
        packaging_materials_issued: 100,
        packaging_materials_consumed: 50,
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        product_name: "Product 2",
        labels_issued: 100,
        labels_consumed: 50,
        packaging_materials_issued: 100,
        packaging_materials_consumed: 50,
      },
      {
        id: 3,
        batch_number: "BATCH-003",
        product_name: "Product 3",
        labels_issued: 100,
        labels_consumed: 50,
        packaging_materials_issued: 100,
        packaging_materials_consumed: 50,
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewLabelAndCartonReconcillationDetails = (id) => {
  router.push({
    name: "view-label-and-carton-reconcillation-details",
    params: { id },
  });
};

const editLabelAndCartonReconcillation = (id) => {
  router.push({
    name: "edit-label-and-carton-reconcillation",
    params: { id },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

const archiveLabelAndCartonReconcillation = (id) => {
  archiveLabelAndCartonReconcillationtLoading.value = true;
  console.log("Archive Label and Carton Reconcillation", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveLabelAndCartonReconcillationtLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
