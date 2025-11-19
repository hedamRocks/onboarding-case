import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useOnboarding } from '../useOnboarding'

// Mock useState
vi.mock('#app', () => ({
  useState: vi.fn((key: string, init: () => any) => {
    const state = { value: init() }
    return state
  }),
  computed: vi.fn((fn) => ({ value: fn() })),
  readonly: vi.fn((val) => val),
}))

describe('useOnboarding', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with step 0', () => {
    const { currentStep } = useOnboarding()
    expect(currentStep.value).toBe(0)
  })

  it('should set onboarding steps count', () => {
    const { setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(5)
    // Steps count is set internally
  })

  it('should move to next step', () => {
    const { nextStep, currentStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    const initialStep = currentStep.value
    nextStep()
    
    expect(currentStep.value).toBe(initialStep + 1)
  })

  it('should move to previous step', () => {
    const { prevStep, nextStep, currentStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    nextStep()
    const beforePrev = currentStep.value
    prevStep()
    
    expect(currentStep.value).toBe(beforePrev - 1)
  })

  it('should not go below step 0', () => {
    const { prevStep, currentStep } = useOnboarding()
    
    prevStep()
    
    expect(currentStep.value).toBe(0)
  })

  it('should go to specific step', () => {
    const { goToStep, currentStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(5)
    
    goToStep(2)
    
    expect(currentStep.value).toBe(2)
  })

  it('should not go to invalid step', () => {
    const { goToStep, currentStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    const initialStep = currentStep.value
    goToStep(10)
    
    expect(currentStep.value).toBe(initialStep)
  })

  it('should reset to step 0', () => {
    const { reset, nextStep, currentStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    nextStep()
    nextStep()
    reset()
    
    expect(currentStep.value).toBe(0)
  })

  it('should correctly identify first step', () => {
    const { isFirstStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    expect(isFirstStep.value).toBe(true)
  })

  it('should correctly identify last step', () => {
    const { isLastStep, goToStep, setOnboardingStepsCount } = useOnboarding()
    setOnboardingStepsCount(3)
    
    goToStep(2)
    
    expect(isLastStep.value).toBe(true)
  })
})
