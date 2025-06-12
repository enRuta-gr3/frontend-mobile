import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function SuccessScreen() {
  const { orderId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Pago realizado con éxito!</Text>
      <Text>Order ID: {orderId}</Text>
    </View>
  );
}
