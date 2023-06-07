<template>
  <input type="file" class="hidden" @change="handleChange" />
  <div class="file-upload">
    <div class="file-upload__input">
      <div class="icon">
        <BaseIcon name="upload" />
      </div>
      <BaseButton label="Upload a file" /><span>or drag and drop</span>
    </div>
    <div class="file-upload__file-types">
      <span>Allowed file formats: </span>
      <span v-for="fileType in fileTypes" :key="fileType">
        {{ fileType }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue';
  import type { PropType } from 'vue';
  import { ref } from 'vue';

  defineOptions({
    components: {
      BaseButton: BaseButton as typeof BaseButton,
    },
  });

  defineProps({
    fileTypes: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits({
    change: (v) => typeof v === 'string',
  });

  const value = ref('');

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      value.value = file.name;
      emit('change', file.name);
    }
  };
</script>

<style lang="postcss" scoped>
  .file-upload {
    @apply flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 p-4;

    &__input {
      @apply flex flex-col items-center justify-center gap-2;
    }
  }
</style>
