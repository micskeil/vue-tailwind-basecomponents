import VBaseButton from './VBaseButton.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

type Props = {
  label?: string;
  icon?: string;
  isLoading?: boolean;
};

const createWrapper = (
  propsData: Props = {
    label: 'Click me',
    isLoading: false,
  }
) => mount(VBaseButton as any, { propsData });

describe('VBaseButton', () => {
  it('renders with label', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Click me');
  });

  it('renders with icon only', () => {
    const wrapper = createWrapper({ label: 'no-label', icon: 'heart' });
    expect(wrapper.text()).toBe('');
    expect(wrapper.findComponent({ name: 'VBaseIcon' }).props().icon).toBe('heart');
  });

  it('disables the button when isLoading is true', async () => {
    const wrapper = createWrapper();
    expect(wrapper.attributes('disabled')).toBe(undefined);

    await wrapper.setProps({ isLoading: true });
    expect(wrapper.attributes('disabled')).toBe('');
  });

  it('emits a click event when clicked', async () => {
    const wrapper = createWrapper();
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
