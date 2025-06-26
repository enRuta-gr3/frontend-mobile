import capturarOrder from '@/controllers/confirmarCompra';
import StyleRuta from '@/hooks/styles';
import { Pasaje } from '@/interface/type';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const id_venta_ = params?.venta || params?.id_venta;
  const token_ = params?.token;

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
        const confirmData = await capturarOrder(idVenta, token);
        alert('Confirmación de pago: ' + JSON.stringify(confirmData, null, 2));
        if (confirmData.success === true) {
          alert('Confirmación de pago exitosa: ' + JSON.stringify(confirmData.data, null, 2));

          setPasajesConfirmados(confirmData.data.pasajes);
          setEstadoUI('exito');
          setMensajeUI(`¡Gracias por tu compra! Tu pago ha sido confirmado con éxito.`);
        } else {
          alert('Error' + JSON.stringify(confirmData));
          setEstadoUI('error');
          setMensajeUI(confirmData.message || 'La confirmación del pago no indicó un estado completado.');
        }
      } catch (error: any) {
        console.error('Error al confirmar el pago en el backend:', error);
        setEstadoUI('error');
        setMensajeUI(error.message || 'Ocurrió un error al procesar tu pago. Por favor, revisa tu estado de cuenta.');
      }
    };

    procesarPagoExitoso();
  }, [id_venta_, token_]);

  const handleCancelRedirect = () => {
    router.back();
  };

  const handleDescargarPDF = () => {
    if (!pasajesConfirmados || pasajesConfirmados.length === 0) {
      router.push({
        pathname: '/DescargaPDF',
        params: { pasajesConfirmados: JSON.stringify(pasajesConfirmados) },
      });
    }
  };

  const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg' };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1}}>
    <ImageBackground source={imagen} resizeMode="cover" style={styles.imagen}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
            {estadoUI === 'cargando' && (
              <View style={{ alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 20, fontSize: 18, textAlign: 'center' }}>
                  Procesando tu pago, por favor espera un momento...
                </Text>
              </View>
            )}

            {estadoUI === 'exito' && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
                  ¡Pago Confirmado!
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
                  {mensajeUI}
                </Text>
               <TouchableOpacity style={styles.button} onPress={handleDescargarPDF}>
                <Text style={styles.buttonText}>Descargar Pasaje PDF</Text>
              </TouchableOpacity>
              </View>
            )}

            {estadoUI === 'error' && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 20 }}>
                  ¡Error en el Pago!
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
                  {mensajeUI}
                </Text>
                 <TouchableOpacity style={styles.button} onPress={handleCancelRedirect}>
                <Text style={styles.buttonText}>Volver al inicio</Text>
              </TouchableOpacity>
              
              </View>
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
    padding: 20,
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
});