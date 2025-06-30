import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendTokenPush } from './sendTokenPush';

export async function SaveTokenPush(contador: number) {
  try {
    const userid = await AsyncStorage.getItem('userid'); 
    const pushToken = await AsyncStorage.getItem('pushToken');
   
    if (!userid || !pushToken) {
      console.warn('Faltan credenciales para enviar el token push');
      return;
    }
    const res = await sendTokenPush(userid, pushToken);
    if (!res?.success) {
      if (contador < 3) {
        console.warn('Reintentando guardar el token push, intento:', contador + 1);
        await SaveTokenPush(contador + 1); // Reintentar hasta 3 veces
      } else {
        console.error('No se pudo guardar el token push después de 3 intentos', res);
      }
    }
  } catch (error) {
    console.error('Error al guardar el token push:', error);
  }
}
