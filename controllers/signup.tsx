import axios from "axios";
import { Alert } from "react-native";

export async function registrarUsuario(email: string, cedula: string, nombre: string, apellido: string, fecha: string, esEstudiante: boolean, descuento: string, esJubilado: boolean, password: string) { 
  try {
      //Mejorar por endoint class
      const res = await axios.post('https://backend-production-2812f.up.railway.app/api/auth/registrarUsuario', 
            {
              tipo_usuario:"CLIENTE",
              ci:cedula,
              nombres: nombre,
              apellidos: apellido,
              fecha_nacimiento: fecha,
              descuento: descuento,
              email: email,
              contraseña:password,
              esEstudiante:esEstudiante,
              esJubilado:esJubilado
            },
             {headers: {'Content-Type': 'application/json',},}
          );   
          const success = res.data.data.access_token;    

         return res.data; 
    } catch (error: any) {
        console.log(JSON.stringify(error.response, null, 2));
      if (!error.response?.success) {
          Alert.alert('Error:', error.response.data.data);
      }else{
             Alert.alert('No pudimos procesar la solicitud', 'Contacte a atención al cliente');
      }
    }
  };   
         