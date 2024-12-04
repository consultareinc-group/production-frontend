<template>
  <div class="full-width">
    <slot name="header"></slot>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :rows-per-page="rowsPerPage"
      :filter="filter"
      separator="cell"
      hide-bottom
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div style="display: flex; justify-content: space-between">
            <span>{{ props.row.status }}</span>
            <q-icon name="more_vert" class="text-h5" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  rowsPerPage: {
    type: Number,
    default: 5,
  },
  filter: {
    type: String,
    default: "",
  },
});

const columns = [
  {
    name: "batch_number",
    required: true,
    label: "Batch Number",
    align: "left",
    field: (row) => row.batchNumber,
  },
  {
    name: "product_name",
    required: true,
    label: "Product Name",
    align: "left",
    field: (row) => row.productName,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: (row) => row.quantity,
  },
  {
    name: "startDateTime",
    required: true,
    label: "Start Date & Time",
    align: "left",
    field: (row) => row.startDateTime,
  },
  {
    name: "endDateTime",
    required: true,
    label: "End Date & Time",
    align: "left",
    field: (row) => row.endDateTime,
  },
  {
    name: "customer",
    required: true,
    label: "Customer",
    align: "left",
    field: (row) => row.customer,
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: (row) => row.status,
  },
];

const rows = ref([
  {
    batchNumber: 10001,
    productName: "Product A - PT10001",
    quantity: 25,
    startDateTime: "2021-10-01",
    endDateTime: "2021-10-02",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batchNumber: 10002,
    productName: "Product A - PT10002",
    quantity: 25,
    startDateTime: "2021-10-01",
    endDateTime: "2021-10-02",
    customer: "Doe, John",
    status: "Pending",
  },
  {
    batchNumber: 10003,
    productName: "Product A - PT10003",
    quantity: 25,
    startDateTime: "2021-10-01",
    endDateTime: "2021-10-02",
    customer: "Doe, John",
    status: "Pending",
  },
]);

const filteredRows = computed(() => {
  return rows.value.filter((row) => {
    return (
      !props.filter ||
      row.productName.toLowerCase().includes(props.filter.toLowerCase())
    );
  });
});

watch(
  () => props.rowsPerPage,
  (newVal) => {
    // Handle rows per page change if needed
  }
);
</script>

<style lang="scss" scoped>
:deep(.q-table th) {
  font-size: 13px;
  font-weight: 600;
}
</style>
