import axios, { AxiosError } from "axios";
    
export async function sendTokenPush(uuidAuth: string, pushToken: string) { 
  try {
    const response = await axios.post('https://backend-production-2812f.up.railway.app/api/usuarios/guardarPushToken',
      {uuidAuth: uuidAuth, pushToken: pushToken},
      {headers: {'Content-Type': 'application/json',},}); 
      console.log("Response from sendTokenPush:", response.data);
       return response.data;
      
  } catch (error: any) {
        const _error = error as AxiosError<Error>;
        if (_error.response?.data) {
            return _error.response.data;       
        }    
  }
}         