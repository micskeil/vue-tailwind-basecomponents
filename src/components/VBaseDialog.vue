<template>
  <dialog
    v-if="modelValue"
    ref="dialogRef"
    data-modal
    class="vb-dialog"
    :class="{ [`vb-dialog--${appearance}`]: appearance }"
    @close="modelValue = false"
  >
    <div class="vb-dialog__header">
      <slot name="header">
        <h2 class="vb-dialog__title">{{ title }}</h2>
        <button class="vb-dialog__close" @click="modelValue = false">
          <VBaseIcon icon="close" label="close" />
        </button>
      </slot>
    </div>
    <div class="vb-dialog__content">
      <slot />
    </div>
    <div class="vb-dialog__footer">
      <slot name="footer">
        <VBaseButton
          v-if="primaryLabel"
          class="footer-primary"
          :label="primaryLabel"
          @click="handlePrimaryClick"
        />
        <VBaseButton
          v-if="secondaryLabel"
          class="footer-secondary"
          :disabled="disabled"
          :label="secondaryLabel"
          @click="handleSecondaryClick"
        />
      </slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import VBaseButton from '@/components/VBaseButton.vue';
  import VBaseIcon from '@/components/VBaseIcon.vue';
  import { watchEffect, ref } from 'vue';

  defineProps({
    title: {
      type: String,
      default: undefined,
    },
    primaryLabel: {
      type: String,
      default: undefined,
    },
    secondaryLabel: {
      type: String,
      default: undefined,
    },
    appearance: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const dialogRef = ref<HTMLDialogElement | null>(null);

  const modelValue = defineModel<Boolean>({ required: true });

  const emit = defineEmits({
    'click:primary': () => true,
    'click:secondary': () => true,
  });

  watchEffect(() => {
    modelValue.value ? dialogRef.value?.showModal() : dialogRef.value?.close();
  });

  /**
   * Handles the click on the primary button.
   */
  const handlePrimaryClick = () => {
    emit('click:primary');
    modelValue.value = false;
  };

  /**
   * Handles the click on the secondary button.
   */
  const handleSecondaryClick = () => {
    emit('click:secondary');
    modelValue.value = false;
  };
</script>

<style lang="postcss" scoped>
  .vb-dialog {
    @apply m-auto flex-col gap-4 p-4;

    &::backdrop {
      @apply bg-black bg-opacity-50;
    }

    &__header {
      @apply flex items-center justify-between;
    }

    &__title {
      @apply text-lg font-semibold;
    }

    &__close {
      @apply hover:bg-gray-200;
    }

    &__content {
      @apply overflow-hidden;
    }

    &__footer {
      @apply flex items-end justify-around;
    }
  }
</style>
