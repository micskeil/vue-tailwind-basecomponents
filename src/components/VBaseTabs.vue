<template>
  <div class="vb-tabs">
    <div class="vb-tabs__header">
      <VBaseButton
        v-for="tab in tabs"
        :key="tab.id"
        class="vb-tabs__tab"
        :class="{
          'vb-tabs__tab--active': tab.id === modelValue,
        }"
        :label="tab.label"
        :is-loading="tab.isLoading"
        @click="modelValue = tab.id"
      >
      </VBaseButton>
    </div>
    <div class="vb-tabs__content">
      <slot :active-tab="modelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import VBaseButton from './VBaseButton.vue';
  import type { PropType } from 'vue';

  export type Tab = {
    id: string;
    label: string;
    prependIcon?: string;
    appendIcon?: string;
    isLoading?: boolean;
  };

  defineProps({
    tabs: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
  });

  const modelValue = defineModel<string>();
</script>

<style lang="postcss" scoped>
  .vb-tabs {
    @apply flex max-h-full flex-col;

    &__header {
      @apply top-0 flex flex-row;
    }
  }
</style>
