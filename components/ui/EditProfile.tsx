import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  email: string;
  setEmail: (value: string) => void;

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

export default function EditProfileScreen({
  email, setEmail,
  nombre, setNombre,
  apellido, setApellido,
  fecha, setFecha,
  cedula,
  onSignup,
  error, 
}: Props) {
 
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1}}>
      <ScrollView >
        <View style={styles.container}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.row}>
           <Text style={styles.texto}>Cédula: </Text>    
           <Text style={styles.txtdoc}> {cedula} </Text> 
       </View>   
       
        <Text style={styles.hint}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <Text style={styles.hint}>Apellido</Text>
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <Text style={styles.hint}>Fecha de nacimiento</Text>
        <TextInput style={styles.input} placeholder="Fecha de nacimiento (dd/mm/aaaa)" value={fecha} onChangeText={setFecha} />
        <Text style={styles.hint}>Correo electrónico</Text>
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>Modificar </Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.botonCancelar} onPress={() => router.back()}>
            <Text style={styles.methodText}>Cancelar</Text>
          </TouchableOpacity>     
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
 container: {
    flex: 1,                  
    justifyContent: 'center', 
     paddingHorizontal: 20,
    backgroundColor: '#fff', 
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
  }
});
