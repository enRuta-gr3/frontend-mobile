// screens/Pago/MercadoPagoScreen.tsx
import React from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import MercadoPagoResumen from '../ui/MercadoPagoResumen.js';
import { handleIntegrationMP } from '@/utils/MPintegration.js';

const Logo_MercadoPago = require("@/assets/images/mercado_pago.png");
export default function MercadoPagoScreen() {
  const handleCancel = () => {
    Alert.alert('Cancelado');
  };

  const handlePagar = async () => {
    try {
      const url = await handleIntegrationMP();
      if (!url) {
        Alert.alert("Error", "No se pudo generar el link de pago.");
        return;
      }

      await openBrowserAsync(url); 
    } catch (error) {
      console.error("Error al pagar:", error);
      Alert.alert("Error", "Hubo un problema al iniciar el pago.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image source={Logo_MercadoPago} style={styles.logo} resizeMode="contain" />
      </View>
      <MercadoPagoResumen
        origen="Punta del Este"
        destino="Salto"
        fecha="2025-06-11"
        pasajeros={1}
        asientos={1}
        precio={903}
      />
      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button title=" Cancelar " color="#555" onPress={handleCancel} />
        </View>
        <View style={styles.button}>
          <Button title=" Pagar " color="#ff6600" onPress={handlePagar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 200,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});
