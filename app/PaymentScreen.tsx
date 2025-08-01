import { imagen } from '@/cfg';
import StyleRuta from '@/hooks/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const { datosVenta } = useLocalSearchParams();
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
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
    finally {
      setLoading(false);
    }
  };

  return (
    <><><Modal transparent={true} visible={loading} animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Redirigiendo a Paypal...</Text>

        </View>
      </View>
    </Modal></><ScrollView contentContainerStyle={styles.screen}>
        <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
          <View style={StyleRuta.overlay} />
          <View style={styles.screenA}>
            <View style={styles.container}>
              <Text style={styles.title}>Selecciona método de pago</Text>
              <Text style={styles.subtitle}>Elige cómo pagar tu viaje:</Text>
              <TouchableOpacity style={styles.methodCard} onPress={handleConfirm}>
                  <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: StyleRuta.primary,
                    marginRight: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: loading ? StyleRuta.primary : '#fff',
                  }}
                  >
                  {loading && (
                    <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: '#fff',
                    }}
                    />
                  )}
                  </View>
                <Image source={{ uri: 'https://www.paypalobjects.com/webstatic/icon/pp258.png' }} style={styles.logo} />
                <Text style={styles.methodText}>PayPal</Text>
              </TouchableOpacity>

             <TouchableOpacity style={styles.botonCancelar} onPress={() => router.back()}>
                <Text style={styles.methodText}>Cancelar</Text>
              </TouchableOpacity> 
             
            </View>
          </View>

        </ImageBackground>
      </ScrollView></>
    
  );
}

const styles = StyleSheet.create({
  screenA: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  screen: {
    flexGrow: 1,  
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
    
   
  },
  logo: { width: 50, height: 50, marginRight: 10 },
  methodText: { fontSize: 16 },
  botonCancelar: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },

   loadingOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
loadingBox: {
  padding: 20,
  backgroundColor: '#333',
  borderRadius: 10,
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  color: '#fff',
  fontSize: 16,
},
});
