import { bloquearAsientos } from '@/controllers/controlSeat';
import { AsientoData, AsientoParaBloquear, Compra, Viaje, ViajeParams } from '@/interface/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeyendaEstadosAsientos from './stsSeat';


interface Props {
  viaje: Viaje;
  etapa: string;
  tipoViaje: string;
  pasajes: number;
  fechaVuelta: string;
  asientosFallidos?: number[]; 
}

const SeatSelector: React.FC<Props> = ({ viaje, etapa, tipoViaje, pasajes, fechaVuelta, asientosFallidos }) => {
  const [asientos, setAsientos] = useState<AsientoData[]>([]);
  const [seleccionados, setSeleccionados] = useState<AsientoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('Cargando asientos....');
  const [isSaving, setIsSaving] = useState(false);

  const scheme = useColorScheme(); // puede ser 'light' o 'dark'
  const isDark = scheme === 'dark';

  const cargarAsientos = async () => {
  setLoading(true);
  setMensaje('Cargando asientos....');
  try {
    const res = await axios.post('https://backend-production-2812f.up.railway.app/api/asientos/listarAsientos', {
      id_viaje: viaje.id_viaje,
    });
    if (res.data.success) {
      setAsientos(res.data.data);
    } else {
      Alert.alert('Error', 'No se pudo cargar los asientos.');
    }
  } catch (error) {
    Alert.alert('Error', 'Fallo la conexión con el servidor.');
  } finally {
    setLoading(false);
  }
};

  

  const toggleAsiento = (item: AsientoData) => {
    if (isSaving || item.estado !== 'LIBRE') return;

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

  //Carga asientos al iniciar para tratar los bloqueados
  useFocusEffect(
    useCallback(() => {
              cargarAsientos(); 
              setSeleccionados([]);
              if (asientosFallidos && asientosFallidos.length > 0) {
                const asientosBloqueados = asientos.filter(a => asientosFallidos.includes(a.id_disAsiento));
                setSeleccionados(asientosBloqueados);
              }
      }, [viaje.id_viaje])
);

  const renderAsiento = ({ item }: { item: AsientoData }) => {
    const isSeleccionado = seleccionados.some(a => a.id_disAsiento === item.id_disAsiento);
    return (
      <TouchableOpacity
        accessibilityViewIsModal={loading}
        disabled={item.estado !== 'LIBRE' || isSaving}
        onPress={() => toggleAsiento(item)}
        style={[
          styles.asiento,
          item.estado === 'OCUPADO' && styles.ocupado,
          item.estado === 'BLOQUEADO' && styles.ocupado,
          item.estado === 'LIBRE' && styles.libre,
          isSeleccionado && styles.seleccionado,
        ]}
      >
        <Text style={[
          styles.text,
          item.estado === 'LIBRE' && styles.txtlibre,
          isSeleccionado && styles.txtseleccionado,
        ]}>{item.asiento.numero_asiento}</Text>
      </TouchableOpacity>
    );
  };

  const handleConfirmar = async () => {
    if (seleccionados.length < pasajes) {
      Alert.alert('Límite', `Te faltan ${pasajes - seleccionados.length } asiento/s para seleccionar.`);
      return;
    }

    setIsSaving(true);

    try {
      let idBloqueo = await AsyncStorage.getItem('userid');
      if (!idBloqueo) {
        Alert.alert('Error', 'No se encontró el usuario para bloquear asientos.');
        setIsSaving(false);
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

      const response = await bloquearAsientos(asientosParaBloquear);

      if (response.success) {
        if (tipoViaje === 'ida') {
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

        } else if (tipoViaje === 'ida-vuelta' && etapa === 'ida') {
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

        } else if (tipoViaje === 'ida-vuelta' && etapa === 'vuelta') {
          const compraidaStr = await AsyncStorage.getItem('compraIda');
          if (!compraidaStr) {
            Alert.alert('Error', 'No se encontró la información de la compra de ida.');
            setIsSaving(false);
            return;
          }

          const compraida = JSON.parse(compraidaStr);
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal transparent={true} visible={loading || isSaving} animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            {loading && <Text style={styles.loadingText}>Cargando asientos...</Text>}
            {isSaving && <Text style={styles.loadingText}>Guardando asientos...</Text>}
          </View>
        </View>
      </Modal>
      <SafeAreaView>
        {!loading && (
          <FlatList
            data={asientos}
            numColumns={4}
            keyExtractor={(item) => item.id_disAsiento.toString()}
            renderItem={renderAsiento}
            contentContainerStyle={[styles.grid, { backgroundColor: isDark ? '#000' : '#fff' }]}
            ListHeaderComponent={
              <>
                <LeyendaEstadosAsientos />
                <Text style={[styles.header]}>Frente del ómnibus</Text>
              </>
            }
            ListFooterComponent={
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button, isSaving && { backgroundColor: '#ccc' }]}
                  onPress={handleConfirmar}
                  disabled={isSaving}
                >
                  <Text style={[styles.buttonText, { color: '#FFF' }]}> 
                    {isSaving ? 'Guardando...' : 'Confirmar Selección'}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        )} 
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
  
  },
  ocupado: {
    backgroundColor: '#555',
  },
   libre: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
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
  txtlibre: {
    color: '#000',
    fontWeight: 'bold',
  },
  txtseleccionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    marginTop: 12,
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 15,
    color: '#000',
    backgroundColor: '#c4c4c4',
  },
  footer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 8,
    width: 270,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
overlay2: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},

savingText: {
  marginTop: 10,
  color: '#fff',
  fontSize: 16,
}
});

export default SeatSelector;
