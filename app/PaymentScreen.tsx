import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const PaymentScreen = () => {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      console.log('Confirmando selección y navegando a PayPal...');
      router.push('/Paypal');
    } catch (error) {
      console.error('Error al confirmar método de pago:', error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona método de pago</Text>
        <Text style={styles.subtitle}>Elige cómo pagar tu viaje:</Text>

        <TouchableOpacity style={styles.methodCard} onPress={handleConfirm}>
          <Image
            source={{ uri: 'https://www.paypalobjects.com/webstatic/icon/pp258.png' }}
            style={styles.logo}
          />
          <Text style={styles.methodText}>PayPal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  logo: { width: 50, height: 50, marginRight: 10 },
  methodText: { fontSize: 16 },
});
