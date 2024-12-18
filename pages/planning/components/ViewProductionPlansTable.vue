<template>
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
      :rows="productionPlans"
      :columns="columns"
      row-key="id"
      table-header-class="bg-dark text-white"
      class="overflow-auto"
      :loading="loading"
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
                    @click="viewProductionPlanDetails(props.row.id)"
                  >
                    <q-item-section>View</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="editProductionPlan(props.row.batch_number)"
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
import { ref, onMounted } from "vue";
import { date } from "quasar";
import { useRouter } from "vue-router";
import { useProductionPlanStore } from "../../../stores/production-plan-store";

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
    field: (row) => row.product_id,
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
    field: (row) =>
      date.formatDate(row.start_date_and_time, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "end_date_time",
    required: true,
    label: "End Date & Time",
    align: "left",
    field: (row) =>
      date.formatDate(row.end_date_and_time, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "customer",
    required: true,
    label: "Customer",
    align: "left",
    field: (row) => row.customer_name,
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

const productionPlans = ref([]);

const archiveDialog = ref(false);
const archivePlanLoading = ref(false);
const selectedRow = ref({});
const loading = ref(false);
const store = useProductionPlanStore();
const search_keyword = ref("");

onMounted(() => {
  loading.value = true;
  getProductionPlans();
});

// get production plans
const getProductionPlans = () => {
  store
    .GetProductionPlans({ offset: productionPlans.value.length })
    .then((response) => {
      loading.value = false;
      if (response.status === "success") {
        response.data.forEach((data) => {
          productionPlans.value.push(data);
        });

        if (response.data.length) {
          getProductionPlans();
        }
      }
    });
};

// handle table search
const search = () => {
  loading.value = true;
  if (search_keyword.value) {
    store
      .SearchProductionPlans({ keyword: search_keyword.value })
      .then((response) => {
        loading.value = false;
        if (response.status === "success") {
          productionPlans.value = response.data;
        }
      });
  } else {
    productionPlans.value = [];
    getProductionPlans();
  }
};

// handle the option click
const viewProductionPlanDetails = (id) => {
  router.push({
    name: "viewProductionPlanDetails",
    params: { id },
  });
};

// handle production plan edit
const editProductionPlan = (batch_number) => {
  router.push({
    name: "editProductionPlan",
    params: { id: batch_number },
  });
};

// show archive dialog
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
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
