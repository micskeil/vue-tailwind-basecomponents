import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';

const BaseComponents: {
  // explicit type for better type inference in build mode
  BaseTextarea: typeof BaseTextarea;
  BaseIcon: typeof BaseIcon;
  BaseButton: typeof BaseButton;
} = {
  BaseTextarea,
  BaseIcon,
  BaseButton,
};

export default BaseComponents;
