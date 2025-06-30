import { Picker } from '@react-native-picker/picker';
import * as SystemUI from 'expo-system-ui';
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  SystemUI.setBackgroundColorAsync('#ffffff');

  return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
       
         <Text style={styles.hint}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
         <Text style={styles.hint}>Apellido</Text>
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
         <Text style={styles.hint}>Fecha de nacimiento</Text>
        <TextInput style={styles.input} placeholder="Fecha de nacimiento (dd/mm/aaaa)" value={fecha} onChangeText={setFecha} />
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

        </View>
      </ScrollView>
   
  );
}

const styles = StyleSheet.create({
 

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
  container: {
    flex: 1,                  
    justifyContent: 'center', 
    backgroundColor: '#fff',
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
    color: "#666",
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});