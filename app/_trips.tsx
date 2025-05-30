import TripResultItem from '@/components/ui/Trips';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';


import trip from '@/json/viajes.json'; // cambiar por el axion

export default function TripResultsScreen() {
  const router = useRouter();
  let { origen, destino,nomorigen, nomdestino, fecha, pasajes, tipoViaje } = useLocalSearchParams();

  const handleSelectTrip = (id_viaje: number) => {
   // router.push(`/viaje/${id_viaje}`);
  };
  
    nomorigen = JSON.parse(nomorigen as string);
    nomdestino = JSON.parse(nomdestino as string);
    //nomorigen.toString().replace(/"/g, '')
  return (
        <SafeAreaView style={styles.container}>
      <Text>Origen: {nomorigen} - Destino: {nomdestino}</Text>
      <Text>Fecha: {fecha}   --- Pasajes: {pasajes}</Text>
<       Text>Tipo: {tipoViaje}</Text>
      
      <FlatList
            data={trip.data.filter( (item) => item.localidadDestino.nombreLocalidad === nomdestino
               && item.localidadOrigen.nombreLocalidad === nomorigen
               && item.fecha_partida === fecha
               && item.asientosDisponibles >= parseInt(pasajes as string, 10)
            )}
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