import type { UserLogin, UserResponse, ApiError } from '../../types/user'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export async function loginUser(data: UserLogin): Promise<UserResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok){
    throw new Error((result as ApiError).detail || 'Error al iniciar sesión')
    }
    return result as UserResponse
  }
  
