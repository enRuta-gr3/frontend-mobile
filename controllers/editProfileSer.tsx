import axios, { AxiosError } from "axios";
    
export async function editProfile(uuidAuth: string, ci: string, nombres: string, apellidos: string, email: string, fecha_nacimiento: string) {
  try {
    const response = await axios.post('https://backend-production-2812f.up.railway.app/api/usuarios/modificarPerfil',
      {tipo_usuario:"CLIENTE", uuidAuth:uuidAuth, ci:ci, nombres:nombres, apellidos:apellidos, email:email, fecha_nacimiento:fecha_nacimiento},
      {headers: {'Content-Type': 'application/json',},}); 
       return response.data
  } catch (error: any) {
        const _error = error as AxiosError<Error>;
        if (_error.response?.data) {
            return _error.response.data;       
        }    
  }
}         