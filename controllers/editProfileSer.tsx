import axios, { AxiosError } from "axios";
    
export async function editProfile(email: string, vpass: string, cpass: string) {
  try {
    const response = await axios.post('https://backend-production-2812f.up.railway.app/api/usuarios/cambiarContraseña',
      {email: email, contraseña: vpass, contraseña_nueva: cpass },
      {headers: {'Content-Type': 'application/json',},}); 
       return response.data
  } catch (error: any) {
        const _error = error as AxiosError<Error>;
        if (_error.response?.data) {
            return _error.response.data;       
        }    
  }
}         