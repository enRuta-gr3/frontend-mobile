import { changePass } from '@/controllers/changePassSer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useState } from "react";
import { GestureResponderEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  SystemUI.setBackgroundColorAsync('#ffffff');
  
   const [documento, setDocumento] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [passwordback, setPasswordback] = useState<string>('');
   const [password2, setPassword2] = useState<string>('');
   const [mensajeError, setmensajeError] = useState<string>('');
   const [mensajeOK, setmensajeOK] = useState<string>('');

  useEffect(() => {
    const cargarDoc = async () => {
      const documento = await AsyncStorage.getItem('ci');
      setDocumento(documento ?? '');
    };
    cargarDoc();
  }, []);   

  function limpiarCampos() {
      setPasswordback('');
      setPassword('');
      setPassword2('');
    }
 const clinkEdit = async (event: GestureResponderEvent) => {
  if (password !== password2) {
    setmensajeError('Las contraseñas no coinciden');
    setTimeout(() => setmensajeError(''), 5000);
    return;
  }

  if (documento.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(documento)) {
      setmensajeError('El correo electrónico no es válido');
        setTimeout(() => setmensajeError(''), 5000);
      return;
    }
  } else {
    const ciRegex = /^\d{6,8}$/; 
    if (!ciRegex.test(documento)) {
      setmensajeError('El número de documento no es válido');
        setTimeout(() => setmensajeError(''), 5000);
      return;
    }
  }
  try {
    const res = await changePass(documento, passwordback, password);  
    if (res.success){
        setmensajeOK('La contraseña se actualizo correctamente');
        limpiarCampos();
        setTimeout(() => setmensajeOK(''), 5000);
     }else{
       setmensajeError('Error 01 - Credenciales incorrectas');
         setTimeout(() => setmensajeError(''), 5000);
     }

  } catch (error) {    
    setmensajeError('Consulte con soporte ' + String(error));
    setTimeout(() => setmensajeError(''), 5000);
  }
};

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1}}>
      <ScrollView >
      <View style={styles.btncontainer}>
          {mensajeOK !== '' && (
        <View style={styles.okBox}>
          <Text style={styles.okText}>{mensajeOK}</Text>
        </View>
         )}

        {mensajeError !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{mensajeError}</Text>
          </View>
        )}
        </View>

        <View style={styles.container}>
        <View style={styles.row}>
           <Text style={styles.texto}>Cliente  </Text>    
           <Text style={styles.txtdoc}> {documento} </Text> 
     
        </View>   

        <TextInput secureTextEntry={true} style={styles.input} placeholder="Contraseña actual" value={passwordback} onChangeText={setPasswordback} />
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} />
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirmación de contraseña" value={password2} onChangeText={setPassword2} />
        
       
        <TouchableOpacity style={styles.button} onPress={clinkEdit}>
          <Text style={styles.buttonText}>Modificar contraseña</Text>
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
  }, 
  btncontainer: {
    padding: 10,
    justifyContent: 'center',
  },
  okBox: {
    backgroundColor: '#d4edda',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  okText: {
    color: '#155724',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#721c24',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


