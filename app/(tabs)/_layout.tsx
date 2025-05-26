import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import StyleRuta from '@/hooks/styles';


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
      name="ticketHistory"
      options={{
        title: 'Historial',
        tabBarIcon: ({ color, size }) => (<FontAwesome5 name="history" size={size} color={color} /> ),
      }}
      />
    </Tabs>
  );
}
