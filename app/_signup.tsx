import { imagen } from "@/cfg";
import { registrarUsuario } from "@/controllers/signup";
import StyleRuta from "@/hooks/styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SignupScreen from "../components/ui/Signup";

export default function Signup() {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [cedula, setCedula] = useState('');
  const [descuento, setDescuento] = useState('Ninguno');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

  const clickSignup = async () => {   
    
    if (!email || !password || !password2 || !nombre || !apellido || !cedula) {
      Alert.alert("Campos requeridos", "Por favor completá todos los campos requeridos");
      return;
    }

     if (!validateDate(fecha)) {  Alert.alert( "Campos inválidos","No puede ser menor de 18 años para registrarse"  );  return; } 
     if (!validateEmail(email)) { Alert.alert( "Correo inválido", "Por favor ingresá un correo electrónico válido" );  return; }
     if (!validarCedula(cedula)) { Alert.alert( "Campos inválidos", "La ci ingresada no es válida. " );  return; }
     if (password !== password2) {Alert.alert("Campos inválidos", "La contraseña ingresada no es igual a la confirmación de contraseña"); return; }
     if (!validarLargoPass(password)) { Alert.alert("Error", `La contraseña debe tener mínimo 7 caracteres`); return; }

    try {
        setLoading(true);
        let esJubilado = false;
        let esEstudiante = false;
        const formFecha = convertirADateISO(fecha); 
       
        if (descuento === 'Jubilado') {
          esJubilado = true;
        } else if (descuento === 'Estudiante') {
          esEstudiante = true;
        } 
        const res = await registrarUsuario(email, cedula, nombre, apellido, formFecha, esEstudiante, descuento, esJubilado, password) 
        if (res.success) { 
             router.push("/EmailVerification");
          } else{
             setLoading(false);
             Alert.alert('Error 005:', res.data )
          }   
        setLoading(false);
    }catch (error: any) {
        console.log( JSON.stringify(error.response, null, 2))
        setLoading(false);
      if (!error.response?.success) {
        
          Alert.alert('Error 006:', error.response.data.data);
      }else{
           Alert.alert('No pudimos procesar la solicitud', 'Contacte a atención al cliente');
      }
    }
  }  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };  

  const validarLargoPass = (password: string, min = 8, max = 20): boolean => {
      return password.length >= min && password.length <= max;
    };

  const validateDate = (fecha: string): boolean => {
      const [dia, mes, año] = fecha.split('/');
      const birthDate = new Date(Number(año), Number(mes) - 1, Number(dia));
      if (
        isNaN(birthDate.getTime()) ||
        birthDate.getDate() !== Number(dia) ||
        birthDate.getMonth() !== Number(mes) - 1 ||
        birthDate.getFullYear() !== Number(año)
      ) {
        return false; 
      }
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
  };

  function validarCedula(ci: string): boolean {
      const ciLimpia = ci.replace(/\D/g, '');
      if (ciLimpia.length < 7 || ciLimpia.length > 8) return false;
      
      const digitos = ciLimpia.padStart(8, '0').split('').map(Number);
      const multiplicadores = [2, 9, 8, 7, 6, 3, 4];
      let suma = 0;

      for (let i = 0; i < 7; i++) {
        suma += digitos[i] * multiplicadores[i];
      }
      let resto = suma % 10;
      let digitoVerificador = resto === 0 ? 0 : 10 - resto;
      return digitos[7] === digitoVerificador;
    }
    
  const convertirADateISO = (fecha: string): string => {
    const [dia, mes, año] = fecha.split('/');
    return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };
              

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal transparent={true} visible={loading} animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Guardando tus datos...</Text>
            </View>
          </View>
        </Modal>


     <View style={{ flex: 1 }} >
        <ImageBackground source={imagen}  style={StyleRuta.imagen} resizeMode="cover">
          <View style={StyleRuta.overlay} />
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              
              
              <SignupScreen
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  password2={password2}
                  setPassword2={setPassword2}
                  nombre={nombre}
                  setNombre={setNombre}
                  apellido={apellido}
                  setApellido={setApellido}
                  fecha={fecha}
                  setFecha={setFecha}
                  cedula={cedula}
                  setCedula={setCedula}
                  descuento={descuento}
                  setDescuento={setDescuento}
                  onSignup={clickSignup} error={''} />
              </View>
      </View>
      
    </ImageBackground> 
    </View>
    </SafeAreaView>

    
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  subcontainer: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    marginTop: 10,
    marginBottom: 60,
  },
  content: {
    alignItems: 'center',
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


