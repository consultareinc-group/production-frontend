<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Equipment"
      :items="[
        {
          label: 'Equipment',
          to: { name: 'view-equipments' },
        },
        {
          label: 'Add Equipment',
          to: { name: 'add-equipment' },
        },
      ]"
    />

    <!-- Add Equipment -->
    <SectionWrapperLoader v-if="loading" has-header class="q-mb-xl q-mt-xl" />
    <SectionWrapper v-else class="q-mt-xl">
      <template #header>
        <p class="text-grey-8">
          Please fill out the required fields <span class="text-red">*</span>
        </p>
      </template>

      <template #default>
        <!-- Production batch number -->
        <div class="q-mt-xl" style="max-width: 304px">
          <label>Production Batch Number <span class="text-red">*</span></label>
          <q-input
            outlined
            v-model="productionBatchNumber"
            dense
            class="q-mt-sm"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <div
          class="relative-position q-pa-xl"
          style="border: 1px solid #c6c6c6"
        >
          <div
            class="row justify-between full-height no-wrap"
            style="gap: 23px"
          >
            <!-- first row -->
            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Equipment Name -->
              <div style="height: 90px">
                <label>Equipment Name <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.equipment_name"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Category -->
              <div style="height: 90px">
                <label>Category <span class="text-red">*</span></label>
                <q-select
                  outlined
                  dense
                  v-model="equipment.category"
                  :options="sortedCategories"
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Manufacturer -->
              <div style="height: 90px">
                <label>Manufacturer <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.manufacturer"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Model Number -->
              <div style="height: 90px">
                <label>Model Number <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.model_number"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Serial Number -->
              <div style="height: 90px">
                <label>Serial Number <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.serial_number"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Purchase Date -->
              <div style="height: 90px">
                <label>Purchase Date <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.purchase_date"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          minimal
                          v-model="equipment.purchase_date"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Purchase Price -->
              <div style="height: 90px">
                <label>Purchase Price</label>
                <q-input
                  type="number"
                  outlined
                  v-model="equipment.purchase_price"
                  dense
                  class="q-mt-sm"
                />
              </div>
            </div>

            <!-- second row -->
            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Supplier -->
              <div style="height: 90px">
                <label>Supplier</label>
                <q-input
                  outlined
                  v-model="equipment.supplier"
                  dense
                  class="q-mt-sm"
                />
              </div>

              <!-- Warranty Expiration Date -->
              <div style="height: 90px">
                <label>Warranty Expiration Date</label>
                <q-input
                  outlined
                  v-model="equipment.warranty_expiration_date"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          minimal
                          v-model="equipment.warranty_expiration_date"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Condition -->
              <div style="height: 90px">
                <label>Condition <span class="text-red">*</span></label>
                <q-select
                  outlined
                  dense
                  v-model="equipment.condition"
                  :options="conditionsOptions"
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Location -->
              <div style="height: 90px">
                <label>Location <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="equipment.location"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Assigned To -->
              <div style="height: 90px">
                <label>Assigned To</label>
                <q-input
                  outlined
                  v-model="equipment.assigned_to"
                  dense
                  class="q-mt-sm"
                />
              </div>

              <!-- Maintenance Schedule -->
              <div style="height: 90px">
                <label>Maintenance Schedule</label>
                <q-input
                  outlined
                  v-model="equipment.maintenance_schedule"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          minimal
                          v-model="equipment.maintenance_schedule"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Status -->
              <div style="height: 90px">
                <label>Status <span class="text-red">*</span></label>
                <q-select
                  outlined
                  dense
                  v-model="equipment.status"
                  :options="statusOptions"
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
            </div>

            <!-- third row -->
            <div class="q-gutter-y-md" style="width: 100%">
              <!-- Description -->
              <div style="height: 196px">
                <label>Description</label>
                <q-input
                  outlined
                  v-model="equipment.description"
                  type="textarea"
                  dense
                  class="q-mt-sm"
                  input-style="height: 140px"
                />
              </div>

              <!-- Equipment Image -->
              <div style="height: 90px">
                <label>Equipment Image</label>
                <q-file
                  outlined
                  v-model="equipment.equipment_image"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
              </div>

              <!-- Safety Manual -->
              <div style="height: 90px">
                <label>Safety Manual</label>
                <q-file
                  outlined
                  v-model="equipment.safety_manual"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
              </div>

              <!-- Operation Manual -->
              <div style="height: 90px">
                <label>Operation Manual</label>
                <q-file
                  outlined
                  v-model="equipment.operation_manual"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
              </div>

              <!-- Maintenance Manual -->
              <div style="height: 90px">
                <label>Maintenance Manual</label>
                <q-file
                  outlined
                  v-model="equipment.maintenance_manual"
                  dense
                  class="q-mt-sm"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
              </div>

              <!-- Additional Notes -->
              <div style="height: 90px">
                <label>Additional Notes</label>
                <q-input
                  outlined
                  v-model="equipment.additional_notes"
                  type="textarea"
                  dense
                  class="q-mt-sm"
                  input-style="height: 70px"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <!-- Action Buttons -->
    <div>
      <q-btn
        @click="saveEquipment"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useQuasar } from "quasar";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const productionBatchNumber = ref("");

