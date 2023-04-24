<template>
  <MainLayout>
    <div>
      <TitleElement id="textarea" tag="h1">Textarea</TitleElement>
      <ParagraphElement>
        The Textarea component is a custom text area input component that provides a character counter and the ability
        to limit the number of characters entered.
      </ParagraphElement>
    </div>
    <BaseTextarea v-model="value" :max-chars="maxChars" height="120px" :class="[containerClasses]" />

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

  const containerClasses = ref('textarea-container--style-1');
  // change every 3 seconds the containerClasses
  const styles = [
    'textarea-container--style-1',
    'textarea-container--style-2',
    'textarea-container--style-3',
    'textarea-container--style-4',
    'textarea-container--style-5',
  ];
  setInterval(() => {
    containerClasses.value = styles[Math.floor(Math.random() * styles.length)];
  }, 3000);
</script>

<style lang="postcss" scoped>
  .textarea-container {
    @apply transition-all duration-300 ease-in-out;
  }

  .textarea-container--style-1.textarea-container {
    @apply h-24 rounded;
    .textarea {
      @apply relative flex h-full flex-1 flex-col;

      &__native {
        @apply m-2 flex-1 resize-none overflow-hidden rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500;
      }
    }

    .details {
      @apply absolute bottom-0 mx-2 mb-2 flex items-center justify-start;

      &__counter {
        @apply ml-2 rounded-md px-2 py-1 text-xs font-bold text-white opacity-90;

        &:has(.warning) {
          @apply bg-yellow-400;
        }

        &:has(.error) {
          @apply bg-red-500;
        }
      }
    }
  }

  .textarea-container--style-2.textarea-container {
    @apply h-40 rounded-3xl border-4 border-gray-300 px-4;
    :deep(.textarea__native) {
      @apply text-lg text-red-600;
    }
  }

  .textarea-container--style-3.textarea-container {
    @apply border-none shadow-lg;
  }

  .textarea-container--style-4.textarea-container {
    @apply h-32 border-gray-200 shadow-2xl;
  }
  .textarea-container--style-5.textarea-container {
    @apply h-80 border-black;
  }
</style>
