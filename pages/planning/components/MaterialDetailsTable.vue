<template>
  <div class="full-width">
    <q-table
      flat
      ref="tableRef"
      title="Material Details"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      binary-state-sort
      @request="onRequest"
      separator="cell"
      table-header-class="bg-dark text-white"
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          :style="{
            'max-width': props.col.name === 'description' ? '400px' : 'none',
            'min-width': props.col.name === 'description' ? '300px' : 'none',
            'white-space': 'wrap',
          }"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const columns = ref([
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
    name: "description",
    required: true,
    label: "Description",
    align: "left",
    field: (row) => row.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "oum",
    required: true,
    label: "OUM",
    align: "left",
    field: (row) => row.oum,
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
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "batch",
    required: true,
    label: "Batch",
    align: "left",
    field: (row) => row.batch,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amount_issued_date_time",
    required: true,
    label: "Amount Issued Date & Time",
    align: "left",
    field: (row) => row.amount_issued_date_time,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "pick_location",
    required: true,
    label: "Pick Location",
    align: "left",
    field: (row) => row.pick_location,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "supplier_name",
    required: true,
    label: "Supplier Name",
    align: "left",
    field: (row) => row.supplier_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);

const originalRows = ref([
  {
    material_name: "Material A - MT-100001",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    oum: "20 (kg)",
    lot_number: "L-24082024-001",
    amount: 20,
    batch: 50,
    amount_issued_date_time: "August 10, 2024 8:00 AM",
    pick_location: "3B-2-1",
    supplier_name: "Farms Co. - FFC001",
  },
  {
    material_name: "Material A - MT-100002",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    oum: "60 (kg)",
    lot_number: "L-24082024-002",
    amount: 30,
    batch: 60,
    amount_issued_date_time: "August 11, 2024 8:00 AM",
    pick_location: "3B-2-2",
    supplier_name: "Farms Co. - FFC002",
  },
  {
    material_name: "Material A - MT-100003",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    oum: "100 (kg)",
    lot_number: "L-24082024-003",
    amount: 40,
    batch: 70,
    amount_issued_date_time: "August 12, 2024 8:00 AM",
    pick_location: "3B-2-3",
    supplier_name: "Farms Co. - FFC003",
  },
]);

const rows = ref([]);
const tableRef = ref();
const loading = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 0,
  rowsPerPage: 10,
  rowsNumber: 0,
});

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

  loading.value = true;

  // emulate server
  setTimeout(() => {
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

    // ...and turn of loading indicator
    loading.value = false;
  }, 1000);
}
</script>

<style lang="scss" scoped>
:deep(.q-table__container > div:first-child) {
  background-color: #eef1f5;
}
:deep(.q-table__top) {
  padding: 0 0 21px 0;
}

:deep(.q-table__title) {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
}

:deep(.q-table th) {
  font-weight: 600;
  font-size: 13px;
}

:deep(.q-table--cell-separator .q-table__top) {
  border-bottom: none;
}

:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
