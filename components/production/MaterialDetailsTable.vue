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
      hide-bottom
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          :style="{
            'max-width': props.col.name === 'description' ? px(400) : 'none',
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

import { px } from "src/lib/utils";
import { columns, originalRows } from "../../data/materialDetailsDummyData";

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
  }, 1500);
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
</style>
