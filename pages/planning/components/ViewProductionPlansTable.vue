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
            @click="archivePlan(selectedRow.id)"
            :disable="archiveProductionPlanLoading"
          >
            <q-spinner v-if="archiveProductionPlanLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useProductionPlanStore } from "../../../stores/production-plan-store";

const router = useRouter();
const productionPlanStore = useProductionPlanStore();

const $q = useQuasar();

const archiveDialog = ref(false);
const archiveProductionPlanLoading = ref(false);
const selectedRow = ref({});

onMounted(() => {
  tableLoading.value = true;
  getProductionPlans();
});
// Production Plans Table Variables
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
const tableLoading = ref(false);
const search_keyword = ref("");

// Production Plans Table Logic
const getProductionPlans = () => {
  productionPlanStore
    .GetProductionPlans({ offset: productionPlans.value.length })
    .then((response) => {
      tableLoading.value = false;
      if (response.status === "success") {
        response.data.forEach((data) => {
          // Convert status from int to string
          switch (data.status) {
            case 0:
              data.status = "Pending";
              break;
            case 1:
              data.status = "Verified";
              break;
            case 2:
              data.status = "In Progress";
              break;
            case 3:
              data.status = "On Hold";
              break;
            case 4:
              data.status = "Completed";
              break;
            case 5:
              data.status = "Closed";
              break;
            case 6:
              data.status = "Cancelled";
              break;
            case 7:
              data.status = "Delayed";
              break;
            default:
              data.status = "Pending";
          }

          productionPlans.value.push(data);
        });

        if (response.data.length) {
          getProductionPlans();
        }
      }
    });
};

const search = () => {
  tableLoading.value = true;
  if (search_keyword.value) {
    productionPlanStore
      .SearchProductionPlans({ keyword: search_keyword.value })
      .then((response) => {
        tableLoading.value = false;
        if (response.status === "success") {
          productionPlans.value = response.data;
        }
      });
  } else {
    productionPlans.value = [];
    getProductionPlans();
  }
};

const viewProductionPlanDetails = (id) => {
  router.push({
    name: "viewProductionPlanDetails",
    params: { id },
  });
};

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

const archivePlan = (id) => {
  let payload = {
    id,
    is_archived: 1,
  };

  archiveProductionPlanLoading.value = true;

  productionPlanStore
    .ArchiveProductionPlan({ id, payload })
    .then((response) => {
      if (response.status === "success") {
        productionPlans.value = productionPlans.value.filter(
          (plan) => plan.id !== id
        );

        $q.notify({
          html: true,
          message: `
          <div style="font-size: 14px; color: #155724">
          Production plan archived successfully <br />
          Batch Number: <strong>${selectedRow.value.batch_number}</strong>
          </div>
          `,
          color: "green-2",
          position: "top-right",
          timeout: 2000,
        });
      }

      archiveDialog.value = false;
      archiveProductionPlanLoading.value = false;
      selectedRow.value = {};
    });
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
