import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function PaypalWebView() {
  const router = useRouter();
  const { urlPaypal } = useLocalSearchParams();
  const webviewRef = useRef(null);

 // Controlar navegación y mostrar alertas si hay error
  const handleNavigationStateChange = (navState: { url: string }) => {
    console.log('Navegando a:', navState.url);
    if (navState.url.startsWith('enruta://error')) {
      Alert.alert('Error', 'Ocurrió un error al procesar el pago. Por favor, inténtalo de nuevo.');
      router.replace('/cancel');
    }
    if (navState.url.startsWith('enruta://success')) {
      router.replace('/success');
    }
    if (navState.url.startsWith('enruta://cancel')) {
      router.replace('/cancel');
    }
  };
  
  if (!urlPaypal) {
    return (
      <View style={styles.centered}><Text>No se encontró la URL de PayPal.</Text></View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: urlPaypal as string }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0070ba" />
            <Text style={{ marginTop: 10 }}>Cargando PayPal...</Text>
          </View>
        )}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
          Alert.alert('Error', 'No se pudo cargar la página de PayPal.');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});