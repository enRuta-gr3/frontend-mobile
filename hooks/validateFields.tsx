import { useState } from 'react';

export function useValidateFields() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateLogin({ correo, password }: { correo: string; password: string }) {
    const newErrors: { [key: string]: string } = {};
    if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
      newErrors.correo = 'Correo inválido';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateSignup(fields: {
    nombre: string;
    apellido: string;
    fecha: string;
    correo: string;
    cedula: string;
    password: string;
    password2: string;
    descuento: string;
  }) {
    const newErrors: { [key: string]: string } = {};
    if (!fields.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!fields.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!fields.fecha || !/^\d{2}\/\d{2}\/\d{4}$/.test(fields.fecha)) newErrors.fecha = 'Fecha inválida (dd/mm/aaaa)';
    if (!fields.correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.correo)) newErrors.correo = 'Correo inválido';
    if (!fields.cedula || fields.cedula.length < 6) newErrors.cedula = 'Cédula inválida';
    if (!fields.password || fields.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (fields.password !== fields.password2) newErrors.password2 = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return { errors, validateLogin, validateSignup };
}