const equipment = ref({
  equipment_name: null,
  category: null,
  manufacturer: null,
  model_number: null,
  serial_number: null,
  purchase_date: null,
  purchase_price: null,
  supplier: null,
  warranty_expiration_date: null,
  condition: null,
  location: null,
  assigned_to: null,
  maintenance_schedule: null,
  status: null,
  description: null,
  equipment_image: null,
  safety_manual: null,
  operation_manual: null,
  maintenance_manual: null,
  additional_notes: null,
});

const loading = ref(false);

const categoryOptions = [
  {
    label: "Mixing",
    value: 0,
  },
  {
    label: "Processing",
    value: 1,
  },
  {
    label: "Packaging",
    value: 2,
  },
  {
    label: "Refrigeration",
    value: 3,
  },
  {
    label: "Cooking",
    value: 4,
  },
  {
    label: "Cleaning and Sanitation",
    value: 5,
  },
  {
    label: "Weighing and Measuring",
    value: 6,
  },
  {
    label: "Conveying Systems",
    value: 7,
  },
  {
    label: "Cutting and Slicing",
    value: 8,
  },
  {
    label: "Storage Tanks and Silos",
    value: 9,
  },
  {
    label: "Inspection and Quality Control",
    value: 10,
  },
  {
    label: "Filling Machines",
    value: 11,
  },
  {
    label: "Drying and Dehydration",
    value: 12,
  },
  {
    label: "Baking and Ovens",
    value: 13,
  },
  {
    label: "Cooling and Freezing",
    value: 14,
  },
  {
    label: "Pasteurization",
    value: 15,
  },
  {
    label: "Fermentation",
    value: 16,
  },
  {
    label: "Grinders and Mills",
    value: 17,
  },
  {
    label: "Labeling Equipment",
    value: 18,
  },
  {
    label: "Utility Systems (e.g. Boilers, Compressors)",
    value: 19,
  },
];

const conditionsOptions = [
  {
    label: "New",
    value: 0,
  },
  {
    label: "Good",
    value: 1,
  },
  {
    label: "Fair",
    value: 2,
  },
  {
    label: "Poor",
    value: 3,
  },
  {
    label: "Needs Repair",
    value: 4,
  },
];

const statusOptions = [
  {
    label: "Available",
    value: 0,
  },
  {
    label: "Checked Out",
    value: 1,
  },
  {
    label: "Under Maintenance",
    value: 2,
  },
  {
    label: "Retired",
    value: 3,
  },
];

// Computed Properties
const sortedCategories = computed(() => {
  return [...categoryOptions].sort((a, b) => a.label.localeCompare(b.label));
});

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Functions
const saveEquipment = () => {
  console.log("Equipment Saved");

  $q.notify({
    html: true,
    message: `<strong>Success!</strong> Equipment added successfully.`,
    position: "top-right",
    timeout: 2000,
    classes: "quasar-notification-success",
  });
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
