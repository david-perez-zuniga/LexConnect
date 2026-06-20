import { useState } from 'react'
import { createUser } from '../services/Users/userregister_api'

export function useRegister() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'cliente' | 'abogado'>('abogado')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      await createUser({ email, password, role })
      setExito(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  const reset = () => {
    setEmail('')
    setPassword('')
    setRole('abogado')
    setError('')
    setExito(false)
  }

  return {
    email, setEmail,
    password, setPassword,
    role, setRole,
    cargando,
    error,
    exito,
    submit,
    reset,
  }
}
