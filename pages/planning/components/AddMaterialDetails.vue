<template>
  <div>
    <SectionWrapper>
      <template #header>
        <div class="row justify-between items-center q-mb-lg">
          <h2 class="title">Material Details</h2>

          <q-btn
            v-if="!isFirst"
            unelevated
            icon="delete"
            class="delete-icon"
            @click="openDeleteDialog"
          />
        </div>
      </template>

      <template #default>
        <div class="row justify-between" style="gap: 50px; flex-wrap: nowrap">
          <div class="column" style="gap: 18px; width: 100%">
            <!-- material name -->
            <div class="q-px-sm">
              <label>Material Name <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="materialDetails.material_name"
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
                v-model="materialDetails.description"
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
                v-model="materialDetails.uom"
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
                v-model="materialDetails.lot_number"
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
                v-model="materialDetails.amount"
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
                v-model="materialDetails.batch"
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
                v-model="materialDetails.amount_issued_date_time"
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
                        v-model="materialDetails.amount_issued_date_time"
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
                        v-model="materialDetails.amount_issued_date_time"
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
                v-model="materialDetails.pick_location"
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
                v-model="materialDetails.supplier_name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
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

import SectionWrapper from "../../../components/SectionWrapper.vue";

import { useAddProductionPlan } from "../../../composables/useAddProductionPlan";

defineProps({
  isFirst: Boolean,
});

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
