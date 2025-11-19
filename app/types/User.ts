export interface User {
  email: string
  password: string
  isOnboarded: boolean
}

export interface LoginUserResponse {
  success: boolean
  message: string
  user?: Partial<Pick<User, 'email' | 'isOnboarded'>>
}