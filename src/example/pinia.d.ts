import 'pinia';
import type { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    set router(value: Router);
    get router(): Router;

    // you can define simpler values too
    simpleNumber: number;
  }
}
