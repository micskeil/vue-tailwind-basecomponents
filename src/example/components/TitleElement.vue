<template>
  <div class="title">
    <component :is="component" class="title__text">
      <a :href="`#${id}`" class="title__anchor">#</a>
      <div class="title__text">
        <slot />
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  const props = defineProps({
    tag: {
      type: String,
      default: 'h2',
    },
    id: {
      type: String,
      required: true,
    },
  });

  const component = h(props.tag, { id: props.id });
</script>

<style lang="postcss" scoped>
  .title {
    @apply relative flex cursor-pointer flex-row items-center;

    &__anchor {
      @apply absolute -left-0 -translate-x-full pr-2 text-primary opacity-0
        transition-opacity duration-300;
    }

    &__text {
      @apply cursor-default;
    }

    &:hover {
      .title__anchor {
        @apply opacity-100;
      }
    }
  }
</style>
