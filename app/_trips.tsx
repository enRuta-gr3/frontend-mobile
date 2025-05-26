import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TripItem from '@/components/ui/Trips';

//cargar la variable 
import trips from '../json/viajes.json';
import { ImageBackground } from 'expo-image';
import Header from '@/components/ui/Header';

interface Trip {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio: string;
}
       
  
const TripListScreen = () => {
  return (

      <View style={styles.container}> 
          <View style={styles.container}>
              <FlatList
                data={trips as Trip[]} // convierto el json en esto  
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => ( 
                  <TripItem
                    origen={item.origen}
                    destino={item.destino}
                    fecha={item.fecha}
                    hora={item.hora}
                    precio={item.precio}
                    onPress={() => {
                      console.log('Viaje seleccionado:', item);
                    }}
                  />
                )}
              />
            </View>
            <View></View>
          </View> 
                 
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },

   subcontainer: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#fff', borderRadius:15,
    margin:20,
  },
  imagen: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,   //image del bus
    backgroundColor: "rgba(0,0,0,0.4)", // Opacidad del fondo
  },
  content: {
    alignItems: 'center',
  },  

});

export default TripListScreen;