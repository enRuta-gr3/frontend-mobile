import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';


export default function TripResultsScreen() {
  const router = useRouter();

  const handleSelectTrip = (id_viaje: number) => {
   // router.push(`/viaje/${id_viaje}`);
  };

  function convertirADepartamento(departamento: string): import("../../../interface/type").Departamento {
    throw new Error('Function not implemented.');
  }

  return (
    
    <SafeAreaView style={styles.container}>
   <Text>NO esta pronta la pantalla</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
});