<template>
  <SectionWrapper>
    <template #header>
      <div class="row justify-between items-center q-mb-lg">
        <h2 class="title">Material Details</h2>
        <q-btn unelevated icon="delete" class="delete-icon"></q-btn>
      </div>
    </template>

    <template #default>
      <div class="row justify-between">
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField id="material-name" label="Material Name" is-required>
            <q-icon name="search" size="24px" color="black" />
          </InputField>

          <InputField id="description" label="Description" type="textarea" />
          <InputField id="uom" label="UOM" is-required />
        </div>
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField id="lot-number" label="Lot Number" is-required />
          <InputField id="amount" label="Amount" is-required />
          <InputField id="batch" label="Batch" is-required />
        </div>
        <div class="column" :style="{ width: px(303), gap: px(18) }">
          <InputField
            id="amount-issued-date-time"
            label="Amount Issued Date & Time"
            is-required
          />
          <InputField id="pick-location" label="Pick Location" is-required />
          <InputField id="supplier-name" label="Supplier Name" is-required>
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

defineProps({
  material: {
    type: Object,
    default: () => ({}),
  },
});
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
