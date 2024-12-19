<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Production Planning"
      :items="[
        {
          label: 'Production Planning',
          to: { name: 'viewProductionPlans' },
        },
        {
          label: 'View Production Plan Details',
          to: { name: 'viewProductionPlanDetails' },
        },
      ]"
    />

    <!-- Production Plan Details -->
    <SectionWrapperLoader v-if="loading" has-header />

    <SectionWrapper v-else>
      <template #header>
        <h2 class="title">Product Details</h2>
        <q-select
          outlined
          dense
          v-model="statusValue"
          :options="statusOptions"
          :option-value="statusOptions.value"
          :option-label="statusOptions.label"
          class="q-mt-sm"
          :rules="[(val) => !!val || 'Field is required']"
          style="width: 200px"
        />
      </template>

      <template #default>
        <div class="row justify-between">
          <div class="column" style="width: 303px">
            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Batch Number:
              </h3>
              <p class="value">{{ productionPlan.batch_number }}</p>
            </div>

            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Product Name:
              </h3>
              <p class="value">{{ productionPlan.product_id }}</p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Batch Number:
              </h3>
              <p class="value">
                {{ productionPlan.description }}
              </p>
            </div>
          </div>

          <div class="column" style="width: 303px">
            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Quantity:
              </h3>
              <p class="value">{{ productionPlan.quantity }}</p>
            </div>

            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Start Date & Time:
              </h3>
              <p class="value">
                {{
                  date.formatDate(
                    productionPlan.start_date_and_time,
                    "MMMM D, YYYY h:mm A"
                  )
                }}
              </p>
            </div>

            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                End Date & Time:
              </h3>
              <p class="value">
                {{
                  date.formatDate(
                    productionPlan.end_date_and_time,
                    "MMMM D, YYYY h:mm A"
                  )
                }}
              </p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Customer:
              </h3>
              <p class="value">{{ productionPlan.customer_name }}</p>
            </div>
          </div>

          <div class="column" style="width: 303px">
            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Purchase Order Number:
              </h3>
              <p class="value">{{ productionPlan.purchase_order_number }}</p>
            </div>

            <div style="margin-bottom: 26px">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Sales Order Number::
              </h3>
              <p class="value">{{ productionPlan.sales_order_number }}</p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Comments/Notes::
              </h3>
              <p class="value">
                {{ productionPlan.comments_notes }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <section class="q-mt-xl">
      <div class="full-width">
        <q-table
          flat
          :rows="materialDetails"
          :columns="materialDetailsColumns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          :loading="materialDetailsLoading"
        >
          <template v-slot:body-cell="props">
            <q-td
              :props="props"
              :style="{
                'max-width':
                  props.col.name === 'description' ? '400px' : 'none',
                'min-width':
                  props.col.name === 'description' ? '300px' : 'none',
                'white-space': 'wrap',
              }"
            >
              {{ props.value }}
            </q-td>
          </template>
        </q-table>
      </div>
    </section>

    <section class="q-mt-xl">
      <ActivityLogsTable :activity-logs="productionPlan.activity_logs" />
    </section>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { date } from "quasar";
import { useRoute } from "vue-router";
import { useProductionPlanStore } from "../../stores/production-plan-store";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import ActivityLogsTable from "./components/ActivityLogsTable.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";

const route = useRoute();
const productionPlanStore = useProductionPlanStore();

const statusValue = ref("");
const statusOptions = ref([
  { label: "Pending", value: 0 },
  { label: "Verified", value: 1 },
  { label: "In Progress", value: 2 },
  { label: "On Hold", value: 3 },
  { label: "Completed", value: 4 },
  { label: "Closed", value: 5 },
  { label: "Canceled", value: 6 },
  { label: "Delayed", value: 7 },
]);

// Production Plan Details Variables
const productionPlan = ref({});
const loading = ref(false);

// Material Details Variables
const materialDetailsColumns = ref([
  {
    name: "material_name",
    required: true,
    label: "Material Name",
    align: "left",
    field: (row) => row.material_id,
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
    name: "uom",
    required: true,
    label: "Unit of Measure",
    align: "left",
    field: (row) => row.uom,
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
    field: (row) =>
      date.formatDate(row.amount_issued_date_and_time, "MMMM D, YYYY h:mm A"),
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
    field: (row) => row.supplier_id,
    format: (val) => `${val}`,
    sortable: true,
  },
  // Add more columns as needed
]);
const materialDetails = ref([]);
const materialDetailsLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  getProductionPlan();
});

// Production Plan Details Logic
const getProductionPlan = () => {
  loading.value = true;

  const id = +route.params.id;
  productionPlanStore.GetProductionPlan(id).then((response) => {
    if (response.status === "success") {
      // Convert status from int to string
      switch (response.data[0].status) {
        case 0:
          response.data[0].status = "Pending";
          break;
        case 1:
          response.data[0].status = "Verified";
          break;
        case 2:
          response.data[0].status = "In Progress";
          break;
        case 3:
          response.data[0].status = "On Hold";
          break;
        case 4:
          response.data[0].status = "Completed";
          break;
        case 5:
          response.data[0].status = "Closed";
          break;
        case 6:
          response.data[0].status = "Cancelled";
          break;
        case 7:
          response.data[0].status = "Delayed";
          break;
        default:
          response.data[0].status = "Pending";
      }

      productionPlan.value = response.data[0];
      statusValue.value = response.data[0].status;
      materialDetails.value = response.data[0].material_details;
      console.log(materialDetails.value);
    }

    loading.value = false;
  });
};
</script>

<style lang="scss" scoped>
.title {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 42px;
  line-height: 0;
}

.header {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.value {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  margin: 0;
}

:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
