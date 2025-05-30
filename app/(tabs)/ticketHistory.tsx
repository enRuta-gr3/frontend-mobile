import TripResultItem from '@/components/ui/Trips';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import trip from '@/json/viajes.json'; // cambiar por el axion

export default function TripResultsScreen() {
  const router = useRouter();

  const handleSelectTrip = (id_viaje: number) => {
   // router.push(`/viaje/${id_viaje}`);
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={trip.data}
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
            onPress={() => handleSelectTrip(item.id_viaje)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
});