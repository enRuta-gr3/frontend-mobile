import axios, { AxiosError } from "axios";
    
export async function sendTokenPush(datosVenta: string) { 
  try {
    const response = await axios.post('https://backend-production-2812f.up.railway.app/api/venta/calcularVenta',
      {datosVenta: datosVenta},
      {headers: {'Content-Type': 'application/json',},}); 
      console.log("Datos Venta:", response.data);
       return response.data;
      
  } catch (error: any) {
        const _error = error as AxiosError<Error>;
        if (_error.response?.data) {
            return _error.response.data;       
        }    
  }
}         

