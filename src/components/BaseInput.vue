<template>
  <InputContainer element-type="input">
    <div class="input">
      <div class="input__prepend">
        <slot name="prepend" />
      </div>
      <input
        v-model="value"
        type="text"
        placeholder="Your text goes here..."
        class="input__native"
        :class="{
          'input__native--error': hasError,
          focused: isFocused,
          error: hasError,
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="input__append">
        <slot name="append" />
      </div>
    </div>
    <div v-if="!hideDetails" class="details">
      <div v-for="message in messages" :key="message" class="details__message">
        {{ message }}
      </div>
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
  import InputContainer from './InputContainer.vue';
  import { computed, ref } from 'vue';
  import type { PropType } from 'vue';

  type inputRule = (value: string) => boolean | string;

  const props = defineProps({
    /**
     * The value of the input.
     * This is a two-way binding.
     */
    modelValue: {
      type: String,
      required: true,
    },
    rules: {
      type: Array as PropType<inputRule[]>,
      default: () => [],
    },
    /**
     * To hide the details section with v-if.
     */
    hideDetails: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits({ 'update:modelValue': (_v: string) => true });

  const value = computed({
    get: () => props.modelValue,
    set: (v) => {
      emit('update:modelValue', v);
    },
  });

  const hasError = computed((): boolean => {
    if (props.rules.length === 0) {
      return false;
    }
    props.rules.forEach((rule) => {
      if (rule(value.value) !== true) {
        return true;
      }
    });
    return false;
  });

  const messages = computed((): Array<string> => {
    const messages = [...props.messages] as Array<string>;
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

  const isFocused = ref(false);
  const handleFocus = () => {
    isFocused.value = true;
  };
  const handleBlur = () => {
    isFocused.value = false;
  };
</script>

<style lang="postcss" scoped></style>
