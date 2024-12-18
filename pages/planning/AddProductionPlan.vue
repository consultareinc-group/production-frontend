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
            <div class="q-px-sm">
              <label>Product Name <span class="text-red">*</span></label>
              <q-select
                use-input
                outlined
                dense
                v-model="productDetails.product_name"
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
            </div>

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
                v-model="productDetails.start_date_time"
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
                        v-model="productDetails.start_date_time"
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
                        v-model="productDetails.start_date_time"
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
                v-model="productDetails.end_date_time"
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
                        v-model="productDetails.end_date_time"
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
                        v-model="productDetails.end_date_time"
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
                v-model="productDetails.customer"
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
                v-model="productDetails.comment_notes"
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

    <SectionWrapperLoader v-if="loading" class="q-mb-xl" />

    <div v-else>
      <AddMaterialDetails is-first class="q-mb-xl" />
      <div v-for="material in materials" :key="material.id" class="q-mb-xl">
        <AddMaterialDetails @delete="deleteMaterial(material.id)" />
      </div>
    </div>
    <SectionWrapperLoader v-if="addMaterialLoading" class="q-mb-xl" />

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
// For demonstration purposes only, please use the API from axios.js in real tasks.
import axios from "axios";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";
import AddMaterialDetails from "./components/AddMaterialDetails.vue";

import { useAddProductionPlan } from "../../composables/useAddProductionPlan";

const {
  loading,
  addMaterialLoading,
  productDetails,
  materials,
  addMaterial,
  deleteMaterial,
  saveProductionPlan,
} = useAddProductionPlan();

let searchOptions = ref([]);

// Filter options based on user input
const filterOptions = (val, update, abort) => {
  if (val) {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?title_like=${val}`)
      .then((response) => {
        if (response.status === 200) {
          update(() => {
            searchOptions.value = response.data;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
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
