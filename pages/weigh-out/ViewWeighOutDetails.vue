<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Weigh Out"
      :items="[
        {
          label: 'Weigh Out',
          to: { name: 'view-weigh-out' },
        },
        {
          label: 'View Weigh Out Details',
          to: { name: 'view-weigh-out-details' },
        },
      ]"
    />

    <SectionWrapperLoader v-if="loading" hasHeader />
    <SectionWrapper v-else class="q-mt-lg">
      <template #header>
        <div class="row q-gutter-x-lg text-subtitle1">
          <div>
            <h6 class="q-ma-none">Production Batch Number:</h6>
            <span
              class="text-primary cursor-pointer q-pb-xs"
              style="text-decoration: underline"
            >
              {{ route.params.id }}
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Production Date:</h6>
            <span>January 1, 2025</span>
          </div>
          <div>
            <h6 class="q-ma-none">Date & Time:</h6>
            <span>September 10, 2024 8:00 AM</span>
          </div>
          <div>
            <h6 class="q-ma-none">SOP reference:</h6>
            <span
              class="text-primary cursor-pointer"
              style="text-decoration: underline"
            >
              sopreference.pdf
            </span>
          </div>
          <div>
            <h6 class="q-ma-none">Status:</h6>
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
          </div>
        </div>
      </template>

      <template #default>
        <div
          v-for="weighOut in weighOutDetails"
          :key="weighOut.id"
          style="border: 1px solid #c6c6c6"
          class="relative-position q-mt-xl q-pa-xl"
        >
          <!-- Material Details -->
          <div class="q-mt-lg">
            <h6 class="q-ma-none">Material Details</h6>
            <q-table
              flat
              :rows="weighOut.materials"
              :columns="materialDetailsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
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
                            @click="openViewMaterialDetails(props.row.id)"
                          >
                            <q-item-section>View</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </q-td>
              </template>
            </q-table>
          </div>

          <!-- Activity Logs -->
          <div class="q-mt-lg">
            <h6 class="q-ma-none">Activity Logs</h6>
            <q-table
              flat
              :rows="weighOut.activity_logs"
              :columns="activityLogsColumns"
              row-key="id"
              table-header-class="bg-dark text-white"
              class="overflow-auto q-mt-md"
              style="max-width: 460px"
            >
            </q-table>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <q-dialog v-model="viewMaterialDialog" persistent>
      <q-card
        class="q-px-xl relative-position full-width"
        style="max-width: 600px"
      >
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="viewMaterialDialog = false"
        />
        <div class="q-my-xl">
          <!-- Material Details -->
          <q-card-section>
            <div class="text-h6 text-weight-bold">Material Details</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-between full-width">
              <!-- first column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Material Code:</div>
                  <div class="text-subtitle2 text-weight-light">
                    MATERIAL-001
                  </div>
                </div>
                <div>
                  <div class="text-subtitle1">Component Description:</div>
                  <div class="text-subtitle2 text-weight-light">
                    Soybean Oil
                  </div>
                </div>
                <div>
                  <div class="text-subtitle1">UOM:</div>
                  <div class="text-subtitle2 text-weight-light">Kilogram</div>
                </div>
              </div>

              <!-- second column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Lot Number:</div>
                  <div class="text-subtitle2 text-weight-light">LT-10001</div>
                </div>
                <div>
                  <div class="text-subtitle1">Use-by-date:</div>
                  <div class="text-subtitle2 text-weight-light">
                    December 03, 2024
                  </div>
                </div>
                <div>
                  <div class="text-subtitle1">Supplier Name</div>
                  <div class="text-subtitle2 text-weight-light">
                    Farms Co. - FFC001
                  </div>
                </div>
                <div>
                  <div class="text-subtitle1">Location</div>
                  <div class="text-subtitle2 text-weight-light">
                    Warehouse A - Rack 5, Bin 12
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- Weight Information -->
          <q-card-section class="q-mt-lg">
            <div class="text-h6 text-weight-bold">Weight Information</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-between full-width">
              <!-- first column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Kilograms per Piece:</div>
                  <div class="text-subtitle2 text-weight-light">500</div>
                </div>
                <div>
                  <div class="text-subtitle1">Kilograms per Batch:</div>
                  <div class="text-subtitle2 text-weight-light">10000</div>
                </div>
                <div>
                  <div class="text-subtitle1">Weighing Scale ID :</div>
                  <div class="text-subtitle2 text-weight-light">SCALE-009</div>
                </div>
              </div>

              <!-- second column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Quantity Weighed:</div>
                  <div class="text-subtitle2 text-weight-light">9.95</div>
                </div>
                <div>
                  <div class="text-subtitle1">Quantity Required:</div>
                  <div class="text-subtitle2 text-weight-light">10</div>
                </div>
                <div>
                  <div class="text-subtitle1">Tolerance:</div>
                  <div class="text-subtitle2 text-weight-light">0.05</div>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- Issuance and Tracking -->
          <q-card-section class="q-mt-lg">
            <div class="text-h6 text-weight-bold">Issuance and Tracking</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-between full-width">
              <!-- first column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Issued By:</div>
                  <div class="text-subtitle2 text-weight-light">Jane Smith</div>
                </div>
                <div>
                  <div class="text-subtitle1">Issued Date & Time:</div>
                  <div class="text-subtitle2 text-weight-light">
                    September 03, 2024 8:00 AM
                  </div>
                </div>
              </div>

              <!-- second column -->
              <div
                class="column q-gutter-y-md full-width"
                style="max-width: 200px"
              >
                <div>
                  <div class="text-subtitle1">Amount Issued:</div>
                  <div class="text-subtitle2 text-weight-light">10</div>
                </div>
                <div>
                  <div class="text-subtitle1">Operator Name:</div>
                  <div class="text-subtitle2 text-weight-light">John Doe</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </MainContentWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date } from "quasar";
