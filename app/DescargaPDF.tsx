import { Pasaje } from '@/interface/type';
import * as Print from 'expo-print';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DescargarPDFPasaje() {
  const [loading, setLoading] = useState(false);
  const [pasajes, setPasajes] = useState<Pasaje[]>([]);
  const logoURL = 'https://en-ruta.vercel.app/assets/logo-DvM36rMC.jpg'; // Logo de la empresa
  const { pasajesConfirmados } = useLocalSearchParams();

  // Solo se ejecuta al montar la pantalla
  useEffect(() => {
    if (pasajesConfirmados) {
      try {
        const parsed = JSON.parse(pasajesConfirmados as string);
        setPasajes(parsed);
      } catch (error) {
        console.error('Error al parsear pasajesConfirmados:', error);
      }
    }
  }, [pasajesConfirmados]);

  const generarPDF = async () => {
    try {
      setLoading(true);

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              .logo { width: 150px; margin-bottom: 20px; }
              h1 { color: #000000; }
              .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
              .info { margin-bottom: 6px; font-size: 14px; }
            </style>
          </head>
          <body>
            <img src="${logoURL}" class="logo" />
            <h1>Resumen de tu pasaje</h1>
            ${pasajes.map(p => `
              <div class="card">
                <div class="info"><strong>Pasaje:</strong> ${p.id_pasaje}</div>
                <div class="info"><strong>Cédula:</strong> ${p.ciCliente}</div>
                <div class="info"><strong>Origen:</strong> ${p.viaje.localidadOrigen.nombreLocalidad}</div>
                <div class="info"><strong>Destino:</strong> ${p.viaje.localidadDestino.nombreLocalidad}</div>
                <div class="info"><strong>Salida:</strong> ${p.viaje.fecha_partida} - ${p.viaje.hora_partida}</div>
                <div class="info"><strong>Asiento:</strong> ${p.asiento.numero_asiento}</div>
                <div class="info"><strong>Precio:</strong> $${p.precio}</div>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: logoURL }}
        style={{ width: 120, height: 120, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>Resumen de tu pasaje</Text>

      {pasajes.map((p) => (
        <View key={p.id_pasaje} style={styles.card}>
          <Text style={styles.info}>Pasaje: {p.id_pasaje}</Text>
          <Text style={styles.info}>Cédula: {p.ciCliente}</Text>
          <Text style={styles.info}>Origen: {p.viaje.localidadOrigen.nombreLocalidad}</Text>
          <Text style={styles.info}>Destino: {p.viaje.localidadDestino.nombreLocalidad}</Text>
          <Text style={styles.info}>Salida: {p.viaje.fecha_partida} - {p.viaje.hora_partida}</Text>
          <Text style={styles.info}>Asiento: {p.asiento.numero_asiento}</Text>
          <Text style={styles.info}>Precio: ${p.precio}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={generarPDF} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Generando...' : 'Descargar PDF'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
