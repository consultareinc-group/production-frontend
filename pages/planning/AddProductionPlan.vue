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
          label: 'Add Production Plan',
          to: { name: 'addProductionPlan' },
        },
      ]"
    />
    <!-- Product Details -->
    <SectionWrapperLoader v-if="loading" class="q-mb-xl" />
    <SectionWrapper v-else class="q-mb-xl">
      <template #header>
        <h2 class="title">Product Details</h2>
        <p class="sub-title">
          Please fill out the required fields <span>*</span>
        </p>
      </template>

      <template #default>
        <div
          class="row justify-between"
          style="gap: 50px; flex-wrap: nowrap; height: 100%"
        >
          <div class="column q-gutter-y-md" style="width: 100%">
            <!-- batch number -->
            <div class="q-px-sm">
              <label>Batch Number <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.batch_number"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- product name -->
            <!-- using this for now since there is no API for the Product name selection yet -->
            <div class="q-px-sm">
              <label>Product Name <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.product_id"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <!-- <div class="q-px-sm">
              <label>Product Name <span class="text-red">*</span></label>
              <q-select
                use-input
                outlined
                dense
                v-model="productDetails.product_id"
                :options="searchOptions"
                option-label="title"
                option-value="id"
                input-debounce="500"
                hide-selected
                hide-dropdown-icon
                fill-input
                map-options
                emit-value
                @filter="filterOptions"
                :rules="[(val) => !!val || 'Field is required']"
                class="q-mt-sm"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-select>
            </div> -->

            <!-- description -->
            <div class="q-px-sm">
              <label>Description</label>
              <q-input
                outlined
                v-model="productDetails.description"
                type="textarea"
                dense
                class="q-mt-sm"
                input-style="height: 140px"
              />
            </div>
          </div>

          <!-- quantity -->
          <div class="column q-gutter-y-md" style="width: 100%">
            <div class="q-px-sm">
              <label>Quantity <span class="text-red">*</span></label>
              <q-input
                type="number"
                outlined
                v-model="productDetails.quantity"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- start date and time -->
            <div class="q-px-sm">
              <label>Start Date & Time <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.start_date_and_time"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="productDetails.start_date_and_time"
                        mask="YYYY-MM-DD HH:mm"
                        color="dark"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="productDetails.start_date_and_time"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                        color="dark"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- end date and time -->
            <div class="q-px-sm">
              <label>End Date & Time <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.end_date_and_time"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="productDetails.end_date_and_time"
                        mask="YYYY-MM-DD HH:mm"
                        color="dark"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="productDetails.end_date_and_time"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                        color="dark"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- customer -->
            <div class="q-px-sm">
              <label>Customer <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.customer_name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>

          <!-- purchase order number -->
          <div class="column" :style="{ gap: '18px', width: '100%' }">
            <div class="q-px-sm">
              <label
                >Purchase Order Number <span class="text-red">*</span></label
              >
              <q-input
                outlined
                v-model="productDetails.purchase_order_number"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- sales order number -->
            <div class="q-px-sm">
              <label>Sales Order Number <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="productDetails.sales_order_number"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <!-- comments/notes -->
            <div class="col-3 q-px-sm">
              <label>Comments/Notes</label>
              <q-input
                outlined
                v-model="productDetails.comments_notes"
                type="textarea"
                dense
                class="q-mt-sm"
                input-style="height: 140px"
              />
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <!-- Material Details -->
    <SectionWrapperLoader v-if="loading" class="q-mb-xl" />
    <div v-else>
      <div
        v-for="(material, index) in materialDetails"
        :key="material.key"
        class="q-mb-xl"
      >
        <SectionWrapper>
          <template #header>
            <div class="row justify-between items-center q-mb-lg">
              <h2 class="title">Material Details</h2>

              <q-btn
                v-if="index !== 0"
                unelevated
                icon="delete"
                class="delete-icon"
                @click="openDeleteDialog(material.key)"
              />
            </div>
          </template>

          <template #default>
            <div
              class="row justify-between"
              style="gap: 50px; flex-wrap: nowrap"
            >
              <div class="column" style="gap: 18px; width: 100%">
                <!-- material name -->
                <div class="q-px-sm">
                  <label>Material Name <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="material.material_id"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>

                <!-- description -->
                <div class="q-px-sm">
                  <label>Description</label>
                  <q-input
                    outlined
                    v-model="material.description"
                    type="textarea"
                    dense
                    class="q-mt-sm"
                    input-style="height: 140px"
                  />
                </div>

                <!-- uom -->
                <div class="q-px-sm">
                  <label>UOM <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="material.uom"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
              </div>
              <div class="column" style="gap: 18px; width: 100%">
                <!-- lot number -->
                <div class="q-px-sm">
                  <label>Lot Number <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="material.lot_number"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>

                <!-- amount -->
                <div class="q-px-sm">
                  <label>Amount <span class="text-red">*</span></label>
                  <q-input
                    type="number"
                    outlined
                    v-model="material.amount"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>

                <!-- batch -->
                <div class="q-px-sm">
                  <label>Batch <span class="text-red">*</span></label>
                  <q-input
                    type="number"
                    outlined
                    v-model="material.batch"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
              </div>

              <div class="column" style="gap: 18px; width: 100%">
                <!-- amount issued date and time -->
                <div class="q-px-sm">
                  <label
                    >Amount Issued Date & Time
                    <span class="text-red">*</span></label
                  >
                  <q-input
                    outlined
                    v-model="material.amount_issued_date_and_time"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="material.amount_issued_date_and_time"
                            mask="YYYY-MM-DD HH:mm"
                            color="dark"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="material.amount_issued_date_and_time"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                            color="dark"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <!-- pick location -->
                <div class="q-px-sm">
                  <label>Pick Location <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="material.pick_location"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>

                <!-- Supplier Name -->
                <div class="q-px-sm">
                  <label>Supplier Name <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    v-model="material.supplier_id"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
              </div>
            </div>
          </template>
        </SectionWrapper>
      </div>
    </div>
    <SectionWrapperLoader v-if="addMaterialLoading" class="q-mb-xl" />

    <q-dialog v-model="deleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="deleteDialog = false"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to remove this material?
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
            @click="deleteMaterial(selectedMaterial.key)"
            :disable="deleteMaterialLoading"
          >
            <q-spinner v-if="deleteMaterialLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Action Buttons -->
    <div>
      <q-btn @click="addMaterial" no-caps flat class="bg-primary text-white">
        <q-spinner
          v-if="addMaterialLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Material
      </q-btn>
    </div>

    <div>
      <q-btn
        @click="saveProductionPlan"
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
import { ref, onMounted } from "vue";
// import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useProductionPlanStore } from "../../stores/production-plan-store";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const productionPlanStore = useProductionPlanStore();
const $q = useQuasar();
const router = useRouter();

