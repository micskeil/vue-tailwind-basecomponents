<template>
  <InputContainer element-type="input">
    <div class="input">
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
        @keyup.enter="handleSend"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="!hideDetails" class="details">
        <div v-if="hasError | messages" class="details__content">
          <div v-for="message in hasError | messages" :key="message" class="details__message">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
  import InputContainer from './InputContainer.vue';
  import { computed } from 'vue';

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
      type: Array,
      default: () => [],
    },
    /**
     * To hide the details section with v-if.
     */
    hideDetails: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits({ 'update:modelValue': (_v: string) => true });

  const value = computed({
    get: () => props.modelValue,
    set: (v) => {
      emit('update:modelValue', v);
    },
  });
</script>

<style lang="postcss" scoped></style>
