<template>
  <section class="container">
    <PageBreadcrumbs
      title="Production Planning"
      :items="[
        {
          label: 'Production Planning',
        },
        {
          label: 'View Production Plans',
          to: { name: 'planning' },
        },
      ]"
    />

    <div class="add-button">
      <ButtonComponent>Add New</ButtonComponent>
    </div>

    <div class="table-container">
      <TableComponent
        :rowsPerPage="pagination.rowsPerPage"
        :filter="filter"
        @update:rowsPerPage="(val) => (pagination.rowsPerPage = val)"
      >
        <template #header>
          <div class="table-toolbar">
            <div class="items">
              <span>Show</span>
              <q-select
                v-model="pagination.rowsPerPage"
                :options="[3, 5, 10, 20, 50]"
                outlined
                class="select bg-white"
              />
            </div>

            <div class="search">
              <span>Search</span>
              <q-input v-model="filter" outlined dense class="bg-white" />
            </div>
          </div>
        </template>
      </TableComponent>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import ButtonComponent from "../components/ui/ButtonComponent.vue";
import TableComponent from "../components/ui/TableComponent.vue";

const pagination = ref({
  rowsPerPage: 5,
});

const filter = ref("");
</script>

<style lang="scss" scoped>
.container {
  padding: 36px 43px;
}

.add-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

.table-container {
  margin-top: 44px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;

  .items {
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
    }
  }

  .search {
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
    }

    .q-input {
      width: 184px;
      height: 29px;
    }
  }
}

:deep(
    .q-field--auto-height .q-field__control,
    .q-field--auto-height .q-field__native
  ) {
  min-height: 29px;
}

:deep(.q-field--dense .q-field__control, .q-field--dense .q-field__marginal) {
  height: 29px;
}

:deep(.q-field__marginal) {
  height: 29px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 0;
}

:deep(.q-field__native) {
  min-height: 29px !important;
}
</style>
