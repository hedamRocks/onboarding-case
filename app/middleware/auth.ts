export default defineNuxtRouteMiddleware((to, from) => {
  // Check authentication server-side first
  const userCookie = useCookie<{ email: string } | null>('user')
  const isAuthenticated = !!userCookie.value

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If authenticated and trying to access login, redirect to home
  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})