const loading = ref(false);
const addMaterialLoading = ref(false);
const deleteMaterialLoading = ref(false);

// let searchOptions = ref([]);

const productDetails = ref({
  batch_number: null,
  product_id: null,
  description: null,
  quantity: null,
  start_date_and_time: null,
  end_date_and_time: null,
  customer_name: null,
  purchase_order_number: null,
  sales_order_number: null,
  comments_notes: null,
});

const materialDetails = ref([
  {
    key: Date.now(),
    material_id: null,
    description: null,
    uom: null,
    lot_number: null,
    amount: null,
    batch: null,
    amount_issued_date_and_time: null,
    pick_location: null,
    supplier_id: null,
  },
]);

const deleteDialog = ref(false);
const selectedMaterial = ref(null);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Functions
const addMaterial = () => {
  addMaterialLoading.value = true;
  setTimeout(() => {
    materialDetails.value.push({
      key: Date.now(),
      material_id: null,
      description: null,
      uom: null,
      lot_number: null,
      amount: null,
      batch: null,
      amount_issued_date_and_time: null,
      pick_location: null,
      supplier_id: null,
    });
    addMaterialLoading.value = false;
  }, 1000);
};

const openDeleteDialog = (materialKey) => {
  deleteDialog.value = true;
  selectedMaterial.value = materialDetails.value.find(
    (material) => material.key === materialKey
  );
};

const deleteMaterial = (key) => {
  deleteMaterialLoading.value = true;
  setTimeout(() => {
    materialDetails.value = materialDetails.value.filter(
      (material) => material.key !== key
    );

    deleteMaterialLoading.value = false;
    deleteDialog.value = false;
    selectedMaterial.value = null;
  }, 1000);
};

const saveProductionPlan = () => {
  const requiredFields = [
    productDetails.value.batch_number,
    productDetails.value.product_id,
    productDetails.value.quantity,
    productDetails.value.start_date_and_time,
    productDetails.value.end_date_and_time,
    productDetails.value.customer_name,
    productDetails.value.purchase_order_number,
    productDetails.value.sales_order_number,
  ];

  const materialRequiredFields = materialDetails.value.every(
    (material) =>
      material.material_id &&
      material.uom &&
      material.lot_number &&
      material.amount &&
      material.batch &&
      material.amount_issued_date_and_time &&
      material.pick_location &&
      material.supplier_id
  );

  if (requiredFields.includes(null) || !materialRequiredFields) {
    $q.notify({
      html: true,
      message: `<strong>Error!</strong> Please fill out all required fields.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-error",
    });
    return;
  }

  const payload = {
    ...productDetails.value,
    material_details: materialDetails.value.map(({ key, ...rest }) => rest),
  };

  productionPlanStore
    .AddProductionPlan({ payload })
    .then(() => {
      $q.notify({
        html: true,
        message: `<strong>Success!</strong> Production plan added successfully.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-success",
      });

      router.push({ name: "viewProductionPlans" });
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Failed to add production plan.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-error",
      });
    });
};

// const filterOptions = (val, update, abort) => {
//   if (val) {
//     axios
//       .get(`https://jsonplaceholder.typicode.com/todos?title_like=${val}`)
//       .then((response) => {
//         if (response.status === 200) {
//           update(() => {
//             searchOptions.value = response.data;
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 44px;
}

.title {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 0;
}

.sub-title {
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #878787;
  margin-top: 8px;

  span {
    color: red;
  }
}

:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
