<template>
  <MainLayout>
    <TitleElement id="button" tag="h1"> Button Component </TitleElement>

    <ParagraphElement>
      <div class="buttons">
        <BaseButton label="button 1" icon="frog" />
        <BaseButton label="button 2" />
        <BaseButton label="button 3" />
        <BaseButton label="button 4" />
        <BaseButton label="button 5" />
        <BaseButton label="button 6" />
      </div>
    </ParagraphElement>
  </MainLayout>
</template>

<script setup lang="ts">
  import ParagraphElement from '../components/ParagraphElement.vue';
  import TitleElement from '../components/TitleElement.vue';
</script>

<style lang="postcss" scoped>
  .buttons {
    @apply flex w-full flex-row items-center justify-around gap-8;
  }
</style>
