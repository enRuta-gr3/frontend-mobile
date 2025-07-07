import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function PaypalWebView() {
  const router = useRouter();
  const { urlPaypal } = useLocalSearchParams();
  const webviewRef = useRef(null);

  console.log('URL de PayPal:', urlPaypal);

    const handleNavigationStateChange = (navState: { url: string }) => {
    if (navState.url.startsWith('enruta://success')) {
      router.replace('/success');
    }
  };
  
  if (!urlPaypal) {
    return (
      <View style={styles.centered}>
        <Text> Algo salió mal con PayPal. Vuelva a intentar</Text>
        <Button title="Volver al inicio" onPress={() => router.push('/homeUser')} />
      </View>
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
          Alert.alert('Error', 'No se pudo cargar la página de PayPal. REintente más tarde.');
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