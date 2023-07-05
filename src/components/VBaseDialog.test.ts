import VBaseDialog from './VBaseDialog.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';

const mockShowModal = vi.fn();
HTMLDialogElement.prototype.showModal = mockShowModal;

type Props = {
  modelValue?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
};

const createWrapper = (
  propsData: Props = {
    modelValue: true,
    primaryLabel: 'OK',
    secondaryLabel: 'Cancel',
  }
) =>
  mount(VBaseDialog as any, {
    propsData,
  });

describe('VBaseDialog', () => {
  it('renders the dialog when modelValue is true', async () => {
    const wrapper = createWrapper();
    await nextTick();

    expect(wrapper.find('dialog').exists()).toBe(true);
  });

  it('does not render the dialog when modelValue is false', async () => {
    const wrapper = createWrapper({ modelValue: false });

    await nextTick();

    expect(wrapper.find('dialog').exists()).toBe(false);
  });

  it('emits click:primary event when primary button is clicked', async () => {
    const wrapper = createWrapper();

    await nextTick();

    const primaryButton = wrapper.find('.footer-primary');
    await primaryButton.trigger('click');

    expect(wrapper.emitted('click:primary')).toBeTruthy();
  });

  it('emits click:secondary event when secondary button is clicked', async () => {
    const wrapper = createWrapper();

    await nextTick();

    const secondaryButton = wrapper.find('.footer-secondary');
    await secondaryButton.trigger('click');

    expect(wrapper.emitted('click:secondary')).toBeTruthy();
  });
});
