import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import type { defineComponent } from 'vue';

export default { BaseTextarea, BaseIcon, BaseButton } as Record<string, ReturnType<typeof defineComponent>>;
