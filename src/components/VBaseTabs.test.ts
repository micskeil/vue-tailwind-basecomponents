import VBaseTabs from '@/components/VBaseTabs.vue';
import type { Tab } from '@/components/VBaseTabs.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';

const activeTab = ref<'tab1' | 'tab2'>('tab1');

type Props = {
  tabs: Tab[];
  modelValue?: string;
};

const tabs = [
  {
    id: 'tab1',
    label: 'Tab 1',
  },
  {
    id: 'tab2',
    label: 'Tab 2',
  },
];

const createWrapper = (
  props: Props = {
    tabs,
    modelValue: activeTab.value,
  }
) => {
  return mount(VBaseTabs as any, {
    attachTo: document.body,
    propsData: props,
    slots: {
      default:
        activeTab.value === 'tab1'
          ? '<div class="tab1-content">Tab 1 content</div>'
          : '<div class="tab2-content">Tab 2 content</div>',
    },
  });
};

describe('VBaseTabs', () => {
  it('renders the tabs with the correct labels', () => {
    const wrapper = createWrapper();

    expect(wrapper.findAll('.vb-tabs__tab')).toHaveLength(2);
    expect(wrapper.findAll('.vb-tabs__tab')[0].text()).toBe('Tab 1');
    expect(wrapper.findAll('.vb-tabs__tab')[1].text()).toBe('Tab 2');
  });

  it('renders the active tab content', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.tab1-content').exists()).toBe(true);
    expect(wrapper.find('.tab2-content').exists()).toBe(false);

    await wrapper.findAll('.vb-tabs__tab')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('tab2');
  });
});
