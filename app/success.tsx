import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';


export default function SuccessScreen() {
  const { venta: id_venta_, token: token_ } = useLocalSearchParams();

  const [estadoUI, setEstadoUI] = useState<'cargando' | 'exito' | 'error'>('cargando');
  const [mensajeUI, setMensajeUI] = useState('');

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
        if (confirmData.status === 'COMPLETED' && confirmData.success === true) {
          setEstadoUI('exito');
          
          setMensajeUI(`¡Gracias por tu compra! Tu pago ha sido confirmado con éxito. ID de Transacción: ${confirmData.transactionId || 'N/A'}`);
        } else {
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
    router.replace('./homeUser'); 
  };
  const handleSuccessRedirect = () => {
   router.replace('./PasajePdf'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f0f0' }}>
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
          <Button title="Descargar Pasaje" onPress={handleSuccessRedirect} color="#007bff" />
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
          <Button title="Volver a intentar" onPress={handleCancelRedirect} color="#dc3545" />
        </View>
      )}
    </View>
  );
}


