import * as Print from 'expo-print';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TicketPdfScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const ticketData = {
    id,
    nombre: 'Juan Pérez',
    ci: '12345678',
    desde: 'Montevideo',
    hasta: 'Salto',
    fecha: '2025-06-15',
    hora: '14:30',
    asiento: '15B',
  };

  const generateHtml = () => `
      <html>
      <head>
        <style>
          body {
            font-family: sans-serif;
            padding: 20px;
            font-size: 60px; 
          }
          h1 {
            font-size: 80px; 
            margin-bottom: 20px;
          }
          p {
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <h1>Pasaje #${ticketData.id}</h1>
        <p><strong>Nombre:</strong> ${ticketData.nombre}</p>
        <p><strong>Cédula:</strong> ${ticketData.ci}</p>
        <p><strong>Desde:</strong> ${ticketData.desde}</p>
        <p><strong>Hasta:</strong> ${ticketData.hasta}</p>
        <p><strong>Fecha:</strong> ${ticketData.fecha}</p>
        <p><strong>Hora:</strong> ${ticketData.hora}</p>
        <p><strong>Asiento:</strong> ${ticketData.asiento}</p>
      </body>
    </html>
  `;

  const handlePrint = async () => {
    try {
      setLoading(true);
      const { uri } = await Print.printToFileAsync({
        html: generateHtml(),
      });
      await Sharing.shareAsync(uri); 
    } catch (err) {
      Alert.alert('Error', 'No se pudo generar el PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: generateHtml() }}
        style={{ flex: 1 }}
      />
      <View style={{ padding: 20 }}>
        <Button title={loading ? 'Generando...' : 'Descargar PDF'} onPress={handlePrint} disabled={loading} />
      </View>
    </View>
  );
}
