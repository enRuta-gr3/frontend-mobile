import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export const options = {headerShown: false,}; //ocultar el cabezal en el login
export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)/login'); 
      }
      
    };
        checkAuth();
  }, []);

  
  return null;
}
