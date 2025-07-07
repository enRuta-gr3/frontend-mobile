import StyleRuta from '@/hooks/styles';
import { Compra, ViajeVenta } from '@/interface/type';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const ResumenSeleccion: React.FC = () => {
  const { compras, tipoViaje } = useLocalSearchParams();
  const comprasArray = compras ? JSON.parse(compras as string) : [];
  const [montoTotal, setMontoTotal] = useState(0);
  const [montoDescuento, setMontoDescuento] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!Array.isArray(comprasArray) || comprasArray.length === 0) {
    return <Text>No se recibió la información de la compra.</Text>;
  }

  const datosVenta: ViajeVenta[] = comprasArray.map((compra: Compra) => ({
    uuidAuth: compra.id_usuario,
    viaje: {
      id_viaje: compra.viaje.id_viaje,
      cantidad: compra.asientos.length,
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const calcularVenta = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          'https://backend-production-2812f.up.railway.app/api/venta/calcularVenta',
          datosVenta,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (res.data.success) {
          setMontoTotal(res.data.data.montoTotal);
          setMontoDescuento(res.data.data.montoDescuento);
        } else {
          Alert.alert('Error', res.data.message || 'No se pudo calcular la venta.');
        }
      } catch (error) {
        console.error('Error en calcularVenta:', error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    calcularVenta();
  }, []);

  const clickCancel = () => {
    router.back();  
  };
 
  const cliclComprar = () => {
     router.push({
        pathname: '/PaymentScreen',
        params: {
          datosVenta: JSON.stringify(datosVenta)        
        }});
  }

  return (
    <>
      <Modal transparent={true} visible={loading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Calculando total...</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <Text style={styles.title}></Text>
        <Text style={styles.labelTipo}>
          {tipoViaje === 'ida-vuelta' ? 'Ida y vuelta' : 'Sólo ida'}
        </Text>

        {comprasArray.map((compra: Compra, index: number) => (
          <View key={index} style={{ marginBottom: 20 }}>
            

            <View style={styles.row}>
              <Text style={styles.label}>
                <FontAwesome5 name="bus" size={20} color="black" />
                  {index === 0 ? ' Viaje de Ida' : ' Viaje de Vuelta'}
                </Text>
              <Text>
                {compra.viaje.localidadOrigen.nombreLocalidad} →{' '}
                {compra.viaje.localidadDestino.nombreLocalidad}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Fecha de partida:</Text>
              <Text>{compra.viaje.fecha_partida}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Hora de partida:</Text>
              <Text>{compra.viaje.hora_partida}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Asiento/s:</Text>
              <Text>{compra.asientos.map((a: any) => a.numero_asiento).join(', ')}</Text>
            </View>

          <View style={styles.separator} />

          </View>

          
        ))}

        <View style={styles.padding50} >

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalPrice}>${montoTotal}</Text>
            </View>

            {montoDescuento > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Descuento:</Text>
                <Text style={styles.totalPriceDescuento}>- ${Math.round(montoDescuento)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a Pagar:</Text>
              <Text style={styles.totalPriceTotal}>${Math.round(montoTotal - montoDescuento)}</Text>
            </View>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={cliclComprar}>
              <Text style={styles.buyText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={clickCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
};


export default ResumenSeleccion;

const styles = StyleSheet.create({
  padding50:{
     marginTop: 15,
     marginBottom: 15,
  },
  subtitulo: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 4,
      color: '#444',
    },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  totalPriceDescuento: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  totalPriceTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e67e22',
  },

  buyButton: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 12,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
  },
  labelTipo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: StyleRuta.primary,
    marginBottom: 8,
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
