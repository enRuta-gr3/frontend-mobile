
import LoginLayout from '@/components/ui/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export const options = {headerShown: false,}; //ocultar el cabezal en el login

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const router = useRouter();

  const clickLogin = async () => {

    //ARMAR VALIDACIONE DE CAMPOS
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completá todos los campos');
      return;
    }

   /*if (!validateEmail(email)) {
      Alert.alert('Campos inválidos', 'Por favor ingrese un correo con formato válido');
      return;
    } */

try { 
  const res = await axios.post(
      'https://backend-production-2812f.up.railway.app/api/auth/iniciarSesion', 
      {email: email, contraseña: password },
      {headers: {'Content-Type': 'application/json',},}
    ); 
 
    if (res.data.success === true) { 
        const jdata =res.data.data.access_token;
        const userId =res.data.data.usuario.uuidAuth;
        const nombres =res.data.data.usuario.nombres;
        const ci =res.data.data.usuario.ci;

     console.log(res.data.data)
      
        if (jdata) {   
          await AsyncStorage.setItem('token',jdata);
          await AsyncStorage.setItem('userid', userId); 
          await AsyncStorage.setItem('nombres',nombres);
          await AsyncStorage.setItem('ci', ci); 
            router.push('/(tabs)/homeUser'); 
          }
    } 
    
 
} catch (error: any) {
   
  if (error.response) {
    console.log(JSON.stringify(error.response))
    if (error.response.status === 401 || error.response.status === 403) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Por favor, revisa tus credenciales.');
    }
  } else {
    console.error('Error de red:', error.message);
  }
}};

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <LoginLayout
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onLogin={clickLogin}
    />
  );
}
 