 
import { imagen } from '@/cfg';
import ResetPassScreen from '@/components/ui/resertPass';
import Styleruta from '@/hooks/styles';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';



export default function ResetPass() {
   return (
    <>  
       <ImageBackground source={imagen} resizeMode="cover" style={Styleruta.imagen}>
          <View style={Styleruta.overlay} />
              <View style={styles.container}>
                <View style={styles.subcontainer}>
                  <ResetPassScreen />
                
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
    marginBottom: 100
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