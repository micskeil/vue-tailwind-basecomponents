<template>
  <InputContainer element-type="code">
    <div class="code-tools">
      <div class="copy">
        <span v-if="copied" class="copy__confirmation">Copied!</span>
        <BaseIcon class="copy__icon" icon="content-copy" :size="16" @click="copyCode" />
      </div>
    </div>
    <pre class="code"><code
:class="`language-${language}`"
                            v-html="html"
    /></pre>
    <div class="code-language">
      {{ language }}
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
  import InputContainer from './InputContainer.vue';
  import Prism from 'prismjs';
  import 'prismjs/themes/prism-tomorrow.css';
  import { ref } from 'vue';

  const props = defineProps({
    /**
     * The code to display
     */
    code: {
      type: String,
      required: true,
    },
    /**
     * The language to use for syntax highlighting,
     * check PrismJS docs for supported languages
     * @default javascript
     * TODO: Add better typing
     */
    language: {
      type: String,
      default: 'javascript',
    },
    // TODO: Add support for different styles
  });

  // Returns a highlighted HTML string
  const html = Prism.highlight(props.code, Prism.languages.javascript, 'javascript');

  const copied = ref(false);
  function copyCode() {
    copied.value = true;
    navigator.clipboard.writeText(props.code);
  }
</script>

<style lang="postcss" scoped>
  .code-container {
    @apply relative overflow-hidden rounded-xl border-none bg-gray-800;

    .code {
      @apply overflow-x-auto p-2 pb-4 pt-8 lg:p-4 lg:pb-8 lg:pt-10;
    }

    .code-tools {
      @apply absolute right-0 top-0 pr-2 pt-2 lg:pr-4;

      .copy {
        @apply flex items-center gap-1 rounded-b text-xs text-gray-500;
        &:deep(.icon) {
          @apply mr-1 inline-block cursor-pointer fill-current p-1 text-gray-200 transition-transform
            duration-300 ease-in-out hover:text-gray-600;
          &:hover {
            @apply rotate-12;
          }
          &:active {
            @apply scale-125;
          }
        }
      }
    }

    .code-language {
      @apply absolute left-0 top-0 rounded-b pl-2 pt-2 text-xs text-gray-500 lg:pl-4;
    }
  }
</style>
