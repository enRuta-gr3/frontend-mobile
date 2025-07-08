import { imagen } from '@/cfg';
import capturarOrder from '@/controllers/confirmarCompra';
import { saveToDownloads } from '@/controllers/savePDF';
import StyleRuta from '@/hooks/styles';
import { Pasaje } from '@/interface/type';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      
      console.log('Procesando pago exitoso con ID de venta:', idVenta, 'y token:', token);
      
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
        setEstadoUI('error');
        setMensajeUI(error.message || 'Ocurrió un error al procesar tu pago. Por favor, revisa tu estado de cuenta.');
      } finally {
        setLoading(false);
      }
 
    };
    procesarPagoExitoso();
  }, [id_venta_, token_]);

  const handleCancelRedirect = () => {
     return router.push('/(tabs)/homeUser'); 
  }; 

//descarga PDF
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
          <div style="text-align: center; margin-bottom: 20px;">
                    <h1>EnRuta - Comprobante de Pasajes</h1>
          </div>
          <div>
            <div class="info"><strong>Fecha de compra:</strong> ${new Date().toLocaleDateString()}</div>
            <div class="info"><strong>Hora de compra:</strong> ${new Date().toLocaleTimeString()}</div>
            <div class="info"><strong>Nro. Venta:</strong> ${id_venta_}</div>
            <div class="info"><strong>Método de Pago:</strong> PayPal</div>
            <div class="info"><strong>Nro. Orden PayPal:</strong> ${token_}</div>
            </div>
            <br/>
            <h3>Cantidad de Pasajes:</strong> ${pasajesConfirmados.length}</h3>
            ${pasajesConfirmados.map(p => `
            <div class="card">             
              <div class="info"><strong>Pasaje Nro. :</strong> ${p.id_pasaje}</div>
              <div class="info"><strong>Cédula:</strong> ${p.ciCliente}</div>
              <div class="info"><strong>Origen:</strong> ${p.viaje.localidadOrigen.nombreLocalidad}</div>
              <div class="info"><strong>Destino:</strong> ${p.viaje.localidadDestino.nombreLocalidad}</div>
              <div class="info"><strong>Salida:</strong> ${p.viaje.fecha_partida} - ${p.viaje.hora_partida}</div>
              <div class="info"><strong>Asiento:</strong> ${p.asiento.numero_asiento}</div>
              <div class="info"><strong>Precio:</strong> $${Math.round(p.montoPago)}</div>
            </div>
          `).join('')}
          <div class="card">
            <h2>Total Pagado: $${Math.round(pasajesConfirmados.reduce((acc, p) => acc + Number(p.montoPago), 0))}</h2>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
 
    //Agrego hora y fecha al nombre del archivopara que sea único
    const now = new Date();
    const fechaHora = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const localPath = FileSystem.documentDirectory + `pasajes_${fechaHora}.pdf`;

    await FileSystem.copyAsync({ from: uri, to: localPath });
    console.log('PDF guardado en:', localPath);

    if (Platform.OS === 'android') {
      await saveToDownloads(localPath, `pasajes_${fechaHora}.pdf`);
    } else {
      await compartirPDF(localPath);
     }    


    //MEnsaje de ok 
    const timeout = setTimeout(() => {
      router.push('/(tabs)/homeUser');
    }, 3000);

    Alert.alert(
      '¡Listo!',
      'Tus pasajes fueron generados con éxito.',
      [
      {
        text: 'Compartir',
        onPress: async () => {
        clearTimeout(timeout);
        await compartirPDF(localPath);
        router.push('/(tabs)/homeUser');
        },
      },
      {
        text: 'Aceptar',
        onPress: () => {
        clearTimeout(timeout);
        router.push('/(tabs)/homeUser');
        },
      },
      ],
      { cancelable: false }
    );
    return;

  
  } catch (e) {
    let errorMessage = 'No se pudo generar el PDF.';
    if (e instanceof Error) {
      errorMessage += ' ' + e.message;
    } else if (typeof e === 'object' && e !== null && 'message' in e) {
      errorMessage += ' ' + String((e as any).message);
    } else {
      errorMessage += ' ' + JSON.stringify(e);
    }
    Alert.alert('Error', errorMessage);
    console.error(e);
  } finally {
    setLoading(false);
  }
};

