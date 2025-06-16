import StyleRuta from '@/hooks/styles';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function UserScreen() {

  const [nombre, setNombre] = useState <string | null>(null);
  const [loadingLocalidades, setLoadingLocalidades] = useState(false);

  useEffect(() => {
    const cargarNombre = async () => {
      const nombre = await AsyncStorage.getItem('nombres');
      setNombre(nombre);
    };
    cargarNombre();
  }, []);


  const onclick = () => {
    setLoadingLocalidades(true);
    setTimeout(() => setLoadingLocalidades(false), 2000);
  };

  return (
      <><Modal transparent={true} visible={loadingLocalidades} animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Buscando datos...</Text>
        </View>
      </View>
    </Modal>
    
    <View style={styles.container}>
        <Text style={styles.title}>
          Hola <Text style={styles.highlight}>{nombre}</Text>
        </Text>

        <View  style={styles.espacio} ></View>
      <TouchableOpacity style={styles.linkBox} onPress={() => router.push('/(tabs)/usuario/changePassS')}>
        <Ionicons name="lock-closed-outline" size={24} color="#f97316" style={styles.icon} />
        <Text style={styles.linkText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBox} onPress={() => router.push('/(tabs)/usuario/ticketHistory')}>
        <FontAwesome5 name="ticket-alt" size={24} color="#f97316" style={styles.icon} />
        <Text style={styles.linkText}>Historial de pasajes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBox} onPress={() => router.push('/(tabs)/usuario/editProfileP')}>
        <MaterialIcons name="person-outline" size={24} color="#f97316" style={styles.icon} />
        <Text style={styles.linkText}>Modificar perfil</Text>
      </TouchableOpacity> 

      </View></>
  );
}

const styles = StyleSheet.create({
  espacio:{
     marginTop: 70,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  highlight: {
    color: StyleRuta.primary,
  },

  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,

  },
  linkText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  icon: {
    marginRight: 12,
  },
  
loadingOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
loadingBox: {
  padding: 20,
  backgroundColor: '#333',
  borderRadius: 10,
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  color: '#fff',
  fontSize: 16,
},
});
