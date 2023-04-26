import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import BaseCode from '@/components/BaseCode.vue';;

const BaseComponents: {
  // explicit type for better type inference in build mode
  BaseTextarea: typeof BaseTextarea;
  BaseIcon: typeof BaseIcon;
  BaseButton: typeof BaseButton;
  BaseCode: typeof BaseCode;
} = {
  BaseTextarea,
  BaseIcon,
  BaseButton,
  BaseCode
};

export default BaseComponents;
