<template>
  <button
    class="vb-button"
    :class="{
      [`vb-button--${appearance}`]: appearance,
      'vb-button--link': isLink,
      'vb-button--loading': isLoading,
    }"
    :route="route ? route : null"
    :ext-link="extLink ? extLink : null"
    :type="isLink ? undefined : type"
    :aria-label="label"
    :disabled="disabled || isLoading ? true : undefined"
    v-bind="$attrs"
  >
    <div v-if="isLoading" class="vb-button--loading">
      <slot name="loading" class="button--loading">
        <VBaseIcon icon="loading" />
      </slot>
    </div>
    <div
      class="vb-button__content"
      :class="{
        'vb-button__content--loading': isLoading,
      }"
    >
      <slot name="prepend" class="vb-button__prepend" />
      <span v-if="icon" class="button__icon">
        <VBaseIcon :icon="icon" />
      </span>
      <span v-else class="vb-button__label">{{ label }}</span>
      <slot name="append" class="vb-button__append" />
    </div>
  </button>
</template>

<script setup lang="ts">
  import VBaseIcon from './VBaseIcon.vue';
  import { computed } from 'vue';
  import type { PropType } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    /**
     * The label of the button.
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * The icon of the button. If set, the label will be replaced with the icon.
     */
    icon: {
      type: String,
      default: undefined,
    },
    /**
     * The type of the button.
     */
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    /**
     * The route to navigate to.
     */
    route: {
      type: Object as PropType<Location>,
      default: undefined,
    },
    /**
     * The external link to navigate to.
     */
    extLink: {
      type: String,
      default: undefined,
    },
    /**
     * The appearance of the button can be used to style the component.
     * target class is button--${appearance}
     */
    appearance: {
      type: String,
      default: undefined,
    },
    /**
     * Whether or not the button is loading.
     * If true, the button will be disabled and the label will be replaced with a loading spinner.
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether or not the button is disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const isLink = computed(() => {
    return props.route || props.extLink;
  });
</script>

<style lang="postcss" scoped>
  .vb-button {
    @apply relative cursor-pointer;

    &:disabled {
      @apply cursor-not-allowed;
    }

    .vb-button--loading {
      @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
      :deep(.icon) {
        @apply animate-spin;
      }
    }

    .vb-button__content--loading {
      @apply opacity-0;
    }
  }
</style>
