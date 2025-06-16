/*import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useLocalSearchParams, router } from 'expo-router';
import capturarOrder from '@/controllers/confirmarCompra';

const logo = require('@/assets/images/logo.jpg');

export default function DescargaPDFScreen() {
  const { venta: id_venta_, token: token_ } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [pasajes, setPasajes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPasajes = async () => {
      try {
        setLoading(true);
        const idVenta = Number(id_venta_);
        const token = token_ ? token_.toString() : undefined;
        if (!token || !idVenta || isNaN(idVenta)) {
          Alert.alert('Error', 'Datos de confirmación incompletos o inválidos.');
          return;
        }
        const confirmData = await capturarOrder(idVenta, token);
        if (confirmData.success && Array.isArray(confirmData.data)) {
          setPasajes(confirmData.data);
        } else {
          Alert.alert('Error', 'No se pudieron obtener los pasajes.');
        }
      } catch (e) {
        Alert.alert('Error', 'No se pudo obtener la información de los pasajes.');
      } finally {
        setLoading(false);
      }
    };
    fetchPasajes();
  }, [id_venta_, token_]);

  const handleDownload = async () => {
    try {
      setLoading(true);
      // Generar HTML simple para el PDF
      let html = `<html><body style='font-family:sans-serif;'>`;
      html += `<img src='https://en-ruta.vercel.app/bus2.jpg' style='width:120px;margin-bottom:20px;' />`;
      html += `<h2>Pasajes</h2>`;
      pasajes.forEach((p, idx) => {
        html += `<div style='margin-bottom:20px;padding:10px;border:1px solid #ccc;border-radius:8px;'>`;
        html += `<b>Origen:</b> ${p.viaje.localidadOrigen.nombreLocalidad} <br/>`;
        html += `<b>Destino:</b> ${p.viaje.localidadDestino.nombreLocalidad} <br/>`;
        html += `<b>Fecha:</b> ${p.viaje.fecha_partida} ${p.viaje.hora_partida} <br/>`;
        html += `<b>Asiento:</b> ${p.asiento.numero_asiento} <br/>`;
        html += `<b>Precio:</b> $${p.precio} <br/>`;
        html += `</div>`;
      });
      html += `</body></html>`;
      // Usar printToFileAsync de expo-print
      const { uri } = await (await import('expo-print')).printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Descarga tus pasajes en PDF</Text>
      {loading && <ActivityIndicator size="large" color="#007bff" style={{ margin: 20 }} />}
      {!loading && pasajes.length > 0 && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <Text style={styles.buttonText}>Descargar PDF</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/(tabs)/homeUser')}>
        <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 180,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    minWidth: 180,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
*/