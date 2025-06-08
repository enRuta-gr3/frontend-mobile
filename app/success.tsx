import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';

import { captureOrder } from '../utils/PaypalIntegration';

export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        console.log('Parámetros recibidos en success:', params);

        // PayPal puede devolver token o orderId, chequeamos ambos
        const orderId = params.token || params.orderId;
        if (!orderId) throw new Error('No se recibió el ID de orden');

        console.log('Intentando capturar orden con ID:', orderId);

        const result = await captureOrder(orderId as string);

        console.log('Resultado captura:', result);

        if (result.status === 'COMPLETED') {
          Alert.alert('Pago exitoso', 'Gracias por tu compra');
        } else {
          Alert.alert('Pago no completado', `Estado: ${result.status}`);
        }

        router.replace('./homeuser');  // ruta absoluta para evitar problemas

      } catch (error: any) {
        console.error('Error capturando orden:', error);
        Alert.alert('Error', 'No se pudo procesar el pago');
        router.replace('./homeuser');
      }
    };

    confirmPayment();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Confirmando pago...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
