<template>
  <div class="vb-input-container" :class="`vb-${elementType}-container`">
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
  .vb-input-container {
    @apply flex items-center justify-start border-2;

    &:has(.error) {
      @apply border-red-600;
    }

    &:has(.focused) {
      @apply border-primary;
    }
  }
</style>
