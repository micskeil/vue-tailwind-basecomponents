<template>
  <div class="paragraph">
    <slot/>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
.paragraph {
  @apply flex flex-col items-start justify-start mb-8 gap-8 leading-6;
}

</style>
