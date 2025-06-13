import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Slot } from 'expo-router';


import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
 
  return (    
   
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
        <Stack.Screen name="_signup" options={{ title: 'Registro de Usuario' }}  />
        <Stack.Screen name="_trips" options={{ title: 'Viajes' }}  />
         <Stack.Screen name="_seat" options={{ title: 'Seleccionar asientos' }}  />
          <Stack.Screen name="tripSelected" options={{ title: 'Resumen de compra' }}  />
           <Stack.Screen name="_reset" options={{ title: 'Recuperar contraseña' }}  />
             <Stack.Screen name="PaymentScreen" options={{ title: 'Seleccionar metodo de pago' }}  />
       
         <Stack.Screen name="success" options={{ title: 'Pago realizado' }}  />
       
      </Stack>
      
      <StatusBar style="auto" />
    </ThemeProvider>
 
  );
}
