import { useLocalSearchParams } from 'expo-router'; // este es el correcto
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { confirmarVentaPaypal } from '../utils/PaypalIntegration';

export default function Success() {
  const { token: orderId, venta: ventaId } = useLocalSearchParams();
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const procesarPago = async () => {
      if (!orderId || !ventaId) {
        setEstado('error');
        setMensaje('Faltan datos de la orden o de la venta.');
        return;
      }

      try {
        const data = await confirmarVentaPaypal(parseInt(ventaId as string), orderId as string);

        if (data.status !== 'COMPLETED') {
          setEstado('error');
          setMensaje(`La orden no fue completada: ${data.status}`);
          return;
        }

        const confirmRes = await fetch('https://backend-production-2812f.up.railway.app/api/venta/confirmarVentaPaypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_venta: parseInt(ventaId as string),
            id_orden: orderId,
          }),
        });

        const confirmData = await confirmRes.json();

        if (!confirmRes.ok || confirmData.success === false) {
          throw new Error(confirmData.message || 'Error al confirmar venta');
        }

        setEstado('ok');
        setMensaje('¡Gracias! Tu compra fue confirmada con éxito.');
      } catch (error: any) {
        console.error(error);
        setEstado('error');
        setMensaje(error.message || 'Ocurrió un error al procesar el pago.');
      }
    };

    procesarPago();
  }, [orderId, ventaId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {estado === 'cargando' && (
        <>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Procesando tu pago, por favor espera...</Text>
        </>
      )}
      {estado === 'ok' && (
        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}>{mensaje}</Text>
      )}
      {estado === 'error' && (
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Error: {mensaje}</Text>
      )}
    </View>
  );
}
