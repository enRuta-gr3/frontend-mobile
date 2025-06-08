import { Usuario } from "@/interface/type";
import axios from "axios";
    
export async function obtenerUsuario(ci: string): Promise<Usuario> {
  try {
    const response = await axios.post<Usuario>(
      'https://backend-production-2812f.up.railway.app/api/usuarios/buscarPorCi',
      {ci: ci, tipo_usuario: "CLIENTE" },
      {headers: {'Content-Type': 'application/json',},}
    ); 

    return response.data.data as unknown as Usuario;

  } catch (error: any) {
    throw error.response;
  }
}        