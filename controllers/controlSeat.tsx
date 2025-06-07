import { AsientoParaBloquear, BloqueoResponse } from "@/interface/type";
import axios from "axios";
    
export async function bloquearAsientos(asientos: AsientoParaBloquear[]): Promise<BloqueoResponse> {
  try {
    const response = await axios.post<BloqueoResponse>(
      'https://backend-production-2812f.up.railway.app/api/asientos/cambiarEstado',
      asientos,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}        