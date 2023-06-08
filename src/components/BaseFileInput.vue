<template>
  <input
    ref="inputRef"
    type="file"
    class="hidden"
    :disabled="disabled ? true : undefined"
    :accept="acceptableFileTypes"
    @change="handleChange"
  />
  <div class="file-upload" @click="handleClick">
    <div class="file-upload__content">
      <slot />
    </div>

    <div
      class="file-upload__input"
      :class="{
        'file-upload__input--overlay': $slots.default,
      }"
    >
      <BaseIcon icon="upload" class="opacity-20" />
      <div class="flex flex-row items-center justify-center gap-2">
        Click here or drag and drop a file to add.
      </div>
      <div class="input__file-types">
        Allowed file formats:
        <span v-for="(fileType, i) in fileTypes" :key="fileType">
          {{ i ? ',&nbsp;' : '&nbsp;' }}{{ fileType }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseIcon from './BaseIcon.vue';
  import type { PropType } from 'vue';
  import { computed, ref } from 'vue';

  type FileTypes = 'image' | 'video' | 'audio' | 'pdf' | 'text' | 'zip' | 'other';

  const props = defineProps({
    fileTypes: {
      type: [Array, String] as PropType<string[] | FileTypes>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const acceptableFileTypes = computed(() => {
    if (typeof props.fileTypes === 'string') {
      switch (props.fileTypes) {
        case 'image':
          return 'video/*';
        case 'video':
          return 'video/*';
        case 'audio':
          return 'audio/*';
        case 'pdf':
          return '.pdf';
        case 'text':
          return '.txt,.md';
        case 'zip':
          return '.zip,.rar,.7z';
        default:
          return '';
      }
    }
    return props.fileTypes.map((t) => `.${t}`).join(',');
  });

  const emit = defineEmits({
    change: (v) => typeof v === 'string',
  });

  const inputRef = ref<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.value?.click();
  };

  const handleChange = async (event: Event): Promise<void> => {
    if (props.disabled) {
      return;
    }

    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    const filesArray = Array.from(files);
    if (!filesArray.length) {
      return;
    }

    emit('change', filesArray);
  };
</script>

<style lang="postcss" scoped>
  .file-upload {
    @apply relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden;

    &__content {
      @apply flex h-full w-full flex-col items-center justify-center gap-2;
    }

    &__input {
      @apply mx-1 flex flex-col items-center justify-center gap-2 text-center;

      .input__file-types {
        @apply text-center text-xs text-gray-500;
      }

      &--overlay {
        @apply absolute;
      }
    }
  }
</style>
