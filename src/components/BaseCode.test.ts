import BaseCode from './BaseCode.vue';
import BaseIcon from './BaseIcon.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

// mock the clipboard API
const clipboard = {
  ...navigator.clipboard,
  writeText: vi.fn(),
};
Object.defineProperty(window.navigator, 'clipboard', { value: clipboard });

describe('CodeHighlighter', () => {
  it('renders the given code with proper syntax highlighting', () => {
    const wrapper = mount(BaseCode, {
      propsData: {
        code: 'console.log("Hello World!");',
        language: 'javascript',
      },
      global: {
        components: {
          BaseIcon,
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('copies the code when copy icon is clicked', async () => {
    const wrapper = mount(BaseCode, {
      propsData: {
        code: 'console.log("Hello World!");',
        language: 'javascript',
      },
      global: {
        components: {
          BaseIcon,
        },
      },
    });

    const copyIcon = wrapper.findComponent({ name: 'BaseIcon' });
    await copyIcon.trigger('click');

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      'console.log("Hello World!");'
    );
    expect(wrapper.find('.copy__confirmation').exists()).toBe(true);
  });
});
