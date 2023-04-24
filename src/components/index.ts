import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';

const BaseComponents: {
  BaseTextarea: typeof BaseTextarea;
  BaseIcon: typeof BaseIcon;
  BaseButton: typeof BaseButton;
} = {
  BaseTextarea,
  BaseIcon,
  BaseButton,
};

export default BaseComponents;

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseButton: typeof BaseButton;
    BaseIcon: typeof BaseIcon;
    BaseTextarea: typeof BaseTextarea;
  }
}
export {};
