<template>
  <div
    :style="{ margin: `${px(CONTAINER_PADDING_Y)} ${px(CONTAINER_PADDING_X)}` }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { px } from "../lib/utils";
import { CONTAINER_PADDING_Y, CONTAINER_PADDING_X } from "../lib/vars";
</script>

<style lang="scss" scoped></style>
