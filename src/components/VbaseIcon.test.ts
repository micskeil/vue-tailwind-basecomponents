import VBaseIcon from '@/components/VBaseIcon.vue';
import * as mdi from '@mdi/js';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

interface MdiIcons {
  [key: string]: string;
}
const mdiIcons: MdiIcons = mdi;

type Props = {
  icon: string;
  color?: string;
  size?: string;
  label?: string;
  parentId?: string;
};

const createWrapper = (
  props: Props = {
    icon: 'arrow-right',
    color: 'primary',
    size: 'lg',
    label: 'Arrow right',
    parentId: 'parent-id',
  }
) =>
  mount(VBaseIcon, {
    propsData: props,
  });

describe('VBaseIcon', () => {
  it('renders the icon with the correct class and attributes', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.vb-icon').exists()).toBe(true);
    expect(wrapper.find('.vb-icon__native').exists()).toBe(true);
    expect(wrapper.find('.fill-primary').exists()).toBe(true);
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Arrow right"]').exists()).toBe(true);
    expect(wrapper.find('[aria-labelledby="parent-id"]').exists()).toBe(true);
    expect(wrapper.find('[viewBox="0 0 24 24"]').exists()).toBe(true);
    expect(wrapper.find('path').exists()).toBe(true);
  });

  it('renders the default icon when the specified icon is not found', () => {
    const wrapper = mount(VBaseIcon, {
      props: {
        icon: 'non-existent-icon',
      },
    });

    expect(wrapper.find('path').attributes('d')).toBe(mdiIcons['mdiAlert']);
  });
});
