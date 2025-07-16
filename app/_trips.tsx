import TripResultItem from '@/components/ui/Trips';
import { listarViajes } from '@/controllers/listTRip';
import StyleRuta from '@/hooks/styles';
import type { Viaje, ViajeParams } from '@/interface/type';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripResultsScreen() {
  const router = useRouter();
  const {viajeIda, tipoViaje, pasajes, etapa, fechaVuelta } = useLocalSearchParams();
  const [datos, setDatos] = useState<ViajeParams | null>(null);
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  try {
    const parsed = JSON.parse(viajeIda as string);
    setDatos(parsed);
  } catch (e) {
    setError('Error al leer los datos del viaje.');
    setLoading(false);
  }
 }, [viajeIda, etapa, fechaVuelta]);
 

  useEffect(() => {
    if (!datos) return;
    const fetchViajes = async () => {
      setLoading(true);
      try {
        const todos = await listarViajes();
        const cantidadPasajes = parseInt(pasajes as string, 10);
       const filtrados = todos
                  .filter((item) => {
                    const fechaItem = new Date(item.fecha_partida.split('/').reverse().join('-'));
                    const fechaFiltro = new Date(datos.fecha.split('/').reverse().join('-'));

                    return (
                      !['CERRADO', 'CANCELADO'].includes(item.estado) &&
                      item.localidadOrigen.id_localidad.toString() === datos.origen &&
                      item.localidadDestino.id_localidad.toString() === datos.destino &&
                      fechaItem >= fechaFiltro &&
                      item.asientosDisponibles >= cantidadPasajes
                    );
                  })
                  .sort((a, b) => {
                    const fechaA = new Date(a.fecha_partida.split('/').reverse().join('-'));
                    const fechaB = new Date(b.fecha_partida.split('/').reverse().join('-'));
                    return fechaA.getTime() - fechaB.getTime();
                  });

      setViajes(filtrados);
      } catch (err) { 
        console.error(err);
        setError('No se pudieron cargar los viajes.');
      } finally {
        setLoading(false);
      }
    };

    fetchViajes();
  }, [datos]);

  const seleccionarViaje = (item: Viaje) => {
    router.push({
      pathname: '/_seat',
      params: {
        viaje: JSON.stringify(item),
        fechaVuelta,
        etapa: etapa,
        tipoViaje,
        pasajes,
      },
    });
  };

  //  errores
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
       <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {datos && (
          <View style={styles.card}>
            <View style={styles.row}>
            <View style={styles.floatLeft}>
              <Text style={styles.titulos}>Filtro:</Text>
            </View>
            <View style={styles.header}>
              <Text style={styles.tipoViaje}>
                {etapa}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Origen:</Text>
            <Text style={styles.value}>{datos.nomorigen}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.value}>{datos.nomdestino}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{datos.fecha}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pasajes:</Text>
            <Text style={styles.value}>{pasajes}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo de Viaje:</Text>
                <Text style={styles.value}>{tipoViaje === 'ida-vuelta' ? 'Ida y vuelta' : 'Solo ida'} </Text>
          </View>

        
        </View>
      )}

        <Modal transparent={true} visible={loading} animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Buscando tu próximo viaje...</Text>
            </View>
          </View>
        </Modal>
        
        <FlatList
          data={viajes}
          keyExtractor={(item) => item.id_viaje.toString()}
          renderItem={({ item }) => (
            <TripResultItem
              fecha_partida={item.fecha_partida}
              fecha_llegada={item.fecha_llegada}
              hora_partida={item.hora_partida}
              hora_llegada={item.hora_llegada}
              localidadOrigen={item.localidadOrigen}
              localidadDestino={item.localidadDestino}
              precio_viaje={item.precio_viaje}
              estado={item.estado}
              asientosDisponibles={item.asientosDisponibles}
              onPress={() => seleccionarViaje(item)}
            />
          )}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.card}>
                <Text style={styles.error}>No se encontraron viajes para los filtros seleccionados. Vuelva a buscar.</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                  <Text style={styles.buttonText}>Volver a buscar</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
        </View>
       </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   scrollContent: {
      flexGrow: 1,
      paddingTop: 10,
    },

  container: { padding: 16, marginBottom: 40 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  value: { fontWeight: '400', color: '#111' },
  error: { textAlign: 'center', color: 'gray', marginVertical: 16 },
  button: {
    backgroundColor: StyleRuta.primary,
    padding: 12,
    borderRadius: 6,
    alignSelf: 'center', 
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  tipoViaje: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: StyleRuta.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  label: {
    fontWeight: '600',
    width: 110,
    color: '#374151',
  },
  titulos: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
    textAlign: 'center',
  },
  floatLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 12,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  loading: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
