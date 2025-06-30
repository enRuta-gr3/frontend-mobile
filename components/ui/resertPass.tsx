import { resetPass } from "@/controllers/resetPass";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function ResetPassScreen() {
  const [mensajeError, setmensajeError] = useState<string>('');
  const [mensajeOK, setmensajeOK] = useState<string>('');
  const [email, setEmail] = useState<string>('');


  function limpiarCampos() {
      setEmail("");
    } 
 const clickReset = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setmensajeError('El correo electrónico no es válido');
        setTimeout(() => setmensajeError(''), 5000);
      return;
    }
  
  try {
    const res = await resetPass(email);  
 
    if (res.success){
        limpiarCampos();        
        router.push("/EmailVerification");
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
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
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
            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>

            <Text style={styles.paragraph}>
              Ingresá tu dirección de correo electrónico para comenzar el proceso de recuperación.
            </Text>

            <Text style={styles.paragraph}>
              Si el correo corresponde a una cuenta registrada, recibirás un mensaje con un enlace para restablecer tu contraseña.
            </Text>

            <Text style={styles.alert}>
               El enlace tendrá una validez de 30 minutos.
            </Text>

            <Text style={styles.paragraph}>
              Si no ves el correo en tu bandeja de entrada, revisá la carpeta de spam o correo no deseado.
            </Text>

          </View>
                
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
       
        <TouchableOpacity style={styles.button} onPress={clickReset}>
          <Text style={styles.buttonText}>Enviar Contraseña</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10,  zIndex: 2,paddingBottom: 5, backgroundColor: "#fff" },
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
   
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  alert: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#cc3300',
  },
  footer: {
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
    color: '#555',
  },
});