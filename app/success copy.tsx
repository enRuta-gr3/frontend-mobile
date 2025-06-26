import capturarOrder from '@/controllers/confirmarCompra';
import { Pasaje } from '@/interface/type';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const id_venta_ = params?.venta || params?.id_venta;
  const token_ = params?.token;

  const [estadoUI, setEstadoUI] = useState<'cargando' | 'exito' | 'error'>('cargando');
  const [mensajeUI, setMensajeUI] = useState('');
  const [pasajesConfirmados, setPasajesConfirmados] = useState<Pasaje[]>([]);
  const [idVenta, setIdVenta] = useState<number | null>(null);
  const [loadingPDF, setLoadingPDF] = useState(false);

  useEffect(() => {
    const procesarPagoExitoso = async () => {
      const idVentaNum = Number(id_venta_);
      const token = token_ ? token_.toString() : undefined;

      if (!token || !idVentaNum || isNaN(idVentaNum)) {
        setEstadoUI('error');
        setMensajeUI('Datos de confirmación incompletos o inválidos.');
        return;
      }

      try {
        const confirmData = await capturarOrder(idVentaNum, token);
        if (confirmData.success) {
          setPasajesConfirmados(confirmData.data.pasajes);
          setIdVenta(idVentaNum);
          setEstadoUI('exito');
          setMensajeUI(`¡Compra completada con éxito!`);
        } else {
          setEstadoUI('error');
          setMensajeUI(confirmData.message || 'La confirmación del pago falló.');
        }
      } catch (error: any) {
        setEstadoUI('error');
        setMensajeUI(error.message || 'Ocurrió un error inesperado.');
      }
    };

    procesarPagoExitoso();
  }, [id_venta_, token_]);

  const generarPDF = async () => {
    try {
      setLoadingPDF(true);
      const logoURL = 'https://en-ruta.vercel.app/assets/logo-DvM36rMC.jpg';

      const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            .header { text-align: center; }
            .success { color: green; font-size: 22px; margin-top: 10px; }
            .card { border: 1px solid #ccc; border-radius: 10px; padding: 16px; margin-top: 20px; }
            .info { margin: 4px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoURL}" width="140" />
            <h1>Compra confirmada</h1>
            <p class="success">Tu compra ha sido procesada correctamente.</p>
          </div>
          ${pasajesConfirmados.map((p) => `
            <div class="card">
              <h2>Pasaje #${p.id_pasaje} - $${p.precio}</h2>
              <div class="info"><strong>Origen:</strong> ${p.viaje.localidadOrigen.nombreLocalidad}</div>
              <div class="info"><strong>Destino:</strong> ${p.viaje.localidadDestino.nombreLocalidad}</div>
              <div class="info"><strong>Salida:</strong> ${p.viaje.fecha_partida} ${p.viaje.hora_partida}</div>
              <div class="info"><strong>Llegada:</strong> ${p.viaje.fecha_llegada} ${p.viaje.hora_llegada}</div>
              <div class="info"><strong>Asiento:</strong> ${p.asiento.numero_asiento}</div>
              <div class="info"><strong>CI Cliente:</strong> ${p.ciCliente}</div>
            </div>
          `).join('')}
          <p class="info"><strong>ID de venta:</strong> ${idVenta}</p>
          <p class="info"><strong>Total pagado:</strong> $${pasajesConfirmados.reduce((acc, p) => acc + p.precio, 0)}</p>
        </body>
      </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    } finally {
      setLoadingPDF(false);
    }
  };

  const volverInicio = () => router.replace('/');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {estadoUI === 'cargando' && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.text}>Procesando tu pago...</Text>
          </View>
        )}

        {estadoUI === 'exito' && (
          <View style={styles.card}>
            <Ionicons name="checkmark-circle" size={48} color="green" />
            <Text style={styles.success}>{mensajeUI}</Text>
            <Text style={styles.textSmall}>A continuación puede descargar sus pasajes.</Text>

            {pasajesConfirmados.map((p) => (
              <View key={p.id_pasaje} style={styles.ticket}>
                <Text style={styles.ticketTitle}>Pasaje #{p.id_pasaje} <Text style={{ color: '#e67e22' }}>${p.precio}</Text></Text>
                <Text style={styles.label}>RUTA</Text>
                <Text>{p.viaje.localidadOrigen.nombreLocalidad} → {p.viaje.localidadDestino.nombreLocalidad}</Text>
                <Text>{p.viaje.localidadOrigen.departamento.nombreDepartamento} → {p.viaje.localidadDestino.departamento.nombreDepartamento}</Text>
                <Text style={styles.label}>HORARIOS</Text>
                <Text>Salida: {p.viaje.fecha_partida} {p.viaje.hora_partida}</Text>
                <Text>Llegada: {p.viaje.fecha_llegada} {p.viaje.hora_llegada}</Text>
                <Text style={styles.label}>ASIENTO</Text>
                <Text style={styles.asiento}>{p.asiento.numero_asiento}</Text>
              </View>
            ))}

            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>ID de venta: {idVenta}</Text>
              <Text style={styles.label}>Total Pagado: ${pasajesConfirmados.reduce((acc, p) => acc + p.precio, 0).toFixed(2)}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonGray} onPress={volverInicio}>
                <Text style={styles.buttonText}>Volver al inicio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOrange} onPress={generarPDF} disabled={loadingPDF}>
                <Text style={styles.buttonText}>{loadingPDF ? 'Generando...' : 'Descargar comprobante (PDF)'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {estadoUI === 'error' && (
          <View style={styles.center}>
            <Text style={styles.error}>⚠️ {mensajeUI}</Text>
            <TouchableOpacity style={styles.buttonGray} onPress={volverInicio}>
              <Text style={styles.buttonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    fontSize: 16,
    marginTop: 16,
  },
  textSmall: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  success: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: 'green',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  ticket: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  ticketTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 2,
  },
  asiento: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#e67e22',
    borderWidth: 1,
    borderColor: '#e67e22',
    borderRadius: 4,
    padding: 4,
    width: 40,
    textAlign: 'center',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  buttonOrange: {
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 6,
  },
  buttonGray: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
