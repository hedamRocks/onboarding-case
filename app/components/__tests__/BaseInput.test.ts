import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

describe('BaseInput', () => {
  it('renders with required props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'test-input'
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('id')).toBe('test-input')
  })

  it('displays label when provided and input has value', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'test value',
        id: 'test-input',
        label: 'Email'
      }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Email')
  })

  it('hides label when input is empty', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'test-input',
        label: 'Email'
      }
    })

    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('shows required indicator when isRequired is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'test',
        id: 'test-input',
        label: 'Email',
        isRequired: true
      }
    })

    expect(wrapper.find('label').text()).toBe('Email *')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'test-input'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('sets correct input type', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'password-input',
        type: 'password'
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('defaults to text type when type is not provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'test-input'
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('displays placeholder with required indicator', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        id: 'test-input',
        label: 'Username',
        isRequired: true
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Username *')
  })

  it('updates value when modelValue prop changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial',
        id: 'test-input'
      }
    })

    expect(wrapper.find('input').element.value).toBe('initial')

    await wrapper.setProps({ modelValue: 'updated' })

    expect(wrapper.find('input').element.value).toBe('updated')
  })
})
