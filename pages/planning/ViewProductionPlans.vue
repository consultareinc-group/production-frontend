<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Production Planning"
      :items="[
        {
          label: 'Production Planning',
        },
        {
          label: 'View Production Plans',
          to: { name: 'viewProductionPlans' },
        },
      ]"
    />

    <div class="action-buttons">
      <ButtonComponent color="white" text-color="black" outline
        >Archives</ButtonComponent
      >
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
.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
  gap: 20px;
}

.table-container {
  margin-top: 44px;
}
</style>
