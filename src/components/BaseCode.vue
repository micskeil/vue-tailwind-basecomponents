<template>
  <InputContainer element-type="code">
    <div class="code-tools">
      <div class="copy">
        <span v-if="copied" class="copy__confirmation">Copied!</span>
        <BaseIcon @click="copyCode" class="copy__icon" icon="content-copy" :size="16" />
      </div>
    </div>
    <pre class="code"><code :class="`language-${language}`" v-html="html"></code></pre>
    <div class="code-language">
      {{ language }}
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css';
import InputContainer from './InputContainer.vue';

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
})

// Returns a highlighted HTML string
const html = Prism.highlight(props.code, Prism.languages.javascript, 'javascript');

const copied = ref(false);
function copyCode () {
  copied.value = true;
  navigator.clipboard.writeText(props.code);
}
</script>

<style lang="postcss" scoped>
 .code-container {
    @apply relative bg-gray-800 border-none rounded-xl overflow-hidden;

    .code {
      @apply overflow-x-auto p-2 lg:p-4 pb-4 lg:pb-8 pt-8 lg:pt-10;
    }

    .code-tools {
      @apply absolute top-0 right-0 pt-2 pr-2 lg:pr-4;

      .copy {
        @apply text-gray-500 rounded-b text-xs flex items-center gap-1;
        &:deep(.icon){
          @apply inline-block p-1 mr-1 fill-current transition-transform duration-300 ease-in-out
            text-gray-200 hover:text-gray-600 cursor-pointer;
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
    @apply absolute top-0 left-0 pt-2 pl-2 lg:pl-4 text-gray-500 rounded-b text-xs;
  }
 }
</style>
