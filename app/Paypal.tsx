import PaypalResumen from '@/components/ui/PaypalResumen';
import StyleRuta from '@/hooks/styles';
import { ViajeVenta } from '@/interface/type';
import { handleIntegrationPayPal } from '@/utils/PaypalIntegration';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert,  Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  
  const { datosVenta } = useLocalSearchParams();
  const comprasArray = datosVenta ? JSON.parse(datosVenta as string) : [];

   const pago: ViajeVenta[] = comprasArray.map((vv: ViajeVenta) => ({
      uuidAuth: vv.uuidAuth,
      viaje: {
        id_viaje: vv.viaje.id_viaje,
        cantidad: vv.viaje.cantidad,
      },
    }));

    console.log("PAGO" + pago)

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
    
      // Si solo se debe enviar un ViajeVenta, selecciona el primero del array
      const data = await handleIntegrationPayPal(pago);
      console.log('URL de PayPal generada:', data);
      openBrowserAsync(data);

    } catch (error) {
      console.error('Error en handleBuy:', error); 
      Alert.alert('Error', 'Hubo un problema al iniciar el pago.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.screenA}>
            <View style={styles.container}>
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
             <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleBuy}>
                            <Text style={styles.buttonText}>Pagar</Text>
              </TouchableOpacity>
           
           
          </View>
      </View>
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screenA: {
    flex: 1,
    
   // justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  screen: {
    flexGrow: 1,
    padding: 16,
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
   // justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
   cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    width: '50%'
  },
  cancelText: {
    color: '#000000', textAlign: 'center',  fontSize: 20
  },
 
   button: {
       backgroundColor: StyleRuta.primary,
      padding: 12,
      borderRadius: 6,
      
      marginTop: 10,
      width: '50%'
    },
    buttonText: { color: '#fff', textAlign: 'center',  fontSize: 20},
});
