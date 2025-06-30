import { imagen } from '@/cfg';
import capturarOrder from '@/controllers/confirmarCompra';
import StyleRuta from '@/hooks/styles';
import { Pasaje } from '@/interface/type';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Print from 'expo-print';
import { router, useLocalSearchParams } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const id_venta_ = params?.venta || params?.id_venta;
  const token_ = params?.token;
  const [loading, setLoading] = useState(false);
  const [estadoUI, setEstadoUI] = useState<'cargando' | 'exito' | 'error'>('cargando');
  const [mensajeUI, setMensajeUI] = useState('');
  const [pasajesConfirmados, setPasajesConfirmados] = useState<Pasaje[]>([]);

 
  useEffect(() => {
    const procesarPagoExitoso = async () => {
      const idVenta = Number(id_venta_);
      const token = token_ ? token_.toString() : undefined;

      if (!token || !idVenta || isNaN(idVenta)) {
        setEstadoUI('error');
        setMensajeUI('Datos de confirmación incompletos o inválidos.');
        return;
      }
      try {
        setLoading(true);
        const confirmData = await capturarOrder(idVenta, token);
      
        if (confirmData.success === true) {
           console.log('Confirmación de pago exitosa', JSON.stringify(confirmData.data, null, 2));
          setPasajesConfirmados(confirmData.data);
          setEstadoUI('exito');
          setMensajeUI(`¡Gracias por tu compra! Tu pago ha sido confirmado con éxito.`); 
          console.log('Pasajes confirmados:', confirmData.data.pasajes);
        } else {
           setEstadoUI('error');
           setMensajeUI(
                typeof confirmData.message === 'string'
                  ? confirmData.message
                  : JSON.stringify(confirmData.message)
                  || 'La confirmación del pago no indicó un estado completado.'
              );
        }
      } catch (error: any) {
        Alert.alert('Error', error?.message || String(error));
        setEstadoUI('error');
        setMensajeUI(error.message || 'Ocurrió un error al procesar tu pago. Por favor, revisa tu estado de cuenta.');
      } finally {
        setLoading(false);
      }
 
    };
    procesarPagoExitoso();
  }, [id_venta_, token_]);


  useEffect(() => {
    if (pasajesConfirmados.length > 0) {
      console.log('Se cargaron los pasajes');
      const pasaje = pasajesConfirmados[0];
      console.log('Pasaje confirmado:', pasaje);
    } else {
      console.log('No se encontraron pasajes confirmados');
    }
  }, [pasajesConfirmados]);


  const handleCancelRedirect = () => {
   return router.push('/(tabs)/homeUser'); 
  }; 

 const handleDescargarPDF = async () => {
  try {
    setLoading(true);
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
            .info { margin-bottom: 6px; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>Resumen de tu pasaje</h1>
          ${pasajesConfirmados.map(p => `
            <div class="card">
              <div class="info"><strong>Nro. Venta:</strong> ${id_venta_}</div>
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
    const localPath = FileSystem.documentDirectory + 'factura.pdf';
    await FileSystem.copyAsync({ from: uri, to: localPath });

    if (Platform.OS === 'android') {
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: localPath,
        flags: 1,
        type: 'application/pdf',
      });
    } else {
      await shareAsync(localPath, {
        UTI: 'com.adobe.pdf',
        mimeType: 'application/pdf',
      });
    }

    Alert.alert('¡Listo!', 'Tu factura fue generada con éxito. Revisa tu visor de PDF.');
  } catch (e) {
    Alert.alert('Error', 'No se pudo generar o abrir el PDF.');
    console.error(e);
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1}}>
    <ImageBackground source={imagen} resizeMode="cover" style={styles.imagen}>
        <Modal transparent={true} visible={loading} animationType="fade">
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>buscando pasajes.</Text>
              </View>
            </View>
          </Modal>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
            {estadoUI === 'cargando' && (
              <View style={{ alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 20, fontSize: 18, textAlign: 'center' }}>
                  Procesando tu pago, por favor espera un momento...
                </Text>
              </View>
            )}

            {estadoUI === 'exito' && pasajesConfirmados.length > 0 && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
                  ¡Pago Confirmado!
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
                  {mensajeUI}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 20 }}>
                  N° Venta: {id_venta_}
                  </Text>
                <Text style={{ fontSize: 16, textAlign: 'left', marginBottom: 20 }}>
                  Detalles de tu compra:  
                </Text>
                
                 {pasajesConfirmados.map((p, index) => (
                    <View key={p.id_pasaje || index} style={styles.card}>
                      <Text style={styles.cardTitle}>Pasaje #{p.id_pasaje}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Cédula:</Text> {p.ciCliente}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Origen:</Text> {p.viaje.localidadOrigen.nombreLocalidad}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Destino:</Text> {p.viaje.localidadDestino.nombreLocalidad}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Salida:</Text> {p.viaje.fecha_partida} – {p.viaje.hora_partida}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Asiento:</Text> {p.asiento.numero_asiento}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Precio:</Text> ${p.precio}</Text>
                    </View>
                  ))}

                <TouchableOpacity style={styles.button} onPress={handleDescargarPDF}>
                  <Text style={styles.buttonText}>
                    {loading ? 'Generando...' : 'Descargar PDF'}
                  </Text>
                </TouchableOpacity> 
              </View>
            )}
            {estadoUI === 'exito' && pasajesConfirmados.length === 0 && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
                  Cargando detalles de tu compra...
                </Text>
              </View>
            )}

           

            {estadoUI === 'error' && (
              <View>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 20 }}>
                  ¡Error en el Pago!
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
                  {mensajeUI}
                </Text>

                 <View style={styles.card}>
                      <Text style={styles.cardTitle}>Pasaje #</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Cédula:</Text> sfds</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Origen:</Text> sdfsdfs</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Destino:</Text> werwerwe</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Salida:</Text> sdfsdf – sdfsdf</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Asiento:</Text> sdfsdf</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Precio:</Text> $sdfsdf</Text>
                    </View>
                 <TouchableOpacity style={styles.button} onPress={handleCancelRedirect}>mont
                <Text style={styles.buttonText}>Volver al inicio</Text>
              </TouchableOpacity> </View>
            )}
          </View>
         
        </View>
      </View>
    </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
  backgroundColor: StyleRuta.primary,
  padding: 8,
  borderRadius: 8,
  marginTop: 15,
  minWidth: 200,
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
  container: {
    flex: 1,
    zIndex: 2,
  },
  subcontainer: {
    flex: 1,
   
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,   
    marginBottom: 60,
  },
  imagen: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    alignItems: 'center',
  },
  line: {
    color: 'rgba(192, 9, 9, 0.97)',
    paddingTop: 45,
    borderBottomWidth: 1,
  },
  loading: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
loadingOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
loadingBox: {
  padding: 20,
  backgroundColor: '#333',
  borderRadius: 10,
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  color: '#fff',
  fontSize: 16,
},

//detalle

card: {
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
cardTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#333', 
},
cardItem: {
  fontSize: 14,
  marginBottom: 4,
  color: '#444',
},
cardLabel: {
  fontWeight: '600',
  color: '#555',
},
});