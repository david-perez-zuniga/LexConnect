export type UserRole = 'cliente' | 'abogado'

// Contrato para login
export interface UserLogin {
  email: string
  password: string
}

// Contrato para Registro
export interface RegisterPayload {
  email: string
  password: string
  role: UserRole
}

// Contrato para mostrar/response
export interface UserResponse {
  id: number
  email: string
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

// Contrato para mostrar error
export interface ApiError {
  detail: string
}
