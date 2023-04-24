<template>
  <div class="container" :class="`${elementType}-container`">
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    elementType: { type: String, required: true },
    height: { type: String, default: 'fit-content' },
  });
</script>

<style lang="postcss" scoped>
  .container {
    @apply flex items-center justify-start border-2 border-primary bg-white;

    &:has(.error) {
      @apply border-red-600;
    }

    &:has(.focused) {
      @apply border-primary-800;
    }
  }
</style>
