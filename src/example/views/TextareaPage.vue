<template>
  <MainLayout>
    <div>
      <TitleElement id="textarea" tag="h1">Textarea</TitleElement>
      <ParagraphElement>
        The Textarea component is a custom text area input component that provides a character counter and the ability
        to limit the number of characters entered.
      </ParagraphElement>
    </div>
    <BaseTextarea v-model="value" :max-chars="maxChars" height="120px" />

    <BaseButton label="Send" :loading="loading" />
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '../layouts/MainLayout.vue';
  import { ref, watch } from 'vue';

  const value = ref('');
  const maxChars = 160;

  const loading = ref(false);

  watch(
    loading,
    (v) => {
      setTimeout(() => {
        loading.value = !v;
      }, 3000);
    },
    {
      immediate: true,
    }
  );
</script>

<style lang="postcss" scoped>
  .textarea-container {
    @apply h-40;
  }
</style>
