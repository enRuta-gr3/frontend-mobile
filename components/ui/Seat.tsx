import { bloquearAsientos } from '@/controllers/controlSeat';
import { AsientoData, AsientoParaBloquear, Compra, Viaje, ViajeParams } from '@/interface/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {
  viaje: Viaje;
  etapa: string;
  tipoViaje: string;
  pasajes: number;
  fechaVuelta: string;
  asientosFallidos?: number[]; 
}

const SeatSelector: React.FC<Props> = ({ viaje, etapa , tipoViaje, pasajes,fechaVuelta, asientosFallidos }) => {
  const [asientos, setAsientos] = useState<AsientoData[]>([]);
  const [seleccionados, setSeleccionados] = useState<AsientoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('Cargando asientos....');

  useEffect(() => {
    axios
      .post('https://backend-production-2812f.up.railway.app/api/asientos/listarAsientos', {
        id_viaje: viaje.id_viaje,
      })
      .then((res) => {
        if (res.data.success) {
          setAsientos(res.data.data);
        } else {
          Alert.alert('Error', 'No se pudo cargar los asientos.');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Fallo la conexión con el servidor.');
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleAsiento = (item: AsientoData) => {
    if (item.estado !== 'LIBRE') return;

   const yaSeleccionado = seleccionados.find(a => a.id_disAsiento === item.id_disAsiento);
   if (yaSeleccionado) {
      setSeleccionados(prev => prev.filter(a => a.id_disAsiento !== item.id_disAsiento));
    } else {
      if (seleccionados.length >= pasajes) {
        Alert.alert('Límite', `Solo puedes seleccionar hasta ${pasajes} asientos.`);
        return;
      }
      
      setSeleccionados(prev => [...prev, item]);
    }
  };

  const renderAsiento = ({ item }: { item: AsientoData }) => {
  const isSeleccionado = seleccionados.some(a => a.id_disAsiento === item.id_disAsiento);

  return (
      <TouchableOpacity
        disabled={item.estado !== 'LIBRE'}
        onPress={() => toggleAsiento(item)}
        style={[
          styles.asiento,
          item.estado === 'OCUPADO' && styles.ocupado,
          item.estado === 'BLOQUEADO' && styles.ocupado,
          isSeleccionado && styles.seleccionado,
        ]}
      >
        <Text style={styles.text}>{item.asiento.numero_asiento}</Text>
      </TouchableOpacity>
    );

  };
  
  const handleConfirmar = async () => {
   
    if (seleccionados.length < pasajes) {
        Alert.alert('Límite', `Te faltan ${pasajes - seleccionados.length } asiento/s para seleccionar.`);
        return;
      }
     

    let idBloqueo = await AsyncStorage.getItem('userid');
    if (!idBloqueo) {
      Alert.alert('Error', 'No se encontró el usuario para bloquear asientos.');
      return;
    }

    
    const asientosParaBloquear: AsientoParaBloquear[] = seleccionados.map(sel => ({
      id_disAsiento: sel.id_disAsiento,
      asiento: {
        id_asiento: sel.asiento.id_asiento,
        numero: sel.asiento.numero_asiento, 
        numero_asiento: sel.asiento.numero_asiento,
        id_omnibus: sel.asiento.id_omnibus,
        nro_asiento: sel.asiento.numero_asiento,
        estado: "OCUPADO",
      },
      viaje: {
        id_viaje: viaje.id_viaje,
      },
      idBloqueo,
    }));
      
      try {
        const response = await bloquearAsientos(asientosParaBloquear);
        
        if (response.success) {
          //Si bloquea ok, tengo que consultar si el viaje es ida y vuelta. 
          // En el caso que este ida y vuelta invocar el controlador con la nueva 
     
           if (tipoViaje === 'ida'){
                const compraida: Compra = {
                    viaje: viaje as Viaje,
                    id_usuario: idBloqueo, 
                    asientos: seleccionados.map(sel => ({
                        id_asiento: sel.asiento.id_asiento,
                        numero_asiento: sel.asiento.numero_asiento,
                        id_omnibus: sel.asiento.id_omnibus,
                        estado: sel.estado
                      }))
                  }; 
            
               const compras = [compraida];
               router.push({
                  pathname: '/tripSelected',
                  params: {
                    compras: JSON.stringify(compras),
                    tipoViaje: tipoViaje
                  }
              });


              //vuelta
              }else if (tipoViaje === 'ida-vuelta' && etapa === 'ida'){

                
                const compraIda: Compra = {
                    viaje: viaje as Viaje,
                    id_usuario: idBloqueo, 
                    asientos: seleccionados.map(sel => ({
                        id_asiento: sel.asiento.id_asiento,
                        numero_asiento: sel.asiento.numero_asiento,
                        id_omnibus: sel.asiento.id_omnibus,
                        estado: sel.estado
                      }))
                  }; 
     
                await AsyncStorage.setItem('compraIda', JSON.stringify(compraIda));
                // Guardar el viaje de ida y me pongo armar el viaje de vuelta
                     
                if (!viaje.localidadOrigen.id_localidad || !viaje.localidadOrigen.id_localidad) return;
                    
                const viajeVueltaParams: ViajeParams = {
                      origen: viaje.localidadDestino.id_localidad.toString(),
                      destino: viaje.localidadOrigen.id_localidad.toString(),
                      fecha: fechaVuelta,
                      nomorigen: viaje.localidadDestino.nombreLocalidad,
                      nomdestino: viaje.localidadOrigen.nombreLocalidad,
                      pasajes: pasajes.toString(),
                      tipoViaje
                    };                    
                                    
                    router.push({
                      pathname: '/_trips',
                      params: {
                        viajeIda: JSON.stringify(viajeVueltaParams),
                        tipoViaje,
                        fechaVuelta,
                        pasajes: pasajes.toString(),
                        etapa: 'vuelta',                       
                      }
                    });


                    
              }else if (tipoViaje === 'ida-vuelta' && etapa === 'vuelta'){

                  const compraidaStr = await AsyncStorage.getItem('compraIda');
                  if (!compraidaStr) {
                    Alert.alert('Error', 'No se encontró la información de la compra de ida.');
                    return;
                  }
                  const compraida = JSON.parse(compraidaStr);
                  
                // Guardar el viaje de ida y me pongo armar el viaje de vuelta                       
                    const compraVuelta: Compra = {
                          viaje: viaje as Viaje,
                          id_usuario: idBloqueo, 
                          asientos: seleccionados.map(sel => ({
                              id_asiento: sel.asiento.id_asiento,
                              numero_asiento: sel.asiento.numero_asiento,
                              id_omnibus: sel.asiento.id_omnibus,
                              estado: sel.estado
                            }))
                        }; 

                    const compras = [compraida, compraVuelta];

                          router.push({
                            pathname: '/tripSelected',
                            params: {
                              compras: JSON.stringify(compras),
                              tipoViaje: tipoViaje
                            }
                        });
              }
        
        } else {
          Alert.alert('Error', 'No se pudo bloquear los asientos.');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un problema al bloquear los asientos.');
      }
};

  return (
    
    <>
      <Modal transparent={true} visible={loading} animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Cargando asientos...</Text>
        </View>
      </View>
    </Modal>
    <SafeAreaView>
      <FlatList
        data={asientos}
        numColumns={4}
        keyExtractor={(item) => item.id_disAsiento.toString()}
        renderItem={renderAsiento}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={<Text style={styles.header}>Frente del ómnibus</Text>}
        ListFooterComponent={<View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
            <Text style={styles.buttonText}>Confirmar Selección</Text>
          </TouchableOpacity>
        </View>} />
    </SafeAreaView>
  </>

  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    paddingHorizontal: 12,
 
    alignItems: 'center',
  },
  asiento: {
    width: 60,
    height: 60,
    margin: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  ocupado: {
    backgroundColor: '#555',
  },
  bloqueado: {
    backgroundColor: '#999',
  },
  seleccionado: {
    backgroundColor: '#f97316',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default SeatSelector;
