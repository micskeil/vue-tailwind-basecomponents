<template>
  <header class="main-layout__header">
    <div class="main-layout__title">Vue 3 Tailwind Basecomponents</div>
  </header>
  <div class="main-layout">
    <div class="main-layout__sidebar">
      <ul class="main-layout__nav">
        <li class="main-layout__nav-item">
          <router-link to="#textarea">Textarea</router-link>
        </li>
      </ul>
    </div>
    <main class="main-layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  
</script>

<style lang="postcss" scoped>
  .main-layout {
    @apply flex flex-row flex-1;
  }

  .main-layout__header {
    @apply flex flex-row items-center
      border-b-1 border-primary p-2;
  }

  .main-layout__sidebar {
    @apply flex flex-col items-start justify-start w-64
      border-r border-primary p-2;
  }

  .main-layout__main {
    @apply flex mx-auto flex-col w-[712px] mt-4 gap-4;
  }
</style>
