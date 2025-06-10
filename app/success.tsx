import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { confirmarVentaPaypal } from '../utils/PaypalIntegration';

export default function Success() {
  const { token: orderId, venta: ventaId } = useLocalSearchParams();
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const procesarPago = async () => {
      const idVenta = Number(ventaId);
      if (!orderId || !idVenta || isNaN(idVenta)) {
        setEstado('error');
        setMensaje('Faltan o son inválidos los datos de la orden o de la venta.');
        return;
      }

      try {
        const confirmData = await confirmarVentaPaypal(idVenta, orderId as string);     
        if (confirmData.status !== 'COMPLETED' || confirmData.success === false) {
          throw new Error(confirmData.message || `La orden no fue completada: ${confirmData.status || 'estado desconocido'}`);
        }

        setEstado('ok');
        setMensaje('Gracias por tu compra fue confirmada con éxito.');
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
