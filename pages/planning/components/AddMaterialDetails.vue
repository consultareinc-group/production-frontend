<template>
  <div>
    <SectionWrapper>
      <template #header>
        <div class="row justify-between items-center q-mb-lg">
          <h2 class="title">Material Details</h2>

          <q-btn
            unelevated
            icon="delete"
            class="delete-icon"
            @click="openDeleteDialog"
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
          Are you sure you want to delete this material from the production
          plan?
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <span class="text-bold">Material Name: </span> Material B - MT100002
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
            @click="deleteMaterial"
            :disable="deleteMaterialLoading"
          >
            <q-spinner v-if="deleteMaterialLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { px } from "../../../lib/utils";

import SectionWrapper from "../../../components/ui/SectionWrapper.vue";
import InputField from "../../../components/ui/InputField.vue";

import { useAddProductionPlan } from "../../../composables/useAddProductionPlan";

const emit = defineEmits(["delete"]);

const { deleteMaterialLoading, materialDetails } = useAddProductionPlan();

const deleteDialog = ref(false);

const openDeleteDialog = () => {
  deleteDialog.value = true;
};

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
