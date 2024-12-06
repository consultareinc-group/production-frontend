<template>
  <SectionWrapper>
    <template #header>
      <div class="row justify-between items-center q-mb-lg">
        <h2 class="title">Material Details</h2>

        <q-spinner v-if="deleteMaterialLoading" size="24px" color="primary" />
        <q-btn
          v-else
          unelevated
          icon="delete"
          class="delete-icon"
          @click="deleteMaterial"
        />
      </div>
    </template>

    <template #default>
      <div class="row justify-between">
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField
            v-model="materialDetails.material_name"
            id="material_name"
            label="Material Name"
            is-required
          >
            <q-icon name="search" size="24px" color="black" />
          </InputField>

          <InputField
            v-model="materialDetails.description"
            id="description"
            label="Description"
            type="textarea"
          />
          <InputField
            v-model="materialDetails.uom"
            id="uom"
            label="UOM"
            is-required
          />
        </div>
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField
            v-model="materialDetails.lot_number"
            id="lot_number"
            label="Lot Number"
            is-required
          />
          <InputField
            v-model="materialDetails.amount"
            id="amount"
            label="Amount"
            is-required
            type="number"
          />
          <InputField
            v-model="materialDetails.batch"
            id="batch"
            label="Batch"
            type="number"
          />
        </div>
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField
            v-model="materialDetails.amount_issued_date_time"
            id="amount_issued_date_time"
            label="Amount Issued Date & Time"
            is-required
            type="date"
          />
          <InputField
            v-model="materialDetails.pick_location"
            id="pick_location"
            label="Pick Location"
            is-required
          />
          <InputField
            v-model="materialDetails.supplier_name"
            id="supplier_name"
            label="Supplier Name"
            is-required
          >
            <q-icon name="search" size="24px" color="black" />
          </InputField>
        </div>
      </div>
    </template>
  </SectionWrapper>
</template>

<script setup>
import { px } from "../../../lib/utils";

import SectionWrapper from "../../../components/ui/SectionWrapper.vue";
import InputField from "../../../components/ui/InputField.vue";

import { useAddProductionPlan } from "../../../composables/useAddProductionPlan";

const emit = defineEmits(["delete"]);

const { deleteMaterialLoading, materialDetails } = useAddProductionPlan();

const deleteMaterial = () => {
  deleteMaterialLoading.value = true;
  setTimeout(() => {
    emit("delete");
    deleteMaterialLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
.title {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 0;
}

:deep(.q-field__control-container) {
  align-items: center;
}
</style>
