import { useState } from 'react';

export function useProfile() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setExito(true);
    } catch {
      setError('Error al guardar el perfil');
    } finally {
      setCargando(false);
    }
  };

  return { cargando, error, exito, submit };
}
