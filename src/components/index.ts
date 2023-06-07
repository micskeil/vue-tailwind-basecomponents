import BaseButton from '@/components/BaseButton.vue';
import BaseCode from '@/components/BaseCode.vue';
import BaseFileInput from '@/components/BaseFileInput.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';

export default {
  BaseTextarea,
  BaseIcon,
  BaseButton,
  BaseCode,
  BaseFileInput,
} as {
  // explicit type for better type inference in build mode
  BaseTextarea: typeof BaseTextarea;
  BaseIcon: typeof BaseIcon;
  BaseButton: typeof BaseButton;
  BaseCode: typeof BaseCode;
  BaseFileInput: typeof BaseFileInput;
};
