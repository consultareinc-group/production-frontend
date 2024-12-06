<template>
  <section class="container">
    <div v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <slot></slot>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  padding: 25px 47px 48px;
  background-color: #fff;
  margin-top: 59px;
}
</style>
