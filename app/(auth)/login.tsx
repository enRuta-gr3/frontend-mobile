import LoginLayout from '@/components/ui/Login';
import { SaveTokenPush } from '@/controllers/saveTokenPush';
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
   const [loading, setLoading] = useState(false);

  const clickLogin = async () => {
     setLoading(true);
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completá todos los campos', [
                {
                  text: 'Aceptar',
                  onPress: () => { },
                  style: 'default',
                },
              ]);
      return;
    }
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

        if (jdata) {   
          await AsyncStorage.setItem('token',jdata);
          await AsyncStorage.setItem('userid', userId); 
          await AsyncStorage.setItem('nombres',nombres);
          await AsyncStorage.setItem('ci', ci); 
          
          try {
            
           await SaveTokenPush(0); //guardo el token 
          } catch (err) {
            Alert.alert('Aviso', 'Hay problemas, por favor intenta más tarde.');
            console.error('Error enviando token push:', err);
          }
          router.push('/(tabs)/homeUser'); 
        }        
    } 
    
 
} catch (error: any) {
   if (error.response) {
     if (error.response.status === 401 || error.response.status === 403) {
       Alert.alert(
         'Atención!',
         'No se pudo iniciar sesión. \nPor favor, revisa tus credenciales.',
         [
           {
                  text: 'Aceptar',
                  onPress: () => {
                    setEmail('');
                    setPassword('');
                  },
                  style: 'default',
                },
              ]
            );
    }
  } else {
    console.error('Error de red:', error.message);
  }
}finally {
    setLoading(false);
  }
};

    return (  
    <LoginLayout
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onLogin={clickLogin}
      loading={loading} 
    />
  );
}
