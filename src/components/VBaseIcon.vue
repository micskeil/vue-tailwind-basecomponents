<template>
  <span
    :title="label"
    class="vb-icon"
    role="img"
    :aria-label="label"
    :aria-labelledby="parentId"
  >
    <svg
      class="vb-icon__native"
      viewBox="0 0 24 24"
      :width="width"
      :class="[`fill-${color}`, `vb-icon-${icon}`]"
    >
      <path :d="path" />
    </svg>
  </span>
</template>

<script setup lang="ts">
  // import the mdi library and annotate its type
  import * as mdi from '@mdi/js';
  import { computed } from 'vue';

  type MdiIcons = {
    [key: string]: string;
  };

  const mdiIcons: MdiIcons = mdi;

  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,

      default: undefined,
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    parentId: {
      type: String,
      default: undefined,
    },
  });

  /**
   * Get the width of the icon.
   */
  const width = computed(() => {
    if (typeof props.size === 'number') {
      return props.size;
    }
    // turn tailwind text-sizes into numbers

    return {
      xs: 12,
      sm: 16,
      base: 24,
      lg: 32,
      xl: 48,
      '2xl': 64,
      '3xl': 96,
      '4xl': 128,
      '5xl': 256,
    }[props.size];
  });

  /**
   * Get the path of the icon.
   */
  const path = computed(() => {
    // if the icon has - in the name, delete them and capitalize the next letter
    // e.g. mdi-arrow-right-bold => mdiArrowRightBold
    // and add mdi prefix
    const iconName = props.icon.startsWith('mdi')
      ? props.icon
      : `mdi${props.icon
          .split('-')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join('')}`;
    let path = mdiIcons[iconName];
    if (!path) {
      console.error(`Icon ${props.icon} not found.`);
      path = mdiIcons['mdiAlert'];
    }
    return path;
  });
</script>

<style>
  .vb-icon {
    @apply flex w-fit items-center justify-center;
  }
</style>
