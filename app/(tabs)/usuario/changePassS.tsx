 
import ChangePScreen from '@/components/ui/ChangePass';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg' };

export default function ChangePassScreen() {
   return (
    <>  
       <ImageBackground source={imagen} resizeMode="cover" style={styles.imagen}>
          <View style={styles.overlay} />
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              <ChangePScreen />
          </View>
          </View>
        </ImageBackground>
      </>
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