<template>
  <VInputContainer
    element-type="input"
    :class="{ 'full-width': block, focused: isFocused }"
  >
    <label v-if="label" :for="inputRef?.id" class="vb-input__label">
      {{ label }}
    </label>
    <div class="vb-input" :class="{ focused: isFocused }">
      <div class="vb-input__prepend">
        <slot name="prepend" />
      </div>
      <input
        ref="inputRef"
        v-model="value"
        v-bind="$attrs"
        class="vb-input__native"
        :class="{
          'vb-input__native--error': hasError,
          'vb-input__native--focused': isFocused,
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="vb-input__append">
        <slot name="append" />
      </div>
    </div>
    <div v-if="!hideDetails" class="details">
      <div v-for="message in allMessages" :key="message" class="details__message">
        {{ message }}
      </div>
    </div>
  </VInputContainer>
</template>

<script setup lang="ts">
  import VInputContainer from './VInputContainer.vue';
  import { eagerComputed } from '@vueuse/core';
  import { computed, defineComponent, ref, watchEffect } from 'vue';
  import type { PropType } from 'vue';

  type inputRule = (value: string | number) => boolean | string;

  // The native input element inherits all attributes from parent component,
  // like placeholder, type, etc.
  defineComponent({
    inheritAttrs: false,
  });

  const props = defineProps({
    /**
     * The value of the input.
     * This is a two-way binding.
     * INFO: Do not use defineModel() here, because we need extra logic in the computed.
     */
    modelValue: {
      type: [String, Number],
      required: true,
    },
    /**
     * The label of the input.
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The rules to validate the input.
     * These are functions that return true if the input is valid,
     * false or a string with the error message if the input is invalid.
     */
    rules: {
      type: Array as PropType<inputRule[]>,
      default: () => [],
    },
    /**
     * When to validate the input.
     * @default blur
     */
    validateOn: {
      type: String as PropType<'blur' | 'change'>,
      default: 'blur',
    },
    /** To hide the details section with v-if. */
    hideDetails: {
      type: Boolean,
      default: false,
    },
    /** The messages to display in the details section. */
    messages: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /** Whether the input should autofocus. */
    autofocus: {
      type: Boolean,
      default: false,
    },
    /** Whether the input should be full width, so block. */
    block: {
      type: Boolean,
      default: false,
    },
  });

  const inputRef = ref<HTMLInputElement | null>(null);

  const isBlurHappened = ref(false);
  const isChangeHappened = ref(false);

  const emit = defineEmits({ 'update:modelValue': (_v: string | number) => true });

  const value = computed({
    get: () => props.modelValue,
    set: (v) => {
      emit('update:modelValue', v);
      isChangeHappened.value = true;
    },
  });

  const errorMessages = computed((): Array<string> => {
    const messages = [] as Array<string>;
    if (props.validateOn === 'change' && isChangeHappened.value === false) {
      return messages;
    }
    if (props.validateOn === 'blur' && isBlurHappened.value === false) {
      return messages;
    }
    if (props.rules.length === 0) {
      return messages;
    }
    props.rules.forEach((rule) => {
      const result = rule(value.value);
      if (result !== true && typeof result === 'string') {
        messages.unshift(result);
      }
    });
    return messages;
  });

  // eagerComputed() is used here, because we need to update the computed ASAP not to wait one tick.
  const allMessages = eagerComputed(() => [...props.messages, ...errorMessages.value]);

  /**
   * Reactive variable to check if the input has an error.
   */
  const hasError = computed(() => {
    return props.validateOn === 'change'
      ? isChangeHappened.value && validate() === false
      : isBlurHappened.value && validate() === false;
  });

  /**
   * Exposed function to validate the input according to the rules prop.
   */
  function validate({ silent } = { silent: false }): boolean {
    if (props.rules.length === 0) {
      return true;
    }
    if (silent === false) {
      props.validateOn === 'blur'
        ? (isBlurHappened.value = true)
        : (isChangeHappened.value = true);
    }

    return props.rules.every((rule) => rule(value.value) === true);
  }

  // Expose the validate function to be used directly outside the component.
  defineExpose({ validate });

  const isFocused = ref(false);
  const handleFocus = () => {
    isFocused.value = true;
  };
  const handleBlur = () => {
    isFocused.value = false;
    isBlurHappened.value = true;
  };

  /**
   * Focus the input if props.autofocus is true.
   */
  watchEffect(() => {
    if (props.autofocus && inputRef.value) {
      inputRef.value.focus();
    }
  });
</script>

<style lang="postcss" scoped>
  .vb-input {
    @apply flex items-center;
  }
</style>
