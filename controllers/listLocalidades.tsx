import { Localidad } from '@/interface/type';
import axios from 'axios';

// Tipos

export async function listarLocalidades(): Promise<Localidad[]> {
  try {
    const res = await axios.get('https://backend-production-2812f.up.railway.app/api/localidades/listarLocalidades', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.data.success) {
      return res.data.data;
    } else {
      throw new Error(res.data.message || 'Error al obtener localidades');
    }
  } catch (error) {

    console.error('Error al listar localidades:', error);
    throw error;
  }
}
