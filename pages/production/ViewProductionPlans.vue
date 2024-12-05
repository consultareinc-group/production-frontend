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
          label: 'View Production Plans',
          to: { name: 'viewProductionPlans' },
        },
      ]"
    />

    <div class="add-button">
      <ButtonComponent>Add New</ButtonComponent>
    </div>

    <div class="table-container">
      <ViewProductionPlansTable />
    </div>
  </div>
</template>

<script setup>
import { px } from "src/lib/utils";
import { CONTAINER_PADDING_Y, CONTAINER_PADDING_X } from "../../lib/vars";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import ButtonComponent from "../../components/ui/ButtonComponent.vue";
import ViewProductionPlansTable from "../../components/production/ViewProductionPlansTable.vue";
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
</style>
