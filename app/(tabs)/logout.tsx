import { imagen } from '@/cfg';
import StyleRuta from '@/hooks/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';

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
   <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
            <View style={StyleRuta.overlay} />

            <View style={styles.container}>
              <View style={styles.card}>
                <ActivityIndicator size="large" color="#f97316" />
                <Text style={styles.text}>Cerrando sesión...</Text>
              </View>
            </View>
          </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgb(255, 255, 255)', 
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4, 
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
