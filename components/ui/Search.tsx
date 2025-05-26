// src/views/SearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import  searchTravel  from '../../controllers/search';
import StyleRuta from '@/hooks/styles';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import Suscribir from './Suscribir';


export default function SearchScreen() { 
  const buscar = new searchTravel();
  const [tipoViaje, setTipoViaje] = useState<'ida' | 'ida-vuelta'>('ida');    
  return (
    <View>
      <Text style={styles.title}>Tu viaje <Text style={styles.highlight}>comienza aquí</Text></Text>    
      <View style={styles.radioGroup}> 
        <TouchableOpacity style={styles.radioContainer} onPress={() => setTipoViaje('ida')}>
          <View style={[  styles.radioCircle, tipoViaje === 'ida' && styles.selectedRadio, ]} />
          <Text style={styles.radioText}>Ida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioContainer} onPress={() => setTipoViaje('ida-vuelta')}>
          <View style={[styles.radioCircle, tipoViaje === 'ida-vuelta' && styles.selectedRadio,]}/>
          <Text style={styles.radioText}>Ida y vuelta</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="¿Desde dónde viajas?" onChangeText={buscar.setOrigen} />
      <TextInput style={styles.input} placeholder="¿A dónde viajas?" onChangeText={buscar.setDestino} />
      <TextInput style={styles.input} placeholder="Fecha de viaje (dd/mm/aaaa)" onChangeText={buscar.setFecha} />
      <TextInput style={styles.input} placeholder="Número de pasajes" keyboardType="numeric" onChangeText={buscar.setPasajes} />
      <TouchableOpacity style={styles.button} onPress={buscar.buscarPasajes}>
        <Text style={styles.buttonText}>Buscar pasajes</Text>
      </TouchableOpacity>     
    </View>

    
  );
}

const styles = StyleSheet.create({
 
  title: { fontSize: 24, fontWeight: 'bold' },
  highlight: { color: StyleRuta.primary },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: StyleRuta.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    backgroundColor: StyleRuta.primary,
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: StyleRuta.primary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
