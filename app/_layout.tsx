import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { NotificationProvider } from '@/hooks/useNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    const userId = await AsyncStorage.getItem('userid');
   
    if (userId) {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      };
    } else {
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: true,
        shouldShowBanner: false,
        shouldShowList: false,
      };
    }
  },
});


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NotificationProvider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar
          style={isDark ? 'light' : 'dark'}
          backgroundColor={isDark ? '#000000' : '#FFFFFF'}
          translucent={false}
        />
        <Stack
          screenOptions={{
            headerShown: true,
            statusBarStyle: isDark ? 'light' : 'dark',
            statusBarTranslucent: false,
            statusBarBackgroundColor: "red",
            navigationBarColor: "000",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="_signup" options={{ title: 'Registro de Usuario' }} />
          <Stack.Screen name="_reset" options={{ title: 'Recuperar contraseña' }} />
          <Stack.Screen name="_trips" options={{ title: 'Viajes' }} />
          <Stack.Screen name="_seat" options={{ title: 'Seleccionar asientos' }} />
          <Stack.Screen name="tripSelected" options={{ title: 'Resumen de compra' }} />
          <Stack.Screen name="success" options={{ title: 'Resultado del pago' }} />
          <Stack.Screen name="PaymentScreen" options={{ title: 'Método de pago' }} />
          <Stack.Screen name="Paypal" options={{ title: 'Método de pago PayPal' }} />
          <Stack.Screen name="DescargarPDF" options={{ title: 'Descargar pasajes en PDF' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </NotificationProvider>
  );
}
