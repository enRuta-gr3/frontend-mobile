import StyleRuta from '@/hooks/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import searchTravel from '../../controllers/search';

import { listarLocalidades } from '@/controllers/listLocalidades';
import { Localidad } from '@/interface/type';

 

export default function SearchScreen() {


  const buscar = new searchTravel();
  const [tipoViaje, setTipoViaje] = useState<'ida' | 'ida-vuelta'>('ida');
  const [origen, setOrigen] = useState<{ id: number; nombre: string } | null>(null);
  const [destino, setDestino] = useState<{ id: number; nombre: string } | null>(null);
  const [fecha, setFecha] = useState('');
  const [fecha_vuelta, setFechaVuelta] = useState('');
  const [pasajes, setPasajes] = useState('1'); 
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [etapa, setEtapa] = useState('ida');

  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [loadingLocalidades, setLoadingLocalidades] = useState(true);
  
  React.useEffect(() => {
  const fetchLocalidades = async () => {
    try {
      const data = await listarLocalidades();

      const grouped: { [key: string]: Localidad[] } = {};
      data.forEach((loc: Localidad) => {
        const depto = loc.departamento.nombreDepartamento ?? 'Sin depto';
        if (!grouped[depto]) grouped[depto] = [];
        grouped[depto].push(loc);
      });
      Object.values(grouped).forEach((arr) =>
        arr.sort((a, b) => a.nombreLocalidad.localeCompare(b.nombreLocalidad))
      );
      const sortedData = Object.keys(grouped)
        .sort((a, b) => a.localeCompare(b))
        .flatMap((depto) => grouped[depto]);

        console.log('Localidades cargadas:', sortedData);
      setLocalidades(sortedData);
 

    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar las localidades', [ {text: "Aceptar"} ]);
    } finally {
      setLoadingLocalidades(false);
    }
  };

    fetchLocalidades();
  }, []);

  const handleBuscar = () => {   
    if (!origen || !destino || !fecha || !pasajes) {
      Alert.alert("Error", "Por favor, completa todos los campos para de buscar el viaje.", [ { text: "Aceptar" } ]);
    } else {
      buscar.setOrigen(origen);
      buscar.setDestino(destino);
      buscar.setFecha(fecha);
      buscar.setPasajes(pasajes);
      buscar.setTipoViaje(tipoViaje);
      buscar.setEtapa(etapa);
      
      if (tipoViaje === 'ida-vuelta' && !fecha_vuelta) {
        Alert.alert("Error", "Por favor, completa la fecha de regreso para el viaje de ida y vuelta.", [ { text: "Aceptar" } ]);
        return;
      } else if (tipoViaje === 'ida-vuelta') {
        buscar.setFechaVuelta(fecha_vuelta);
      }


      if (origen.id === destino.id) {
        Alert.alert("Error", "El origen y el destino no pueden ser iguales.", [ { text: "Aceptar" } ]);
        return;
      }
      buscar.buscarPasajes();
    }
  };  

  const clickTickets = (value: string) => {
    const pasajes = parseInt(value, 5);
    if (isNaN(pasajes) || pasajes < 1 || pasajes > 5) {
      Alert.alert(
                "Error",
                "Por favor, ingrese un número de pasajes entre 1 y 5.",[ { text: "Aceptar" } ], { cancelable: false });
      setPasajes('');
    } else {
      setPasajes(pasajes.toString());
    }
  }
 

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
  
   const handleDateChangeBack = (event: any, selectedDate2?: Date) => {
    if (selectedDate2) {
      setDate2(selectedDate2);
      const day = selectedDate2.getDate().toString().padStart(2, '0');
      const month = (selectedDate2.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate2.getFullYear();
      setFechaVuelta(`${day}/${month}/${year}`);
      setShow2(false);
    }
  };

  const nextDay = (date: Date): Date => {
     const ndate = new Date(date);
     ndate.setDate(ndate.getDate() + 0)
     return ndate;
  }
  
  return (
      <><Modal transparent={true} visible={loadingLocalidades} animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Cargando viaje...</Text>
        </View>
      </View>
    </Modal>
        
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
       <View style={styles.pickerContainerInput}>
            <Picker
              selectedValue={origen ? JSON.stringify(origen) : ''}
              onValueChange={(value) => {
                if (value) {
                  const selected = JSON.parse(value);
                  setOrigen({ id: selected.id_localidad, nombre: selected.nombreLocalidad });
                } else {
                  setOrigen(null);
                }
              } }>
              <Picker.Item label="¿Desde dónde viajas?" value="" />
              {(() => {
                let lastDepto = '';
                return localidades.map((loc, idx) => {
                  const depto = loc.departamento.nombreDepartamento ?? 'Sin depto';
                  const showDepto = depto !== lastDepto;
                  lastDepto = depto;
                  return [
                    showDepto && (
                      <Picker.Item
                        key={`depto-${depto}-${idx}`}
                        label={`--- ${depto} ---`}
                        value={null}
                        enabled={false}                        
                      />
                    ),
                    <Picker.Item
                      key={loc.id_localidad}
                      label={`${loc.nombreLocalidad}`}
                      value={JSON.stringify(loc)}
                    />
                  ];
                });
              })()}
            </Picker>
        </View>
          <View style={styles.pickerContainerInput}>
        <Picker 
          selectedValue={destino ? JSON.stringify(destino) : ''}
          onValueChange={(value) => {
            if (value) {
              const selected = JSON.parse(value);
              setDestino({ id: selected.id_localidad, nombre: selected.nombreLocalidad });
            } else {
              setDestino(null);
            }
          } }
        >
          <Picker.Item label="¿Desde dónde viajas?" value="" />
              {(() => {
                let lastDepto = '';
                return localidades.map((loc, idx) => {
                  const depto = loc.departamento.nombreDepartamento ?? 'Sin depto';
                  const showDepto = depto !== lastDepto;
                  lastDepto = depto;
                  return [
                    showDepto && (
                      <Picker.Item
                        key={`depto-${depto}-${idx}`}
                        label={`--- ${depto} ---`}
                        value={null}
                        enabled={false}                        
                      />
                    ),
                    <Picker.Item
                      key={loc.id_localidad}
                      label={`${loc.nombreLocalidad}`}
                      value={JSON.stringify(loc)}
                    />
                  ];
                });
              })()}
        </Picker>
        </View>

        {/* Input para la fecha de viaje */}
        <TextInput
          style={styles.input}
          placeholder="Fecha de viaje (dd/mm/aaaa)"
          value={fecha}
          onFocus={() => setShow(true)} />

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            locale="es-ES"
            minimumDate={new Date()} />
        )}

        {/* Input para la fecha de viaje vuelta*/}
        {tipoViaje === 'ida-vuelta' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Fecha de regreso (dd/mm/aaaa)"
              value={fecha_vuelta}
              onFocus={() => setShow2(true)}
              showSoftInputOnFocus={false} />

            {show2 && (
              <DateTimePicker
                value={date2}
                mode="date"
                display="default"
                onChange={handleDateChangeBack}
                locale="es-ES"
                minimumDate={nextDay(date)} />
            )}
          </View>
        )}

        
          <View style={styles.pickerContainer}>
              <Picker selectedValue={pasajes}  onValueChange={(itemValue) => setPasajes(itemValue)} style={styles.picker2}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>


        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar viajes</Text>
        </TouchableOpacity>
      </View></>
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
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
  },
  picker: {
    marginVertical: 10,
    },

  pickerContainerInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 0,
  marginBottom: 10, 
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

  
pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 1, 
  textAlign: 'center',
},
 picker2: { 
  width: '100%',
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
