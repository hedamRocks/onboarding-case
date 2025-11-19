import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the service
const mockFetchContent = vi.fn()
vi.mock('~/services/serviceContent', () => ({
  fetchContent: mockFetchContent,
}))

describe('useContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear module cache to reset useState
    vi.resetModules()
  })

  it('should fetch and cache onboarding content', async () => {
    const mockOnboardingData = {
      title: 'Welcome',
      steps: [{ title: 'Step 1', content: 'Content 1' }]
    }

    mockFetchContent.mockResolvedValue(mockOnboardingData)

    // Dynamically import to get fresh instance
    const { useContent } = await import('../useContent')
    const { getContentByType } = useContent()
    const result = await getContentByType('onboarding')

    expect(result).toEqual(mockOnboardingData)
    expect(mockFetchContent).toHaveBeenCalledWith('onboarding')
  })

  it('should fetch and cache login content', async () => {
    const mockLoginData = {
      title: 'Login',
      description: 'Please log in'
    }

    mockFetchContent.mockResolvedValue(mockLoginData)

    const { useContent } = await import('../useContent')
    const { getContentByType } = useContent()
    const result = await getContentByType('login')

    expect(result).toEqual(mockLoginData)
    expect(mockFetchContent).toHaveBeenCalledWith('login')
  })
})
