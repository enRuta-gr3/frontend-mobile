import SeatSelector from '@/components/ui/Seat';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function SeatselectorScreen() {

  let { viaje, etapa, tipoViaje, pasajes, fechaVuelta} = useLocalSearchParams();
  const viajes = viaje ? JSON.parse(viaje as string) : null;
 
 return (
    
    <SafeAreaView>
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
