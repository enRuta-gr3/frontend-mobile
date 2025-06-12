import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';


export const options = { headerShown: false }; // Ocultar encabezado

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.multiRemove(['token', 'userid', 'nombres', 'ci']);
      router.replace('/(auth)/login');
    };

    logout();
  }, []);

  return null;
}