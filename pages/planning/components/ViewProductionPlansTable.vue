<template>
  <div class="full-width">
    <div class="flex justify-end q-mb-md">
      <div class="flex justify-end items-center">
        <div class="q-mr-md">Search:</div>
        <q-input v-model="filter" outlined dense class="bg-white" />
      </div>
    </div>

    <q-table
      flat
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      table-header-class="bg-dark text-white"
      class="overflow-auto"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="table-menu">
            <q-btn dense icon="more_vert" flat round>
              <q-menu style="width: 100px">
                <q-list>
                  <!-- <q-item
                            :to="{ name: 'route-name-here', params: { id: props.row.id } }"
                          > -->
                  <q-item clickable v-close-popup to="">
                    <q-item-section>View</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup to="">
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
          Are you sure you want to archive this production plan?
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
            @click="archivePlan"
            :disable="archivePlanLoading"
          >
            <q-spinner v-if="archivePlanLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

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
    name: "start_date_time",
    required: true,
    label: "Start Date & Time",
    align: "left",
    field: (row) => row.start_date_time,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "end_date_time",
    required: true,
    label: "End Date & Time",
    align: "left",
    field: (row) => row.end_date_time,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "customer",
    required: true,
    label: "Customer",
    align: "left",
    field: (row) => row.customer,
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

const originalRows = ref([
  {
    batch_number: 10001,
    product_name: "Product A - PT10001",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 16, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10002,
    product_name: "Product A - PT10002",
    quantity: "60",
    start_date_time: "August 14, 2024 8:00 AM",
    end_date_time: "August 17, 2024 5:00 PM",
    customer: "Doe, Jane",
    status: "Verified",
  },
  {
    batch_number: 10003,
    product_name: "Product A - PT10003",
    quantity: "100",
    start_date_time: "August 15, 2024 8:00 AM",
    end_date_time: "August 18, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10004,
    product_name: "Product A - PT10004",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10005,
    product_name: "Product A - PT10005",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10006,
    product_name: "Product A - PT10006",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10007,
    product_name: "Product A - PT10007",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10008,
    product_name: "Product A - PT10008",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 10009,
    product_name: "Product A - PT10009",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 100010,
    product_name: "Product A - PT100010",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 100011,
    product_name: "Product A - PT100011",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 100012,
    product_name: "Product A - PT100012",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 100013,
    product_name: "Product A - PT100013",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batch_number: 100014,
    product_name: "Product A - PT100014",
    quantity: "20",
    start_date_time: "August 13, 2024 8:00 AM",
    end_date_time: "August 14, 2024 5:00 PM",
    customer: "Doe, John",
    status: "Pending",
  },
]);

const rows = ref([]);
const tableRef = ref();
const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 0,
  rowsPerPage: 5,
  rowsNumber: 0,
});

const archiveDialog = ref(false);
const archivePlanLoading = ref(false);
const selectedRow = ref({});

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});

// emulate ajax call
// SELECT * FROM ... WHERE...LIMIT...
function fetchFromServer(startRow, count, filter, sortBy, descending) {
  let data = originalRows.value.slice();

  // Handle filtering
  if (filter) {
    data = data.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  // Handle sorting
  if (sortBy) {
    data.sort(dynamicSort(sortBy, descending));
  }

  // Simulate server response
  return data.slice(startRow, startRow + count);
}

function dynamicSort(field, descending) {
  return function (a, b) {
    let fieldA = a[field];
    let fieldB = b[field];

    // Handle different field types
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    } else {
      fieldA = parseFloat(fieldA);
      fieldB = parseFloat(fieldB);
    }

    if (fieldA < fieldB) return descending ? 1 : -1;
    if (fieldA > fieldB) return descending ? -1 : 1;
    return 0;
  };
}

// emulate 'SELECT count(*) FROM ...WHERE...'
function getRowsNumberCount(filter) {
  if (!filter) {
    return originalRows.value.length;
  }
  let count = 0;
  originalRows.value.forEach((row) => {
    if (Object.values(row).some((val) => String(val).includes(filter))) {
      ++count;
    }
  });
  return count;
}

function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;

  // update rowsCount with appropriate value
  pagination.value.rowsNumber = getRowsNumberCount(filter);

  // get all rows if "All" (0) is selected
  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage;

  // fetch data from "server"
  const returnedData = fetchFromServer(
    startRow,
    fetchCount,
    filter,
    sortBy,
    descending
  );

  // clear out existing data and add new
  rows.value.splice(0, rows.value.length, ...returnedData);

  // don't forget to update local pagination object
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
}

// handle the option click
const viewProductionPlanDetails = (batch_number) => {
  router.push({
    name: "viewProductionPlanDetails",
    params: { id: batch_number },
  });
};

// handle production plan edit
const editProductionPlan = (batch_number) => {
  router.push({
    name: "editProductionPlan",
    params: { id: batch_number },
  });
};

const showArchiveDialog = (rowData) => {
  archiveDialog.value = true;
  selectedRow.value = rowData;
};

// handle production plan archive
const archivePlan = () => {
  archivePlanLoading.value = true;
  setTimeout(() => {
    archiveDialog.value = false;
    archivePlanLoading.value = false;
  }, 1500);
};

// Watch for changes in pagination.rowsPerPage and refetch data
watch(
  () => pagination.value.rowsPerPage,
  () => {
    onRequest({ pagination: pagination.value, filter: filter.value });
  }
);
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
