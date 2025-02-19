<template>
  <div class="q-pa-md">
    <page-breadcrumbs
      title="Page Title"
      :items="[
        {
          label: 'Menu Item',
          icon: 'link',
          to: { name: 'menu-item' },
        },
      ]"
    />
    <div class="col-grow items-center justify-center column">
      <span class="text-h4">Path: {{ route.path }}</span>
      <span class="text-h4">Name: {{ route.name }}</span>
    </div>
  </div>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRoute } from "vue-router";

const route = useRoute();

console.log(route.name);
</script>
