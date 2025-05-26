import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TripItemProps {
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio: string;
  onPress: () => void;
}

const TripItem: React.FC<TripItemProps> = ({
  origen,
  destino,
  fecha,
  hora,
  precio,
  onPress,
}) => {
  return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.route}>{origen} → {destino}</Text>
        <Text style={styles.price}>${precio}</Text>
      </View>
      <Text style={styles.date}>{fecha} a las {hora}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  route: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#ff6600',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default TripItem;