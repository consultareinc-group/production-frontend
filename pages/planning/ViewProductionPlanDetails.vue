<template>
  <div
    :style="{ margin: `${px(CONTAINER_PADDING_Y)} ${px(CONTAINER_PADDING_X)}` }"
  >
    <PageBreadcrumbs
      title="Production Planning"
      :items="[
        {
          label: 'Production Planning',
          to: { name: 'viewProductionPlans' },
        },
        {
          label: 'View Production Plan Details',
          to: { name: 'viewProductionPlanDetails' },
        },
      ]"
    />

    <SectionWrapperLoader v-if="loading" has-header />

    <SectionWrapper v-else>
      <template #header>
        <h2 class="title">Product Details</h2>
        <SelectComponent
          label="Status:"
          :options-array="selectOptions"
          :style="{ 'margin-bottom': px(23) }"
        />
      </template>

      <template #default>
        <div class="row justify-between">
          <div class="column" :style="{ width: px(303) }">
            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Batch Number:
              </h3>
              <p class="value">{{ route.params.id }}</p>
            </div>

            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Product Name:
              </h3>
              <p class="value">Product C - PT10003</p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Batch Number:
              </h3>
              <p class="value">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>

          <div class="column" :style="{ width: px(303) }">
            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Quantity:
              </h3>
              <p class="value">20</p>
            </div>

            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Start Date & Time:
              </h3>
              <p class="value">August 13, 2024 8:00 AM</p>
            </div>

            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                End Date & Time:
              </h3>
              <p class="value">August 14, 2024 5:00 AM</p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Customer:
              </h3>
              <p class="value">Doe, John</p>
            </div>
          </div>

          <div class="column" :style="{ width: px(303) }">
            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Purchase Order Number:
              </h3>
              <p class="value">PO-0003</p>
            </div>

            <div :style="{ 'margin-bottom': px(26) }">
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Sales Order Number::
              </h3>
              <p class="value">SO-0003</p>
            </div>

            <div>
              <h3 style="margin: 0; line-height: 1.5rem" class="header">
                Comments/Notes::
              </h3>
              <p class="value">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <section class="q-mt-xl">
      <MaterialDetailsTable />
    </section>

    <section class="q-mt-xl">
      <ActivityLogsTable />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { px } from "../../lib/utils";
import { CONTAINER_PADDING_Y, CONTAINER_PADDING_X } from "../../lib/vars";

import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SelectComponent from "../../components/ui/SelectComponent.vue";
import MaterialDetailsTable from "./components/MaterialDetailsTable.vue";
import ActivityLogsTable from "./components/ActivityLogsTable.vue";
import SectionWrapper from "../../components/ui/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/ui/SectionWrapperLoader.vue";

const route = useRoute();
const loading = ref(false);

const selectOptions = ref([
  "Pending",
  "Verified",
  "In Progress",
  "On Hold",
  "Completed",
  "Closed",
  "Canceled",
  "Delayed",
]);

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style lang="scss" scoped>
.title {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 42px;
  line-height: 0;
}

.header {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.value {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  margin: 0;
}
</style>
