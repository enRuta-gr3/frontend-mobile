import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useRequireAuth() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token && token !== 'null' && token !== 'undefined') {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    checkAuth();
  }, []);

  return { isLogged };
}

