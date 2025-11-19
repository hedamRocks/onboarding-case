import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders with primary type', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'Click Me'
      }
    })

    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.classes()).toContain('bg-clever-dark')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('renders with ghost type', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'ghost'
      },
      slots: {
        default: 'Ghost Button'
      }
    })

    expect(wrapper.text()).toBe('Ghost Button')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('text-clever-dark')
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'primary'
      },
      slots: {
        default: '<span>Custom Content</span>'
      }
    })

    expect(wrapper.html()).toContain('Custom Content')
  })

  it('applies base classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('px-4')
    expect(wrapper.classes()).toContain('py-2.5')
    expect(wrapper.classes()).toContain('text-sm')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'primary'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
