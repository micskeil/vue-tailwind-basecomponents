import { BaseTextarea, BaseFileInput, BaseButton, BaseCode, BaseIcon } from '../index';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseButton: typeof BaseButton;
    BaseCode: typeof BaseCode;
    BaseIcon: typeof BaseIcon;
    BaseTextarea: typeof BaseTextarea;
    BaseFileInput: typeof BaseFileInput;
  }
}
export {};
