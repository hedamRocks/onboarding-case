import type { LoginUserResponse, User } from "~/types/User";

export const useAuth = () => {
  // TODO: use token-based auth for better security
  const user = useCookie<Partial<Pick<User, 'email' | 'isOnboarded'>> | null>('user', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    default: () => null,
  })

  const isAuthenticated = computed(() => !!user.value)
  const isUserOnboarded = computed(() => user.value?.isOnboarded ?? false)

  const login = async (email: string, password: string) => {
    const { data, error } = await useFetch('/api/login-user', {
      method: 'POST',
      body: { email, password },
    }) as any

    const { user: fetchedUser } = data.value as LoginUserResponse || {}

    if (error.value || !data.value?.success) {
      throw new Error(data.value?.message || 'Login failed')
    }

    if (data.value.success && fetchedUser) {
      user.value = fetchedUser
    }
    return data.value
  }

  const logout = async () => {
    user.value = null
    await navigateTo('/login', { replace: true })
  }

  const markOnboarded = () => {
    if (user.value) {
      user.value = { ...user.value, isOnboarded: true }
    }
  }
  const clearOnboarding = () => {
    if (user.value) {
      user.value = { ...user.value, isOnboarded: false }
      
      // reload the page to show onboarding modal again
      window.location.reload()
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isUserOnboarded,
    login,
    logout,
    markOnboarded,
    clearOnboarding,
  }
}
