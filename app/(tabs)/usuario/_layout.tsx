import Headerinternas from '@/components/ui/Headerinternas';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function UsuarioLayout() {

    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const logoLight = require('@/assets/images/logo.jpg');
    const logoDark = require('@/assets/images/logo_oscuro.png');
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
                      source={isDark ? logoDark : logoLight}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>Cambiar contraseña</Text>
                  </View>
                ),
              }}
            />
      <Stack.Screen
        name="ticketHistory"  
        options={{          
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={isDark ? logoDark : logoLight}
                style={{ width: 30, height: 30, marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>Historial de Pasajes</Text>
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
                      source={isDark ? logoDark : logoLight}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>Modificar Perfil</Text>
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
                      source={isDark ? logoDark : logoLight}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>Cambiar contraseña</Text>
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