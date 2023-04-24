<template>
  <div class="paragraph">
    <slot/>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
.paragraph {
  @apply flex flex-col items-start justify-start my-4 first-of-type:mt-0 ;
}

</style>
