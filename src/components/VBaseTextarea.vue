<template>
  <VInputContainer element-type="textarea">
    <div class="vb-textarea">
      <textarea
        ref="textareaRef"
        v-model="value"
        :placeholder="$attrs.placeholder as string || 'Type here...'"
        class="vb-textarea__native"
        :class="{
          'vb-textarea__native--error': hasError,
          'vb-textarea__native--focused': isFocused,
          'vb-textarea__native--resizable': !noResize,
        }"
        v-bind="$attrs"
        spellcheck
        @keyup.enter="handleSend"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="details">
        <div v-if="maxChars" class="details__counter">
          <span
            :class="{
              warning: maxChars - value.length < 6,
              error: maxChars - value.length < 0,
            }"
          >
            {{ value.length }}
          </span>
          &nbsp;/ {{ maxChars }}
        </div>
      </div>
    </div>
  </VInputContainer>
</template>

<script setup lang="ts">
  import VInputContainer from './VInputContainer.vue';
  import { ref, computed, watch, onMounted } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    /**
     * The value of the textarea.
     * This is a two-way binding.
     */
    modelValue: {
      type: String,
      required: true,
    },
    /**
     * The maximum number of characters allowed in the textarea.
     * If the user tries to enter more than this number of characters, the input will not update.
     */
    maxChars: {
      type: Number,
      default: undefined,
    },
    /**
     * Whether or not the textarea should be in prompt mode.
     * If true, the textarea will not emit the 'send' event when the user presses enter.
     */
    promptMode: {
      type: Boolean,
      default: false,
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    autoGrow: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits({
    'update:modelValue': (v) => typeof v === 'string',
    send: (v) => typeof v === 'string',
  });

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(newValue) {
      // If the new value is longer than the maxChars prop, we will not update the value.
      if (props.maxChars && newValue.length > props.maxChars) {
        return;
      }
      emit('update:modelValue', newValue);
    },
  });

  const isFocused = ref(false);
  function handleFocus() {
    isFocused.value = true;
  }
  function handleBlur() {
    isFocused.value = false;
  }

  const hasError = computed((): boolean => {
    if (!props.maxChars) {
      return false;
    }
    return value.value.length > props.maxChars;
  });

  /**
   * Handles the send event triggered by a KeyboardEvent or button click.
   * The function will emit an 'update:modelValue' event with the current input value and reset the input's value to an empty string.
   * @param {KeyboardEvent} event The keyboard event being triggered.
   * @returns {void}
   */

  const handleSend = (event: KeyboardEvent) => {
    // If the user is not in prompt mode, we will not send the message.
    if (props.promptMode === false) {
      return;
    }
    // If the user is pressing shift + enter, we will not send the message.
    // This is to allow the user to create a new line.
    if (event.shiftKey || event.key !== 'enter') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (
      value.value.length < 1 ||
      (props.maxChars && value.value.length > props.maxChars)
    ) {
      return;
    }
    emit('send', value.value);
  };

  const textareaRef = ref<HTMLTextAreaElement | null>(null);

  // Change text area height when typing
  onMounted(() => {
    if (props.autoGrow) {
      watch(value, () => {
        textareaRef.value?.style.setProperty(
          'height',
          textareaRef.value?.scrollHeight + 'px'
        );
      });
    }
  });
</script>

<style lang="postcss" scoped>
  .vb-textarea-container {
    @apply flex p-2 md:p-4;
    .vb-textarea {
      @apply relative flex h-full flex-1 flex-col;

      &__native {
        @apply overflow-hidden border-none
          focus:!outline-none active:!border-none active:!outline-none;

        &--resizable {
          @apply resize-y;
        }
      }
    }
    .details {
      @apply flex items-center justify-start;

      &__counter {
        @apply flex items-center justify-center text-xs opacity-25;

        &:has(.warning) {
          @apply opacity-75;
          span {
            @apply font-bold text-yellow-600 opacity-100;
          }
        }

        &:has(.error) {
          @apply opacity-100;
          span {
            @apply font-bold text-red-600 opacity-100;
          }
        }
      }
    }
  }
</style>
