import PaypalResumen from '@/components/ui/PaypalResumen';
import { handleIntegrationPayPal } from '@/utils/PaypalIntegration';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { openBrowserAsync } from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const Logo_Paypal = require('@/assets/images/LogoPaypal.png');

interface ViajeInfo {
  id_viaje: number;
  cantidad: number;
}

interface RouteParams {
  uuidAuth: string;
  viajes: ViajeInfo[];
}

export default function PayaPalScreen() {
  const route = useRoute();
  const { uuidAuth, viajes = [] } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [resumen, setResumen] = useState({
    cantidadDeViajes: viajes.length,
    cantidadDePasajeros: 1,
    cantidadDeAsientos: 1,
    total: 0,
    descuento: 0,
    tipoDescuento: '',
  });

  useEffect(() => {
    if (!viajes || viajes.length === 0) {
      setLoading(false);
      return;
    }

    const datosResumen = async () => {
      try {
        const viajesRequest = viajes.map((v) => ({
          uuidAuth,
          viaje: v,
        }));

        const response = await axios.post(
          'https://backend-production-2812f.up.railway.app/api/venta/calcularVenta',
          viajesRequest
        );

        const { montoTotal, montoDescuento, tipoDescuento } = response.data.data;

        setResumen({
          cantidadDeViajes: viajes.length,
          cantidadDePasajeros: 1,
          cantidadDeAsientos: 1,
          total: montoTotal,
          descuento: montoDescuento,
          tipoDescuento,
        });
      } catch (error) {
        console.error('Error al calcular venta:', error);
        Alert.alert('Error', 'No se pudo calcular el monto total');
      } finally {
        setLoading(false);
      }
    };

    datosResumen();
  }, [viajes, uuidAuth]);

  const handleCancel = () => {
    Alert.alert('Cancelado');
  }
  const handleBuy = async () => {
    try {
      
      const data = await handleIntegrationPayPal(uuidAuth, viajes);
      console.log('URL de PayPal generada:', data);
      openBrowserAsync(data);
    } catch (error) {
      console.error('Error en handleBuy:', error); 
      Alert.alert('Error', 'Hubo un problema al iniciar el pago.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.logoContainer}>
        <Image source={Logo_Paypal} style={styles.logo} resizeMode="contain" />
      </View>

      {!loading ? (
        <PaypalResumen
          cantidadDeViajes={resumen.cantidadDeViajes}
          cantidadDePasajeros={resumen.cantidadDePasajeros}
          cantidadDeAsientos={resumen.cantidadDeAsientos}
          total={resumen.total}
          descuento={resumen.descuento}
          tipoDescuento={resumen.tipoDescuento}
        />
      ) : (
        <Text>Cargando resumen...</Text>
      )}

      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button title=" Cancelar " color="#555" onPress={handleCancel} />
        </View>
        <View style={styles.button}>
          <Button title=" Pagar " color="#ff6600" onPress={handleBuy} />
        </View>
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
