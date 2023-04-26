<template>
  <header class="main-layout__header">
    <img src="/assets/logo.png" alt="Vue 3 Tailwind (base)Components" width="55" class="absolute -translate-x-1/2" />
    <div class="main-layout__title">Vue 3 Tailwind (base)Components</div>
  </header>
  <div class="main-layout">
    <div class="main-layout__sidebar">
      <ul class="main-layout__nav">
        <li v-for="element in navigationElements" :key="element.path" class="main-layout__nav-item">
          <router-link :to="element.path">{{ element.title }}</router-link>
        </li>
      </ul>
    </div>
    <main class="main-layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  const navigationElements = [
    {
      title: 'Introduction',
      path: 'home',
    },
    {
      title: 'Button',
      path: 'button',
    },
    {
      title: 'Code',
      path: 'code',
    },
    {
      title: 'Textarea',
      path: 'textarea',
    },
  ];
</script>

<style lang="postcss" scoped>
  .main-layout {
    @apply flex flex-1 flex-row;
  }

  .main-layout__header {
    @apply sticky top-0 w-full z-10 flex h-[55px] flex-row items-center border-b-1
      border-gray-200 bg-gray-50 px-8 text-base font-semibold shadow-xl;

    .main-layout__title {
      @apply ml-8;
    }
  }

  .main-layout__sidebar {
    @apply flex w-64 flex-col items-start justify-start sticky h-[calc(100vh-55px)] top-[55px]
      border-r border-gray-200 bg-gray-50 px-8 pt-8 shadow-xl;
  }

  .main-layout__nav {
    @apply flex w-full flex-col items-start justify-start gap-2;

    li a {
      @apply transition-all duration-300 ease-in-out hover:pl-4 hover:font-semibold;
    }

    .router-link-active {
      @apply pl-4 font-semibold;
    }
  }

  .main-layout__main {
    @apply mx-auto mt-8 flex h-fit w-[776px] flex-col gap-4 rounded-xl px-8 py-4 dark:bg-gray-900 dark:text-gray-50;
  }
</style>
