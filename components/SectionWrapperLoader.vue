<template>
  <SectionWrapper>
    <template #header v-if="hasHeader">
      <div class="column">
        <div
          class="skeleton"
          style="margin-bottom: 26px; height: 100px; width: 100%"
        ></div>
      </div>
    </template>

    <template #default>
      <div class="row justify-between" style="gap: 50px; flex-wrap: nowrap">
        <div class="column" style="width: 100%">
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div class="skeleton" style="height: 105px; width: 100%"></div>
        </div>

        <div class="column" style="width: 100%">
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div class="skeleton" style="height: 40px; width: 100%"></div>
        </div>

        <div class="column" style="width: 100%">
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div
            class="skeleton"
            style="margin-bottom: 26px; height: 40px; width: 100%"
          ></div>
          <div class="skeleton" style="height: 105px; width: 100%"></div>
        </div>
      </div>
    </template>
  </SectionWrapper>
</template>

<script setup>
import SectionWrapper from "./SectionWrapper.vue";

defineProps({
  hasHeader: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
