import * as Print from 'expo-print';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Alert, Button, View } from 'react-native';

export default function TicketPdfScreen() {
  const { id } = useLocalSearchParams();

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
      <body>
        <h1>Pasaje #${ticketData.id}</h1>
        <p><strong>Nombre:</strong> ${ticketData.nombre}</p>
        <p><strong>Cedula:</strong> ${ticketData.ci}</p>
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
      const { uri } = await Print.printToFileAsync({
        html: generateHtml(),
      });
      await Sharing.shareAsync(uri);
    } catch (err) {
      Alert.alert('Error', 'No se pudo generar el PDF');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Generar PDF del pasaje" onPress={handlePrint} />
    </View>
  );
}