// Compartir PDF generado
    const compartirPDF = async (filePath: string) => {
      await Sharing.shareAsync(filePath, {
      UTI: 'com.adobe.pdf',
      mimeType: 'application/pdf',
      });
    };


  return (
     <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
       <View style={StyleRuta.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              {estadoUI === 'cargando' && (
                <View style={{ alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#007bff" />
                  <Text style={{ marginTop: 20, fontSize: 18, textAlign: 'center' }}>
                    Procesando tu pago, por favor espera un momento...
                  </Text>
                </View>
              )}

              {estadoUI === 'exito' && pasajesConfirmados.length > 0 && (
                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 5 }}>
                  <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 36, color: 'green' }}>✔</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>
                      ¡Compra completada con éxito!
                    </Text>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 5 }}>
                      Su compra ha sido procesada correctamente. 
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.cardLabel}>Método de pago: <Text style={{ fontWeight: 'bold' }}>PayPal</Text></Text>
                    <Text style={styles.cardLabel}>Nro. de orden PayPal: <Text style={{ fontWeight: 'bold' }}>{token_}</Text></Text>
                  </View>

                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 10 }}>
                    ✅ Pasajes Confirmados ({pasajesConfirmados.length})        
                  </Text>

                  {pasajesConfirmados.map((p, index) => (
                    <View key={p.id_pasaje || index} style={styles.card}>
                      <Text style={styles.cardTitle}>Pasaje #{p.id_pasaje} </Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Ruta:</Text> {p.viaje.localidadOrigen.nombreLocalidad} → {p.viaje.localidadDestino.nombreLocalidad}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Asiento:</Text> <Text style={{ paddingHorizontal: 6, borderRadius: 4 }}>{p.asiento.numero_asiento}</Text></Text>

                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Horarios:</Text> </Text>
                      <Text style={styles.cardItem}>Salida: {p.viaje.fecha_partida} {p.viaje.hora_partida} </Text>
                      <Text style={styles.cardItem}>Llegada: {p.viaje.fecha_llegada} {p.viaje.hora_llegada}</Text>
                      <Text style={styles.cardItem}><Text style={styles.cardLabel}>Precio:</Text>  <Text style={{ textAlign: 'right', color: '#f60' }}>${Math.round(p.montoPago)}</Text></Text>
                     
                     
                    </View>
                  ))}

                  <View style={[{ borderTopColor: '#f60', borderTopWidth: 1, paddingTop: 10, marginTop: 20 }]}>
                    <Text style={styles.cardItem}><Text style={styles.cardLabel}>Nro. de venta:</Text> {id_venta_}</Text>
                    <Text style={[styles.cardItem, { fontSize: 16, fontWeight: 'bold', color: '#f60' }]}>Monto total: $  {Math.round(pasajesConfirmados.reduce((acc, p) => acc + Number(p.montoPago), 0))}</Text>
                  </View>
                    
                 <View style={{ marginTop: 25}}>
                      <TouchableOpacity style={[styles.button, { backgroundColor: '#f60'}]} onPress={handleDescargarPDF}  >
                          <Text style={styles.buttonText}>  {loading ? 'Generando...' : ' Descargar pasaje/s'} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.botonCancelar]} onPress={handleCancelRedirect}>
                        <Text style={[styles.buttonText, { color: '#000' }]}> Volver al inicio</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              )}

              {estadoUI === 'error' && (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 20 }}>
                    ¡Error en el Pago!
                  </Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>{mensajeUI}</Text>
                   <TouchableOpacity style={[styles.botonCancelar]} onPress={handleCancelRedirect}>
                        <Text style={[styles.buttonText, { color: '#000' }]}> Volver al inicio</Text>
                      </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   botonCancelar: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },

  button: {
    padding: 8,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 140,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
    padding: 10,
  },
  imagen: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  scrollContent: {
    paddingBottom: 60,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  },
  cardItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardLabel: {
    fontWeight: '600',
  },
});
