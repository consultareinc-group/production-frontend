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
        <div class="row justify-between">
          <div class="column" :style="{ width: px(303), gap: px(18) }">
            <InputField id="batchNumber" label="Batch Number" is-required />
            <InputField id="productName" label="Product Name" is-required />
            <InputField id="description" label="Description" type="textarea" />
          </div>
          <div class="column" :style="{ width: px(303), gap: px(18) }">
            <InputField id="quantity" label="Quantity" is-required />
            <InputField
              id="startDateTime"
              label="Start Date & Time"
              is-required
              type="date"
            />
            <InputField
              id="endDateTime"
              label="End Date & Time"
              is-required
              type="date"
            />
            <InputField id="customer" label="Customer" is-required />
          </div>
          <div class="column" :style="{ width: px(303), gap: px(18) }">
            <InputField
              id="purchaseOrderNumber"
              label="Purchase Order Number"
              is-required
            />
            <InputField
              id="salesOrderNumber"
              label="Sales Order Number"
              is-required
            />
            <InputField
              id="commentsNotes"
              label="Comments/Notes"
              type="textarea"
            />
          </div>
        </div>
      </template>
    </SectionWrapper>

    <SectionWrapperLoader v-if="loading" />
    <div v-else>
      <div v-for="(material, index) in materials" :key="index" class="q-mb-xl">
        <AddMaterialDetails :material="material" />
      </div>
    </div>
    <SectionWrapperLoader v-if="addMaterialLoading" class="q-mb-xl" />

    <div>
      <ButtonComponent @click="addMaterialComponent" class="q-mt-xl"
        >Add Material</ButtonComponent
      >
    </div>

    <div>
      <ButtonComponent
        class="q-mt-xl"
        color="positive"
        :style="{
          width: px(322),
          height: px(48),
          'font-size': px(16),
          'font-weight': 700,
        }"
      >
        Save
      </ButtonComponent>
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { px } from "../../lib/utils";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/ui/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/ui/SectionWrapperLoader.vue";
import InputField from "../../components/ui/InputField.vue";
import AddMaterialDetails from "./components/AddMaterialDetails.vue";
import ButtonComponent from "../../components/ui/ButtonComponent.vue";

const loading = ref(false);

const materials = ref([{}]);
const addMaterialLoading = ref(false);

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

const addMaterialComponent = () => {
  addMaterialLoading.value = true;
  setTimeout(() => {
    materials.value.push({});
    addMaterialLoading.value = false;
  }, 2000);
};
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
