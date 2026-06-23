import { useState } from "react";
import { loginUser } from "../services/Users/userlogin_api";

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      await loginUser({email, password})
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
    setError('')
    setExito(false)
  }

  return {
    email, setEmail,
    password, setPassword,
    cargando,
    error,
    exito,
    submit,
    reset,
  }
}