import { useRoute } from "vue-router";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const route = useRoute();

const weighOutDetails = ref([]);

const materialDetailsColumns = ref([
  {
    name: "material_code",
    required: true,
    label: "Material Code",
    align: "left",
    field: (row) => row.material_code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "component_description",
    required: true,
    label: "Component Description",
    align: "left",
    field: (row) => row.component_description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "uom",
    required: true,
    label: "UOM",
    align: "left",
    field: (row) => row.uom,
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
  {
    name: "storage_location",
    required: true,
    label: "Storage Location",
    align: "left",
    field: (row) => row.storage_location,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const activityLogsColumns = ref([
  {
    name: "action",
    required: true,
    label: "Action",
    align: "left",
    field: (row) => row.action,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "personnel",
    required: true,
    label: "Personnel",
    align: "left",
    field: (row) => row.personnel,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date_and_time",
    required: true,
    label: "Date & Time",
    align: "left",
    field: (row) => date.formatDate(row.date_and_time, "MMMM D, YYYY h:mm A"),
    format: (val) => `${val}`,
    sortable: true,
  },

  // Add more columns as needed
]);

const loading = ref(false);

const statusValue = ref({});
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

const viewMaterialDialog = ref(false);
const selectedMaterial = ref(null);

// Lifecycle Hooks
onMounted(() => {
  statusValue.value = statusOptions.value[0];
  fetchSampleData();
});

const fetchSampleData = () => {
  loading.value = true;

  setTimeout(() => {
    weighOutDetails.value = [
      {
        id: 1,
        materials: [
          {
            id: 1,
            material_code: "MATERIAL-001",
            component_description: "Component Description",
            uom: "UOM",
            supplier_name: "Supplier Name",
            storage_location: "Storage Location",
          },
          {
            id: 2,
            material_code: "MATERIAL-002",
            component_description: "Component Description",
            uom: "UOM",
            supplier_name: "Supplier Name",
            storage_location: "Storage Location",
          },
        ],
        activity_logs: [
          {
            id: 1,
            action: "Action",
            personnel: "Personnel",
            date_and_time: new Date(),
          },
          {
            id: 2,
            action: "Action",
            personnel: "Personnel",
            date_and_time: new Date(),
          },
        ],
      },
    ];

    loading.value = false;
  }, 1000);
};

const openViewMaterialDetails = (id) => {
  viewMaterialDialog.value = true;

  selectedMaterial.value = weighOutDetails.value.find(
    (weighOut) => weighOut.id === id
  );

  console.log("Selected Material", selectedMaterial.value);
};
</script>

<style lang="scss" scoped>
:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
