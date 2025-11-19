import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchContent } from '../serviceContent'
import type { Content } from '~/types/Content'

// Mock the $fetch globally
vi.stubGlobal('$fetch', vi.fn())

describe('serviceContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchContent', () => {
    it('should fetch onboarding content successfully', async () => {
      const mockOnboardingData: Content['onboarding'] = {
        title: 'Welcome to Onboarding',
        description: 'Get started with our app',
        steps: [
          { title: 'Step 1', content: 'First step content' },
          { title: 'Step 2', content: 'Second step content' }
        ],
        nextButtonText: 'Next',
        prevButtonText: 'Back',
        skipButtonText: 'Skip',
        finishButtonText: 'Finish'
      }

      // @ts-ignore - mocking global $fetch
      $fetch.mockResolvedValue(mockOnboardingData)

      const result = await fetchContent('onboarding')

      expect(result).toEqual(mockOnboardingData)
    })

    it('should fetch login content successfully', async () => {
      const mockLoginData: Content['login'] = {
        title: 'Login',
        description: 'Please sign in to your account',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        loginButtonText: 'Login',
        forgotPasswordText: 'Forgot password?',
        warnings: {
          invalidCredentials: 'Invalid email or password',
          requiredFields: 'All fields are required',
          emailFormat: 'Invalid email format'
        }
      }

      // @ts-ignore - mocking global $fetch
      $fetch.mockResolvedValue(mockLoginData)

      const result = await fetchContent('login')

      expect(result).toEqual(mockLoginData)
    })

    it('should throw error when fetch fails', async () => {
      // @ts-ignore - mocking global $fetch
      $fetch.mockRejectedValue(new Error('Network error'))

      await expect(fetchContent('login')).rejects.toThrow('Network error')
    })

    it('should call correct endpoint for content type', async () => {
      const mockData = { data: 'test' }

      // @ts-ignore - mocking global $fetch
      $fetch.mockResolvedValue(mockData)

      await fetchContent('login')
      expect($fetch).toHaveBeenCalledWith('/mock-login-content.json')

      await fetchContent('onboarding')
      expect($fetch).toHaveBeenCalledWith('/mock-onboarding-content.json')
    })
  })
})
