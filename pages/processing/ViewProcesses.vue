<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Processing"
      :items="[
        {
          label: 'Processing',
        },
        {
          label: 'View Processes',
          to: { name: 'view-processes' },
        },
      ]"
    />

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        :to="{ name: 'add-process' }"
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
          :rows="processes"
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
                        @click="viewProcessDetails(props.row.id)"
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
              Are you sure you want to archive the processing?
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
                @click="archiveProcess(selectedRow.id)"
                :disable="archiveProcessDialog"
              >
                <q-spinner v-if="archiveProcessDialog" />
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
    name: "process_name",
    required: true,
    label: "Process Name",
    align: "left",
    field: (row) => row.process_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "standard_duration",
    required: true,
    label: "Standard Duration",
    align: "left",
    field: (row) => row.standard_duration,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "start_date_and_time_of_processing",
    required: true,
    label: "Start Date & Time of Processing",
    align: "left",
    field: (row) =>
      date.formatDate(
        row.start_date_and_time_of_processing,
        "MMMM D, YYYY h:mm A"
      ),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "end_date_and_time_of_processing",
    required: true,
    label: "End Date & Time of Processing",
    align: "left",
    field: (row) =>
      date.formatDate(
        row.end_date_and_time_of_processing,
        "MMMM D, YYYY h:mm A"
      ),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "operator_names",
    required: true,
    label: "Operator Name(s)",
    align: "left",
    field: (row) => row.operator_names,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const processes = ref([]);
const tableLoading = ref(false);
const search_keyword = ref("");

const archiveDialog = ref(false);
const archiveProcessDialog = ref(false);
const selectedRow = ref({});

// Lifecycle Hooks
onMounted(() => {
  fetchSampleData();
});

// Functions
const fetchSampleData = () => {
  tableLoading.value = true;

  setTimeout(() => {
    processes.value = [
      {
        id: 1,
        batch_number: "BATCH-001",
        process_name: "Process 1",
        standard_duration: "2 hours",
        start_date_and_time_of_processing: "2021-09-01 08:00:00",
        end_date_and_time_of_processing: "2021-09-01 10:00:00",
        operator_names: "Operator 1, Operator 2",
      },
      {
        id: 2,
        batch_number: "BATCH-002",
        process_name: "Process 2",
        standard_duration: "3 hours",
        start_date_and_time_of_processing: "2021-09-01 10:00:00",
        end_date_and_time_of_processing: "2021-09-01 13:00:00",
        operator_names: "Operator 3, Operator 4",
      },
    ];
    tableLoading.value = false;
  }, 1000);
};

const search = () => {
  console.log("Search", search_keyword.value);
};

const viewProcessDetails = (id) => {
  router.push({
    name: "view-process-details",
    params: { id },
  });
};

// const editPreOperationsVerification = (id) => {
//   router.push({
//     name: "edit-pre-operations-verification",
//     params: { id },
//   });
// };

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
  console.log("Archive Pre-operations verification", rowData);
};

const archiveProcess = (id) => {
  archiveProcessDialog.value = true;
  console.log("Archive Pre-operations verification", id);

  setTimeout(() => {
    archiveDialog.value = false;
    archiveProcessDialog.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
