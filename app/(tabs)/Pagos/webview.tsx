/*import { View, ActivityIndicator, Alert, Text } from "react-native";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";

export default function MercadoPagoView() {
  const { initPoint } = useLocalSearchParams(); 
  const router = useRouter();

  const handleNavigationChange = (navState: any) => {
    const currentUrl = navState.url;

    if (currentUrl.includes("success")) {
      Alert.alert("Pago exitoso", "El pago se completó correctamente.");
      router.replace("/");
    } else if (currentUrl.includes("failure") || currentUrl.includes("error")) {
      Alert.alert("Pago cancelado o rechazado", "La operación no se pudo completar.");
      router.replace("/payment" as RelativePathString);
    }
  };

  if (!initPoint || typeof initPoint !== "string") {
    return <Text>URL inválida</Text>;
  }

  return (
    <WebView
      source={{ uri: initPoint }}
      onNavigationStateChange={handleNavigationChange}
      startInLoadingState
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
}
*/