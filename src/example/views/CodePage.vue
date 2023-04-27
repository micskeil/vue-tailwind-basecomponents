<template>
  <MainLayout>
    <TitleElement id="button" tag="h1"> Code Component </TitleElement>

    <ParagraphElement>
      <BaseCode :code="code" language="javascript" />
    </ParagraphElement>
  </MainLayout>
</template>

<script setup lang="ts">
  import ParagraphElement from '../components/ParagraphElement.vue';
  import TitleElement from '../components/TitleElement.vue';

  const code = `<template>
  <InputContainer element-type="code">
    <div class="code-tools">
      <BaseIcon @click="copyCode" icon="content-copy" :size="16" />
    </div>
    <pre class="code"><code :class="'language-language" v-html="html"></code></pre>
    <div class="code-language">
      {{ language }}
    </div>
  </InputContainer>
</template>`;
</script>

<style lang="postcss" scoped>
  .buttons {
    @apply flex w-full flex-row items-center justify-around gap-8;
  }
</style>
