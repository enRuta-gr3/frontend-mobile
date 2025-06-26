import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function CancelScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18, textAlign: 'center' }}>
        Pago cancelado. Por favor, intentá de nuevo.
      HAY QUE AVISARLE AL BACK END QUE SE CANCELÓ EL PAGO
      </Text>
      <Button title="Volver al inicio" onPress={() => router.push('/homeUser')} />
    </View>
  );
}
