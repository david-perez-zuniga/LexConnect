import type { RegisterPayload, UserResponse, ApiError } from '../../types/user'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export async function createUser(data: RegisterPayload): Promise<UserResponse> {
  const response = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error((result as ApiError).detail || 'Error al registrarse')
  }

  return result as UserResponse
}
