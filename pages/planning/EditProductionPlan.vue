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
          label: 'Edit Production Plan',
          to: { name: 'editProductionPlans' },
        },
      ]"
      class="q-mb-xl"
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
          :style="{
            gap: px(50),
            flexWrap: 'nowrap',
          }"
        >
          <div class="column" :style="{ width: '100%', gap: px(18) }">
            <InputField
              v-model="route.params.id"
              id="batch_number"
              label="Batch Number"
              is-required
              type="number"
              disable
            />
            <InputField
              v-model="productDetails.product_name"
              id="product_name"
              label="Product Name"
              is-required
            />
            <InputField
              v-model="productDetails.description"
              id="description"
              label="Description"
              type="textarea"
            />
          </div>

          <div class="column" :style="{ width: '100%', gap: px(18) }">
            <InputField
              v-model="productDetails.quantity"
              id="quantity"
              label="Quantity"
              is-required
              type="number"
            />
            <InputField
              v-model="productDetails.start_date_time"
              id="start_date_time"
              label="Start Date & Time"
              is-required
              type="date"
            />
            <InputField
              v-model="productDetails.end_date_time"
              id="end_date_time"
              label="End Date & Time"
              is-required
              type="date"
            />
            <InputField id="customer" label="Customer" is-required />
          </div>

          <div class="column" :style="{ width: '100%', gap: px(18) }">
            <InputField
              v-model="productDetails.purchase_order_number"
              id="purchase_order_number"
              label="Purchase Order Number"
              is-required
            />
            <InputField
              v-model="productDetails.sales_order_number"
              id="sales_order_number"
              label="Sales Order Number"
              is-required
            />
            <InputField
              v-model="productDetails.comment_notes"
              id="comment_notes"
              label="Comments/Notes"
              type="textarea"
            />
          </div>
        </div>
      </template>
    </SectionWrapper>

    <SectionWrapperLoader v-if="loading" />
    <div v-else>
      <div v-for="material in materials" :key="material.id" class="q-mb-xl">
        <AddMaterialDetails @delete="deleteMaterial(material.id)" />
      </div>
    </div>
    <SectionWrapperLoader v-if="addMaterialLoading" class="q-mb-xl" />

    <div>
      <ButtonComponent @click="addMaterial" class="q-mt-xl">
        <q-spinner
          v-if="addMaterialLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Material
      </ButtonComponent>
    </div>

    <div>
      <ButtonComponent
        @click="saveProductionPlan"
        class="q-mt-xl"
        color="positive"
        :style="{
          width: px(322),
          height: px(48),
          'font-size': px(16),
          'font-weight': 700,
        }"
      >
        Update
      </ButtonComponent>
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted } from "vue";
import { px } from "../../lib/utils";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/ui/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/ui/SectionWrapperLoader.vue";
import InputField from "../../components/ui/InputField.vue";
import AddMaterialDetails from "./components/AddMaterialDetails.vue";
import ButtonComponent from "../../components/ui/ButtonComponent.vue";

import { useAddProductionPlan } from "../../composables/useAddProductionPlan";
import { useRoute } from "vue-router";

const route = useRoute();

const {
  loading,
  addMaterialLoading,
  productDetails,
  materials,
  addMaterial,
  deleteMaterial,
  saveProductionPlan,
} = useAddProductionPlan();

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

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
</style>
