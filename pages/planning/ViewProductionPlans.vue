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

    <div class="row justify-end q-mt-lg q-gutter-x-md">
      <q-btn label="Archives" no-caps flat class="bg-accent text-white" />
      <q-btn
        label="Add New"
        no-caps
        flat
        class="bg-primary text-white"
        :to="{ name: 'addProductionPlan' }"
      />
    </div>

    <div class="q-mt-lg">
      <ViewProductionPlansTable />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import ViewProductionPlansTable from "./components/ViewProductionPlansTable.vue";
import MainContentWrapper from "../../components/MainContentWrapper.vue";
</script>

<style lang="scss" scoped></style>
