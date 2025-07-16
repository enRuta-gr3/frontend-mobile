import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  password2: string;
  setPassword2: (value: string) => void;
  nombre: string;
  setNombre: (value: string) => void;
  apellido: string;
  setApellido: (value: string) => void;
  fecha: string;
  setFecha: (value: string) => void;
  cedula: string;
  setCedula: (value: string) => void;
  descuento: string;
  setDescuento: (value: string) => void;
  onSignup: () => void;
  error: string;
}

export default function SignupScreen({
  email, setEmail,
  password, setPassword,
  password2, setPassword2,
  nombre, setNombre,
  apellido, setApellido,
  fecha, setFecha,
  cedula, setCedula,
  descuento, setDescuento,
  onSignup,
  error, 
}: Props) {
  const limpiarCampos = () => {
      setEmail('');
      setPassword('');
      setPassword2('');
      setNombre('');
      setApellido('');
      setFecha('');
      setCedula('');
      setDescuento('Ninguno');
    };

    useEffect(() => {
      limpiarCampos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
     <KeyboardAvoidingView   style={styles.containerKey}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 120}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formContent}>       
                <Text style={styles.hint}>Nombre</Text>
                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <Text style={styles.hint}>Apellido</Text>
                <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
                <Text style={styles.hint}>Fecha de nacimiento</Text>
              
              <TextInput
                  style={styles.input}
                  placeholder="Fecha de nacimiento (dd/mm/aaaa)"
                  value={fecha}
                  onFocus={() => setShow(true)} />

                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    locale="es-ES"
                    />
                )}
                <Text style={styles.hint}>Correo electrónico</Text>
                <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <Text style={styles.hint}>Cédula</Text>
                <TextInput style={styles.input} placeholder="Cédula" value={cedula} onChangeText={setCedula} keyboardType="numeric" />
                <Text style={styles.hint}>Contraseña</Text>
                <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
                <Text style={styles.hint}>Confirmación de contraseña</Text>
                <TextInput style={styles.input} placeholder="Confirmar contraseña" value={password2} onChangeText={setPassword2} secureTextEntry />

              <Text style={styles.hint}>Tipo de descuento:</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={descuento}
                        onValueChange={(itemValue) => setDescuento(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Ninguno" value="Ninguno" />
                        <Picker.Item label="Jubilado" value="Jubilado" />
                        <Picker.Item label="Estudiante" value="Estudiante" />
                      </Picker>
                    </View>

                <TouchableOpacity style={styles.button} onPress={onSignup}>
                  <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonCancelar} onPress={() => {
                                                                              limpiarCampos();
                                                                              router.back(); 
                                                                            }}>
                  <Text style={styles.methodText}>Cancelar</Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
              </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   
  );
}

const styles = StyleSheet.create({
  containerKey: {
    flex: 1,
  },
pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 20, 

},
picker: {
  height: 50,
  width: '100%',
},
formContent: {
  flexGrow: 1,
  paddingBottom: 40,
},
  container: {
    flex: 1,                  
    justifyContent: 'center', 
    backgroundColor: '#fff',
  },
   scrollContent: {
      flexGrow: 1,
      paddingTop: 10,
    },

  subcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 0, // elimina separación arriba
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 14, borderRadius: 8, backgroundColor: "#f9f9f9" },
  label: { fontWeight: "bold", marginTop: 12 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  radioContainer: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  radioCircle: { height: 18, width: 18, borderRadius: 9, borderWidth: 2, borderColor: "#555", marginRight: 8, backgroundColor: "#fff" },
  radioSelected: { backgroundColor: "#ff6600", borderColor: "#ff6600" },
  radioText: { fontSize: 16 },
  button: { backgroundColor: "#ff6600", padding: 14, borderRadius: 10, marginTop: 24, alignItems: "center" },
  buttonText: { color: "white",  fontSize: 18, fontWeight: "bold" }, 

  titles: { 
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(1, 2, 0)",
    paddingBottom: 50,
  },
  link: {
    alignItems: "stretch",
    color: "rgb(0, 0, 0)",
  },
  linkRe: {
    color: "rgb(245, 74, 0)",
  },
 
  padding20:{
    paddingTop: 10,
     paddingBottom: 0,
  },
  hint: {
    fontSize: 12,
    color: "#000",
    marginBottom: 8,
    fontStyle: "italic"
  },
  texto:{
    marginBottom: 15,
    fontWeight: "bold",
  }, 
  row: {
    flexDirection: 'row',
  
    alignItems: 'center',
    marginBottom: 6,
  },
  txtdoc:{
       marginBottom: 15,
       fontSize: 18,
       fontWeight: "bold",
  },

   methodText: { fontSize: 16 },

  botonCancelar: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});