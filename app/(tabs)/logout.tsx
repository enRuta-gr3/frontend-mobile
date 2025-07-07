import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

export const options = { headerShown: false };

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
     
        const uuidAuth = await AsyncStorage.getItem('userid');
        const accessToken = await AsyncStorage.getItem('token');

        if (uuidAuth || accessToken) {
          const url = `https://backend-production-2812f.up.railway.app/api/usuarios/cerrarSesion` +
                      `?uuidAuth=${encodeURIComponent(uuidAuth ?? '')}` +
                      `&token=${encodeURIComponent(accessToken ?? '')}`;
          const response = await axios.post(url); 
          if (response.data.success) {
              await AsyncStorage.multiRemove(['token', 'userid', 'nombres', 'ci']);
              router.replace('/(auth)/login');
          } else {
           Alert.alert('Error al cerrar sesión:', response.data.message);
          }

        }
      } catch (error) {
         Alert.alert('Error al cerrar sesión:', (error as Error)?.message || String(error));
     } finally {
        setLoading(false);
      
      }
    };

    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f97316" />
      <Text style={styles.text}>Cerrando sesión...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: '#444',
  },
});
