import VBaseTextarea from '@/components/VBaseTextarea.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

type Props = {
  modelValue: string;
  maxChars?: number;
  promptMode?: boolean;
  noResize?: boolean;
  autoGrow?: boolean;
};

const defaultProps: Props = {
  modelValue: '',
  maxChars: 100,
  promptMode: false,
  noResize: false,
  autoGrow: false,
};

const createWrapper = (props: Props = defaultProps) => {
  return mount(VBaseTextarea, {
    attachTo: document.body,
    propsData: props,
  });
};

describe('VBaseTextarea', () => {
  it('renders the textarea with the correct attributes', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.vb-textarea__native').exists()).toBe(true);
    expect(wrapper.find('.vb-textarea__native').attributes('placeholder')).toBe(
      'Type here...'
    );
    expect(wrapper.find('.vb-textarea__native').attributes('value')).toBeUndefined();

    expect(wrapper.find('.details__counter').exists()).toBe(true);
    expect(wrapper.find('.details__counter').text()).toBe('0  / 100');
    expect(wrapper.find('.warning').exists()).toBe(false);
    expect(wrapper.find('.error').exists()).toBe(false);
  });

  it('updates the counter when the textarea value changes', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.details__counter').text()).toBe('0  / 100');

    await wrapper.setProps({ modelValue: 'test' });

    expect(wrapper.find('.details__counter').text()).toBe('4  / 100');
  });

  it('adds the warning class when the remaining characters are less than 6', async () => {
    const wrapper = createWrapper();

    await wrapper.setProps({ modelValue: '123456', maxChars: 10 });

    expect(wrapper.find('.warning').exists()).toBe(true);
    expect(wrapper.find('.error').exists()).toBe(false);
  });

  it('adds the error class when the remaining characters are less than 0', async () => {
    const wrapper = createWrapper();

    await wrapper.setProps({ modelValue: '12345678910', maxChars: 10 });

    expect(wrapper.find('.warning').exists()).toBe(true);
    expect(wrapper.find('.error').exists()).toBe(true);
  });

  it('emits a update:modelValue event when the textarea value changes', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.vb-textarea__native').setValue('test');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
  });

  it('if the value longer than the maxChars, it will not emit update:modelValue', async () => {
    const wrapper = createWrapper();
    await wrapper.setProps({ maxChars: 10 });

    await wrapper.find('.vb-textarea__native').setValue('12345678910');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('in promptMode, it will emit a send event on enter', async () => {
    const wrapper = createWrapper();
    await wrapper.setProps({ promptMode: true, modelValue: 'test' });

    await wrapper.find('.vb-textarea__native').trigger('keyup.enter');

    expect(wrapper.emitted('send')).toBeTruthy();
    expect(wrapper.emitted('send')).toHaveLength(1);

    await wrapper.setProps({ promptMode: false, modelValue: 'test2' });
    await wrapper.find('.vb-textarea__native').trigger('keyup.enter');

    expect(wrapper.emitted('send')).toHaveLength(1);
  });

  it('if shift is pressed, it will not emit a send event on enter', async () => {
    const wrapper = createWrapper();
    await wrapper.setProps({ promptMode: true, modelValue: 'test' });

    await wrapper.find('.vb-textarea__native').trigger('keyup.enter', {
      shiftKey: true,
    });

    expect(wrapper.emitted('send')).toBeFalsy();
  });

  it('when value length is greater than the maxChars, it will not emit a send event on enter', async () => {
    const wrapper = createWrapper();
    await wrapper.setProps({ promptMode: true, modelValue: '12345678910', maxChars: 10 });

    await wrapper.find('.vb-textarea__native').trigger('keyup.enter');

    expect(wrapper.emitted('send')).toBeFalsy();
  });
});
