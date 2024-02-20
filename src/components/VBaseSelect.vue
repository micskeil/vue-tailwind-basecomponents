<template>
  <VInputContainer element-type="select">
    <div class="input">
      <select v-model="value" v-bind="$attrs">
        <option v-for="option in options" :key="option" value="">Select an option</option>
      </select>
    </div>
  </VInputContainer>
</template>

<script setup lang="ts">
  import VInputContainer from './VInputContainer.vue';
  import { computed, defineComponent } from 'vue';

  // The native input element inherits all attributes from parent component,
  defineComponent({
    inheritAttrs: false,
  });

  const props = defineProps({
    /**
     * The value of the input.
     * This is a two-way binding.
     */
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array<string>,
      default: () => [],
    },
    /**
     * The label of the input.
     */
    label: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const value = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    },
  });
</script>
