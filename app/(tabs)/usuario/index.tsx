import { imagen } from '@/cfg';
import UserScreen from '@/components/ui/User';
import StyleRuta from '@/hooks/styles';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function UScreen() {
    
   
   return (
      <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
        <View style={StyleRuta.overlay} />
        <View style={styles.container}>         
          <View style={styles.subcontainer}>
            <UserScreen />
          </View>
        </View>
      </ImageBackground>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
     zIndex: 2,
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // Opacidad del fondo
  },
  content: {
    alignItems: 'center',
  },  
 
});