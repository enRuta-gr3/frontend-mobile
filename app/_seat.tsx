import SeatSelector from '@/components/ui/Seat';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useColorScheme } from 'react-native';

export default function SeatselectorScreen() {

  let { viaje, etapa, tipoViaje, pasajes, fechaVuelta} = useLocalSearchParams();
  const viajes = viaje ? JSON.parse(viaje as string) : null;
   const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const logoLight = require('@/assets/images/logo.jpg');
    const logoDark = require('@/assets/images/logo_oscuro.png');
  
 return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      
      <SeatSelector  
      viaje={viajes}
      etapa={etapa as string} 
      tipoViaje={tipoViaje as string}
      fechaVuelta={fechaVuelta as string}
      pasajes={Number(pasajes)}
      />
    </SafeAreaView>
  );
}
