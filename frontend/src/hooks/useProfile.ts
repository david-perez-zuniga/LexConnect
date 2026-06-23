import { useState } from 'react';

export function useProfile() {
  const [step, setStep] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const save = async () => {
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

  const goBack = () => {
    setStep(1);
  };

  return { step, cargando, error, exito, submit, save, goBack };
}
