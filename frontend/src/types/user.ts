export type UserRole = 'cliente' | 'abogado'

export interface RegisterPayload {
  email: string
  password: string
  role: UserRole
}

export interface UserResponse {
  id: number
  email: string
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ApiError {
  detail: string
}
