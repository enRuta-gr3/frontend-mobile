// components/ui/MercadoPagoResumen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number;
  asientos: number;
  precio: number;
}

export default function MercadoPagoResumen({
  origen,
  destino,
  fecha,
  pasajeros,
  asientos,
  precio,
}: Props) {
  const total = precio * pasajeros;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Será redirigido a Mercado Pago</Text>
      <Text style={styles.subtitle}>
        Para completar su compra, será redirigido a la plataforma segura de Mercado Pago.
      </Text>

      <View style={styles.box}>
        <Text style={styles.row}>
          <Text style={styles.label}>Viaje:</Text> {origen} → {destino}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Fecha:</Text> {fecha}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Pasajeros:</Text> {pasajeros}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Asientos:</Text> {asientos}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Precio por pasaje:</Text> ${precio}
        </Text>
        <Text style={styles.total}>
          Total a pagar: <Text style={styles.totalAmount}>${total}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  box: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  row: { fontSize: 15, marginBottom: 4 },
  label: { fontWeight: '600' },
  total: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  totalAmount: { color: '#e67600' },
});
