import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const options = { headerShown: false };

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.multiRemove(['token', 'userid', 'nombres', 'ci']);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      } finally {
        setLoading(false);
        router.replace('/(auth)/login');
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
