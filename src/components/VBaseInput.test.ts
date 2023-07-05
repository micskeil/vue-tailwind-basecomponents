import VBaseInput from '@/components/VBaseInput.vue';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';

type Props = {
  modelValue: string;
  rules?: ((v: string) => boolean)[];
  validateOn?: 'change' | 'blur';
  hideDetails?: boolean;
  messages?: string[];
  autofocus?: boolean;
  block?: boolean;
};

const defaultProps: Props = {
  modelValue: '',
  rules: [(v: string) => v.length > 0],
  validateOn: 'blur',
  hideDetails: false,
  messages: ['This is a message'],
  autofocus: true,
  block: true,
};

const createWrapper = (props: Props = defaultProps) => {
  return mount(VBaseInput as any, {
    attachTo: document.body,
    propsData: props,
    attrs: {
      id: 'test',
      autofocus: 'true',
      placeholder: 'Type here...',
    },
  });
};

describe('VBaseInput', () => {
  it('renders the input with the correct attributes', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.vb-input__native').exists()).toBe(true);
    expect(wrapper.find('.vb-input__native').attributes('type')).toBe('text');
    expect(wrapper.find('.vb-input__native').attributes('placeholder')).toBe(
      'Type here...'
    );
    expect(wrapper.find('.vb-input__native').classes()).not.toContain(
      'vb-input__native--error'
    );

    await nextTick(); // wait for focus to be applied

    expect(wrapper.find('.vb-input__native').classes()).toContain(
      'vb-input__native--focused'
    );
    expect(wrapper.find('.details').exists()).toBe(true);
    expect(wrapper.find('.details__message').text()).toBe('This is a message');

    // blur the input to trigger validation
    await wrapper.find('.vb-input__native').trigger('blur');

    expect(wrapper.find('.vb-input__native').classes()).toContain(
      'vb-input__native--error'
    );
    expect(wrapper.find('.vb-input__native').attributes('autofocus')).toBe('');
    expect(wrapper.find('.full-width').exists()).toBe(true);
  });

  it('emits update:modelValue event when input value changes', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.vb-input__native').setValue('test');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
  });

  it.only('validates the input according to the rules prop', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.vb-input__native').setValue('');

    expect(wrapper.vm.validate({ silent: true })).toBe(false);

    await wrapper.find('.vb-input__native').setValue('test');

    // we have to update the props manually since we don't have a parent component
    await wrapper.setProps({
      modelValue: 'test',
    });

    expect(wrapper.vm.validate({ silent: true })).toBe(true);
  });
});
