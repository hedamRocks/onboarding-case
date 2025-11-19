export const useOnboarding = () => {
  const currentStep = useState<number>('onboarding-step', () => 0)
  const loading = useState<boolean>('onboarding-loading', () => false)
  const onboardingStepsCount = useState<number>('onboarding-steps-count', () => 0)

  const setOnboardingStepsCount = (count: number) => {
    onboardingStepsCount.value = count
  }

  const nextStep = () => {
    if (currentStep.value < onboardingStepsCount.value - 1) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < onboardingStepsCount.value) {
      currentStep.value = step
    }
  }

  const reset = () => {
    currentStep.value = 0
  }

  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => 
    currentStep.value === onboardingStepsCount.value - 1
  )

  return {
    currentStep: readonly(currentStep),
    loading: readonly(loading),
    isFirstStep,
    isLastStep,
    setOnboardingStepsCount,
    nextStep,
    prevStep,
    goToStep,
    reset,
  }
}
