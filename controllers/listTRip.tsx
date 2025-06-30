import { Viaje } from "@/interface/type";
import axios from "axios";



// TRaer el de ?trip
export async function listarViajes(): Promise<Viaje[]> {
  const res = await axios.get(
    'https://backend-production-2812f.up.railway.app/api/viajes/listarViajes',
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (res.data.success) return res.data.data;
  else throw new Error(res.data.message || 'Error al listar viajes');
}