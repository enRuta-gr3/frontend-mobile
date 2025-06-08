import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useState } from "react";
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
  SystemUI.setBackgroundColorAsync('#ffffff');
  
   const [documento, setDocumento] = useState<string | null>(null);

  useEffect(() => {
    const cargarDoc = async () => {
      const documento = await AsyncStorage.getItem('ci');

      setDocumento(documento);
    };
    cargarDoc();
  }, []);
  
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1}}>
      <ScrollView >
        <View style={styles.container}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.row}>
           <Text style={styles.texto}>Cliente  </Text>    
           <Text style={styles.txtdoc}> {documento} </Text> 
     
        </View>   


        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Fecha de nacimiento (dd/mm/aaaa)" value={fecha} onChangeText={setFecha} />
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        
       
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>Modificar </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,                  
    justifyContent: 'center', 
     paddingHorizontal: 20,
    backgroundColor: '#fff', 
  },  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
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

  }, 
  row: {
    flexDirection: 'row',
  
    alignItems: 'center',
    marginBottom: 6,
  },
  txtdoc:{
       marginBottom: 15,
       fontSize: 16
  }
});