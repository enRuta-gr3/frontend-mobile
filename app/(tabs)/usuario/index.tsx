import UserScreen from '@/components/ui/User';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg' };

export default function UScreen() {
  const { isLogged } = useRequireAuth();
   return (
      <ImageBackground source={imagen} resizeMode="cover" style={styles.imagen}>
        <View style={styles.overlay} />
        <View style={styles.container}>
         
          <View style={styles.subcontainer}>
            <UserScreen />
            <View style={styles.line}></View>
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
  line: {
    color: "rgba(192, 9, 9, 0.97)",
    paddingTop: 45,
    borderBottomWidth: 1,
  }
});