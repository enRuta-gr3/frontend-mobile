import StyleRuta from '@/hooks/styles';
import localidades from '@/json/localidades.json';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import searchTravel from '../../controllers/search';

export default function SearchScreen() {
  const buscar = new searchTravel();
  const [tipoViaje, setTipoViaje] = useState<'ida' | 'ida-vuelta'>('ida');
  const [origen, setOrigen] = useState<{ id: number; nombre: string } | null>(null);
  const [destino, setDestino] = useState<{ id: number; nombre: string } | null>(null);
  const [fecha, setFecha] = useState('');
  const [pasajes, setPasajes] = useState('');

  const handleBuscar = () => {
   
    if (!origen || !destino || !fecha || !pasajes) {
      Alert.alert("Mensaje", "Por favor, completa todos los campos para de buscar el viaje.");
    } else {
      buscar.setOrigen(origen);
      buscar.setDestino(destino);
      buscar.setFecha(fecha);
      buscar.setPasajes(pasajes);
      buscar.setTipoViaje(tipoViaje);

      buscar.buscarPasajes();
    }
  };

  const clickTickets = (value: string) => {
    const pasajes = parseInt(value, 10);
    if (isNaN(pasajes) || pasajes < 1 || pasajes > 10) {
      Alert.alert("Mensaje", 'Por favor, ingrese un número de pasajes entre 1 y 10.');
      setPasajes('');
    } else {
      setPasajes(pasajes.toString());
    }
  }

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      setFecha(`${day}/${month}/${year}`);
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tu viaje <Text style={styles.highlight}>comienza aquí</Text>
      </Text>

      <View style={styles.radioGroup}>
        {['ida', 'ida-vuelta'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={styles.radioContainer}
            onPress={() => setTipoViaje(tipo as 'ida' | 'ida-vuelta')}
          >
            <View style={[styles.radioCircle, tipoViaje === tipo && styles.selectedRadio]} />
            <Text style={styles.radioText}>{tipo === 'ida' ? 'Ida' : 'Ida y vuelta'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Picker
        selectedValue={origen ? JSON.stringify(origen) : ''}
        onValueChange={(value) => {
          if (value) {
            const selected = JSON.parse(value);
            setOrigen({ id: selected.id_localidad, nombre: selected.nombreLocalidad });
          } else {
            setOrigen(null);
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="¿Desde dónde viajas?" value="" />
        {localidades.map((loc) => (
          <Picker.Item
            key={loc.id_localidad}
            label={`${loc.nombreLocalidad} (${loc.departamento ?? 'Sin depto'})`}
            value={JSON.stringify(loc)}
          />
        ))}
      </Picker>

      <Picker
        selectedValue={destino ? JSON.stringify(destino) : ''}
        onValueChange={(value) => {
          if (value) {
            const selected = JSON.parse(value);
            setDestino({ id: selected.id_localidad, nombre: selected.nombreLocalidad });
          } else {
            setDestino(null);
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="¿A dónde viajas?" value="" />
        {localidades.map((loc) => (
          <Picker.Item
            key={loc.id_localidad}
            label={`${loc.nombreLocalidad} (${loc.departamento ?? 'Sin depto'})`}
            value={JSON.stringify(loc)}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Fecha de viaje (dd/mm/aaaa)"
        value={fecha}
        onFocus={() => setShow(true)}
      />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          locale="es-ES"
          minimumDate={new Date()}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Número de pasajes"
        keyboardType="numeric"
        value={pasajes}
        onChangeText={clickTickets}
      />

      <TouchableOpacity style={styles.button} onPress={handleBuscar}>
        <Text style={styles.buttonText}>Buscar pasajes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  picker: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: StyleRuta.primary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
