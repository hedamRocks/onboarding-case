interface OnboardingStep {
  title: string
  content: string
}

export interface OnboardingContent {
  title: string
  description: string
  steps: OnboardingStep[]
  nextButtonText: string
  prevButtonText: string
  skipButtonText: string
  finishButtonText: string
}

interface WarningMessages {
  invalidCredentials: string
  requiredFields: string
  emailFormat: string
}

export interface LoginContent {
  title: string
  description: string
  emailLabel: string
  passwordLabel: string
  loginButtonText: string
  forgotPasswordText: string
  warnings: WarningMessages
}

export interface Content {
  onboarding: OnboardingContent | null
  login: LoginContent | null
}
