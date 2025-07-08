
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmailVerificationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.jpg')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>¡Verificá tu correo!</Text>
      <Text style={styles.message}>Te enviamos un correo electrónico </Text>  
      <Text style={styles.message}>para verificar tu identidad. </Text>  
      <Text style={styles.message}>Por favor, revisá tu bandeja de entrada </Text>  
      <Text style={styles.message2}>(y también la de spam) para confirmar tu dirección de email.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}> 
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
   message2: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff6600',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
