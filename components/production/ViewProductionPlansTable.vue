<template>
  <div class="full-width">
    <q-table
      flat
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      separator="cell"
      class="overflow-auto"
    >
      <template v-slot:body-cell-batch_number="props">
        <q-td :props="props">
          <span
            :style="{ color: '#286091' }"
            class="underline cursor-pointer"
            >{{ props.row.batch_number }}</span
          >
        </q-td>
      </template>

      <template v-slot:top>
        <div class="fit row wrap justify-between items-center">
          <div class="row items-center">
            <span class="q-mr-sm">Show</span>
            <q-select
              v-model="pagination.rowsPerPage"
              :options="[10, 15, 20, 25, 30]"
              class="q-ml-sm bg-white"
              :style="{ width: px(72) }"
            />
          </div>
          <div class="row items-center">
            <span class="q-mr-sm">Search</span>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              class="bg-white"
            />
          </div>
        </div>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div
            class="relative-position row items-center"
            :style="{ width: '100%', 'min-width': px(100) }"
          >
            <span>{{ props.row.status }}</span>

            <q-btn unelevated icon="more_vert" class="more-vert">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="viewProductionPlanDetails(props.row.batch_number)"
                  >
                    <q-item-section>View</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Archive</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import { px } from "src/lib/utils";
import { columns, originalRows } from "../../data/viewProductPlansDummyData";

const router = useRouter();

const rows = ref([]);
const tableRef = ref();
const filter = ref("");
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

// handle the option click
const viewProductionPlanDetails = (batch_number) => {
  router.push({
    name: "viewProductionPlanDetails",
    params: { id: batch_number },
  });
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
.more-vert {
  position: absolute;
  right: 0;
  padding: 2px 6px;
  border-radius: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
}

:deep(.q-table__container > div:first-child) {
  background-color: #eef1f5;
}
:deep(.q-table__top) {
  padding: 0 0 21px 0;
}

:deep(.q-table--cell-separator .q-table__top) {
  border-bottom: none;
}

:deep(.q-field--standard .q-field__control:before) {
  border-bottom: none;
}

:deep(.q-field__native) {
  padding: 0 11px;
}

:deep(.q-field--outlined .q-field__control) {
  padding: 0;
}

:deep(.q-table th) {
  font-weight: 600;
  font-size: 13px;
}

:deep(
    .q-field--auto-height .q-field__control,
    .q-field--auto-height .q-field__native
  ) {
  min-height: 29px;
}

:deep(.q-field--dense .q-field__control, .q-field--dense .q-field__marginal) {
  height: 29px;
}

:deep(.q-field__marginal) {
  height: 29px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 0;
}

:deep(.q-field__native) {
  min-height: 29px !important;
}
</style>
