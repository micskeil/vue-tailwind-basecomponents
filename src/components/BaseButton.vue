<template>
  <button
    v-bind="$attrs"
    ref="buttonRef"
    role="button"
    class="button"
    :class="{
      [`button--${variant}`]: variant,
      'button--link': isLink,
    }"
    :route="route ? route : null"
    :ext-link="extLink ? extLink : null"
    :type="isLink ? undefined : type"
    :aria-label="label || 'button'"
    tabindex="0"
    :disabled="disabled || loading ? true : undefined"
  >
    <div class="button--loading">
      <slot v-if="loading" name="loading" class="button--loading">
        <BaseIcon icon="loading" />
      </slot>
    </div>
    <div
      class="button__content"
      :class="{
        'button__content--loading': loading,
      }"
    >
      <slot name="prepend" class="button__prepend" />
      <span v-if="icon" class="button__icon">
        <BaseIcon :icon="icon" />
      </span>
      <span v-else class="button__label">{{ label }}</span>
      <slot name="append" class="button__append" />
    </div>
  </button>
</template>

<script lang="ts">
  // use normal <script> to declare options and let native element inherit attrs
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { PropType } from 'vue';

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
     * The variant of the button can be used to style the component.
     * target class is button--${variant}
     */
    variant: {
      type: String,
      default: undefined,
    },
    /**
     * Whether or not the button is loading.
     * If true, the button will be disabled and the label will be replaced with a loading spinner.
     */
    loading: {
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

  const buttonRef = ref<HTMLButtonElement | null>(null);

  const isLink = computed(() => {
    return props.route || props.extLink;
  });
</script>

<style lang="postcss" scoped>
  .button {
    @apply relative flex w-fit cursor-pointer flex-row items-center justify-around
    bg-primary px-2 py-2 text-center
      transition-colors duration-300 ease-in-out;

    &:hover {
      @apply bg-primary-800;
    }

    &:active {
      @apply bg-primary;
    }

    &:disabled {
      @apply cursor-not-allowed bg-gray-300;
    }

    &:deep(.icon__native) {
      @apply !fill-white;
    }

    &__label {
      @apply mx-auto pb-[2px] leading-4 text-white;
    }

    &__icon {
      @apply mx-auto pb-[2px] leading-4 text-white;
    }

    &__prepend {
      @apply mr-2 flex flex-row items-center justify-center;
    }

    &__append {
      @apply ml-2 flex flex-row items-center justify-center;
    }
    .button--loading {
      @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
      :deep(.icon) {
        @apply animate-spin;
      }
    }

    .button__content--loading {
      @apply opacity-0;
    }
  }
</style>
