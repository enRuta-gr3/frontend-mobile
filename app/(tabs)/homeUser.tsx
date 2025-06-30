import { imagen } from '@/cfg';
import Header from '@/components/ui/Header';
import SearchScreen from '@/components/ui/Search';
import StyleRuta from '@/hooks/styles';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';


export default function HomeUserScreen() {
   return (
      <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
        <View style={StyleRuta.overlay} />
        <View style={styles.container}>
          <Header />
          <View style={styles.subcontainer}>
           <SearchScreen />
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
    backgroundColor: '#fff', 
    borderRadius:20,
    margin:20,
  }, 
  content: {
    alignItems: 'center',
  },  
});

