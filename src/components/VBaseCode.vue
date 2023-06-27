<template>
  <VInputContainer element-type="code">
    <div class="vb-code-tools">
      <div class="copy">
        <span v-if="copied" class="copy__confirmation">Copied!</span>
        <VBaseIcon class="copy__icon" icon="content-copy" :size="16" @click="copyCode" />
      </div>
    </div>
    <pre class="vb-code">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <code :class="`language-${language}`" v-html="html" />
    </pre>
    <div class="code-language">
      {{ language }}
    </div>
  </VInputContainer>
</template>

<script setup lang="ts">
  import VBaseIcon from './VBaseIcon.vue';
  import VInputContainer from './VInputContainer.vue';
  import * as Prism from 'prismjs';
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
      @apply flex w-full overflow-x-auto p-4 pb-4 pt-8;
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
