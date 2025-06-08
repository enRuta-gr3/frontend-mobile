import Headerinternas from '@/components/ui/Headerinternas';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function UsuarioLayout() {
  return (
    <Stack>
     
      <Stack.Screen
        name="index" 
        options={{          
          headerShown: true,
          headerTitle: () => (
             <View style={styles.container}>
                <Headerinternas/>
              </View>
          ),
        }}
      />
      <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/images/logo.jpg')}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cambiar contraseña</Text>
                  </View>
                ),
              }}
            />
      <Stack.Screen
        name="ticketHistory" 
        options={{          
          headerShown: true,
          headerTitle: () => (
             <View style={styles.container}>
                <Headerinternas/>
             </View>
          ),
        }}
      />

      <Stack.Screen
        name="editProfileP" 
        options={{          
          headerShown: true,
           headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/images/logo.jpg')}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Modificar Perfil</Text>
                  </View>
                ),
              }}
      />

      <Stack.Screen
        name="changePassS" 
        options={{          
          headerShown: true,
           headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/images/logo.jpg')}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cambiar contraseña</Text>
                  </View>
                ),
              }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});