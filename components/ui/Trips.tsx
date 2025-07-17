import { useDurationTrip } from '@/hooks/calculateDuration';
import { TripItem } from '@/interface/type';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const TripResultItem: React.FC<TripItem> = ({
  fecha_partida,
  fecha_llegada,
  hora_partida,
  hora_llegada,
  localidadOrigen,
  localidadDestino,
  precio_viaje,
  estado,
  asientosDisponibles,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
 <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.card}> 
       <View style={[{justifyContent: 'space-between', alignItems: 'flex-end', borderBottomColor: 'green', borderBottomWidth: 1}]}>        
             <Text style={[styles.empresa, estado === 'ABIERTO' ? styles.estadoAbierto : styles.estadoCerrado]}>{estado}</Text>
       </View>
       <View style={[styles.row, {paddingTop: 10}]}>        
        <Text style={styles.details}>Partida</Text>
        <Text style={styles.details}>Llegada</Text> 
      </View>

      <View style={styles.row}>        
        <Text style={[styles.detailsFecha, {fontWeight: 'bold'}]}>{fecha_partida}</Text>
        <Text style={[styles.detailsFecha, {fontWeight: 'bold'}]}>{fecha_llegada}</Text>
      </View>

        <View style={styles.row}>
          <Text>{localidadOrigen.nombreLocalidad}</Text>
          <View style={styles.route}>
           <Text>{localidadDestino.nombreLocalidad}</Text> 
        </View>
      </View>

       <View style={styles.row}>
        <Text style={styles.time}>{hora_partida}</Text>
        <View style={styles.route}>
          
        </View>
        <Text style={styles.time}>{hora_llegada}</Text>
      </View>

      <View style={[styles.row, {paddingBottom: 10, paddingTop: 10}]}>
        <Text style={styles.details}>🕒 Duración estimada: {useDurationTrip(fecha_partida, hora_partida, fecha_llegada,hora_llegada)}</Text>
        {/* <Text style={styles.details}>🪑 {asientosDisponibles} asientos disponibles</Text> */}
      </View>
     
      <View style={styles.row}>
        <Text style={styles.price}>${precio_viaje}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  empresa: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  estadoAbierto: {
    color: 'green',
  },
  estadoCerrado: {
    color: 'red',
  },
  fecha: {  
    borderRadius: 8,
    fontSize: 18,
    
    color: 'black',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginHorizontal: 4,
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
   detailsFecha: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 20,
    color: '#ff6600',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff6600',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TripResultItem;