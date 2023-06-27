import {
  VBaseTextarea,
  VBaseFileInput,
  VBaseButton,
  VBaseCode,
  VBaseIcon,
} from './index';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VBaseButton: typeof VBaseButton;
    VBaseCode: typeof VBaseCode;
    VBaseIcon: typeof VBaseIcon;
    VBaseTextarea: typeof VBaseTextarea;
    VBaseFileInput: typeof VBaseFileInput;
  }
}
export {};
