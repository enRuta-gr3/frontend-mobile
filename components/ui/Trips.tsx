import { useDurationTrip } from '@/hooks/calculateDuration';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Localidad {
  id_localidad: number;
  nombreLocalidad: string;
}

interface TripItem {
  fecha_partida: string,
  fecha_llegada: string,      
  hora_partida: string;
  hora_llegada: string;
  localidadOrigen: Localidad;
  localidadDestino: Localidad;
  precio_viaje: number;
  estado: string;
  asientosDisponibles: number;
  onPress: () => void;
}

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
  return (

    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={[styles.empresa, estado === 'ABIERTO' ? styles.estadoAbierto : styles.estadoCerrado]}>{estado}</Text>
        <Text style={styles.directo}>{fecha_partida}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.time}>{hora_partida}</Text>
        <View style={styles.route}>
          <Text>{localidadOrigen.nombreLocalidad}</Text>
          <Text style={styles.arrow}> → </Text>
          <Text>{localidadDestino.nombreLocalidad}</Text> 
        </View>
        <Text style={styles.time}>{hora_llegada}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.details}>🕒 Duración estimada: {useDurationTrip(fecha_partida,hora_partida, fecha_llegada,hora_llegada)}</Text>
        <Text style={styles.details}>🪑 {asientosDisponibles} asientos disponibles</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.price}>${precio_viaje}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  directo: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 12,
    color: '#444',
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