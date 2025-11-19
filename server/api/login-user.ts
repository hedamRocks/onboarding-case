/**
 * login-user API route
 * Handles user login requests
 * @module api/login-user
 * fetch mock data from public directory
 * and validate user credentials
 */
import { defineEventHandler, readBody } from 'h3'
import type { LoginUserResponse, User } from '~/types/user'
import mockUserDb from '../../public/mock-user-db.json'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  // Fetch mock user database from public directory
  // use mock import in development as fallback
  const users: User[] = import.meta.dev ? mockUserDb : await $fetch<User[]>('/mock-user-db.json')

  // Validate user credentials
  const user: User | undefined = users.find(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password
  )

  if (!user) {
    return { success: false, message: 'Invalid email or password' } as LoginUserResponse
  }
  
  return { success: true, message: 'Login successful', user: { email: user.email, isOnboarded: user.isOnboarded } } as LoginUserResponse
  
})