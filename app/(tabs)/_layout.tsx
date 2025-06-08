import { HapticTab } from '@/components/HapticTab';
import StyleRuta from '@/hooks/styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
       screenOptions={{
       tabBarActiveTintColor: StyleRuta.primary,
       headerShown: false, 
       tabBarButton: HapticTab,
      
      }}
    > 
      <Tabs.Screen
      name="index"
      options={{
        title: 'Inicio',
        href: null,          
      }}
      />
      <Tabs.Screen
      name="homeUser"
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) =>  (<FontAwesome name="home" size={size} color={color} /> ),
      }}
      />
      <Tabs.Screen
      name="logout"      
      options={{
        href:"./logout",
        title: 'Cerrar sesión',
        tabBarIcon: ({ color, size }) => (<FontAwesome5 name="window-close" size={size} color={color} /> ),
      }}
      />
      <Tabs.Screen
      name="cart"
      options={{
        href: null,
        title: 'carrtio',   
        tabBarBadge: 2,
        tabBarBadgeStyle:{
        backgroundColor: "tomato",
        color:"white"
        },           
        tabBarIcon: ({ color, size }) => (<FontAwesome5 name="shopping-cart" size={size} color={color} /> ),
      }}
      />
      <Tabs.Screen
      name="usuario"
      options={{
        title: 'Mi perfil',
        tabBarIcon: ({ color, size }) => (<FontAwesome6 name="user-large" size={size} color={color} /> ),
      }}
      />
      

     
    </Tabs>
  );
}