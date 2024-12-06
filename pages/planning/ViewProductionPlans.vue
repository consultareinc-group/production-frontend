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
          label: 'View Production Plans',
          to: { name: 'viewProductionPlans' },
        },
      ]"
    />

    <div class="add-button">
      <ButtonComponent :to="{ name: 'addProductionPlan' }"
        >Add New</ButtonComponent
      >
    </div>

    <div class="table-container">
      <ViewProductionPlansTable />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import ButtonComponent from "../../components/ui/ButtonComponent.vue";
import ViewProductionPlansTable from "./components/ViewProductionPlansTable.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
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
