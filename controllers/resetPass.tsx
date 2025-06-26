import axios, { AxiosError } from "axios";
    
export async function resetPass(email: string) { 
  try {
    const response = await axios.post('https://backend-production-2812f.up.railway.app/api/usuarios/solicitar-recuperacion',
      {email: email},
      {headers: {'Content-Type': 'application/json',},}); 
       return response.data
  } catch (error: any) {
        const _error = error as AxiosError<Error>;
        if (_error.response?.data) {
            return _error.response.data;       
        }    
  }
}         