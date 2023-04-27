<template>
  <div class="paragraph">
    <slot />
  </div>
</template>

<script setup lang="ts">
  // ...
</script>

<style lang="postcss" scoped>
  .paragraph {
    @apply mb-8 gap-8 leading-6;
  }
</style>
