/*import StyleRuta from '@/hooks/styles';
import { Pasaje } from '@/interface/type';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props { 
  pasajesConfirmados: Pasaje[];
  
}
export default function PasajesConfirmados({ pasajesConfirmados}: Props) {

alert('Pasajes confirmados-------------------------------------------: ' + JSON.stringify(pasajesConfirmados, null, 2));
return (
    <View>
      {Array.isArray(pasajesConfirmados) && pasajesConfirmados.map((pasaje, index) => (
            <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 8 }}>
                <Text style={{ fontSize: 16 }}>Pasaje #{pasaje.id_pasaje}</Text>
                <Text>Origen: {pasaje.viaje?.localidadOrigen?.nombreLocalidad ?? 'N/A'}</Text>
                <Text>Destino: {pasaje.viaje?.localidadDestino?.nombreLocalidad ?? 'N/A'}</Text>
                <Text>Salida: {pasaje.viaje?.fecha_partida} - {pasaje.viaje?.hora_partida}</Text>
                <Text>Llegada: {pasaje.viaje?.fecha_llegada} - {pasaje.viaje?.hora_llegada}</Text>
                <Text>Precio: ${pasaje.precio}</Text>
            </View>
            ))}

     
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
  button: {
    backgroundColor: StyleRuta.primary,
    padding: 8,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});*/