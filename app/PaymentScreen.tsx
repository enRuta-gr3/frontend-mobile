import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const { datosVenta } = useLocalSearchParams();

  const handleConfirm = async () => {
    try {
      const body = {
        pago: {
          medio_de_pago: {
            id_medio_de_pago: 3,
            nombre: 'PayPal',
          },
          urlRedir: 'enruta://success',
        },
        pasajes: datosVenta
          ? JSON.parse(datosVenta as string).map((item: any) => ({
              uuidAuth: item.uuidAuth,
              viaje: {
                id_viaje: item.viaje.id_viaje,
                cantidad: item.viaje.cantidad,
              },
            }))
          : [],
      };

      const res = await fetch('https://backend-production-2812f.up.railway.app/api/pagos/solicitarParametrosPago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        router.push({
          pathname: '/Paypal',
          params: { urlPaypal: data.data.urlPago },
        });
      } else {
        Alert.alert('Error 002', 'No se pudo obtener la URL de PayPal.');
      }


    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al procesar el pago.');
    }
  };

  const simularRetornoPaypal = () => {
    router.push({
      pathname: '/success',
      params: {
        id_venta: '148',
        token: '3GN05564KK2434533',
        PayerID: 'DF2UHYAHYVHCC',
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.screenA}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecciona método de pago</Text>
          <Text style={styles.subtitle}>Elige cómo pagar tu viaje:</Text>
          <TouchableOpacity style={styles.methodCard} onPress={handleConfirm}>
            <Image source={{ uri: 'https://www.paypalobjects.com/webstatic/icon/pp258.png' }} style={styles.logo} />
            <Text style={styles.methodText}>PayPal</Text>
          </TouchableOpacity>

          {/* Botón de prueba para desarrollo */}
          <TouchableOpacity style={[styles.methodCard, { marginTop: 20, backgroundColor: '#e0e0e0' }]} onPress={simularRetornoPaypal}>
            <Text style={[styles.methodText, { color: 'green' }]}>Simular retorno PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenA: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between',
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
