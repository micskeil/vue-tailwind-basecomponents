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
