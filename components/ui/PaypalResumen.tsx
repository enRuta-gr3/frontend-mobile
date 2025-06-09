import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  cantidadDeViajes: number;
  cantidadDePasajeros: number;
  cantidadDeAsientos: number;
  total: number;
  descuento: number;
  tipoDescuento: string;
};

export default function PaypalResumen({
  cantidadDeViajes,
  cantidadDePasajeros,
  cantidadDeAsientos,
  total,
  descuento,
  tipoDescuento,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del Pago</Text>
      <Text>Cantidad de viajes: {cantidadDeViajes}</Text>
      <Text>Pasajeros: {cantidadDePasajeros}</Text>
      <Text>Asientos: {cantidadDeAsientos}</Text>
      {descuento > 0 && (
        <Text>
          Descuento ({tipoDescuento}): -${descuento.toFixed(2)}
        </Text>
      )}
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  total: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
