import StyleRuta from '@/hooks/styles';
import axios from 'axios';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
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
  

  const clickSignup = async () => {
    if (!email || !password || !password2 || !nombre || !apellido || !cedula) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completá todos los campos requeridos"
      );
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert(
        "Campos inválidos",
        "Por favor ingrese un correo con formato válido para la autenticación"
      );
      return;
    }
 
    if (password !== password2) {
          Alert.alert(
            "Campos inválidos",
            "La contraseña ingresada no es igual a la confirmación de contraseña"
          );
          return;
        }

     if (!validarCedulaUruguaya(cedula)) {
        Alert.alert(
            "Campos inválidos",
            "La ci ingresada no es válida. "
          );
      return;
    }

    try {

        console.log("Registrando usuario:", "", email, password, nombre, apellido, fecha, cedula, descuento);
        let esJubilado = false;
        let esEstudiante = false;

        if (descuento === 'Jubilado') {
          esJubilado = true;
        } else if (descuento === 'Estudiante') {
          esEstudiante = true;
        }

      const res = await axios.post('https://backend-production-2812f.up.railway.app/api/auth/registrarUsuario', 
                      {
                        tipo_usuario:"CLIENTE",
                        ci:cedula,
                        nombres: nombre,
                        apellidos: apellido,
                        fecha_nacimiento:"1980-04-20",
                        descuento: descuento,
                        //email: email,
                        contraseña:password,
                        esEstudiante:esEstudiante,
                        esJubilado:esJubilado
                      },
             {headers: {'Content-Type': 'application/json',},}
          );          
          
       if (res.data && res.data.success === true) {
          router.push("/EmailVerification");
       }      

    } catch (error: any) {
         console.log('Error:', error.response )
           if (error.response) {
              Alert.alert('Error:', error.response.data )
                } 
          else {
            console.error('Error:', error.statusText);
          }
    }};    

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  function validarCedulaUruguaya(ci: string): boolean {
      const ciLimpia = ci.replace(/\D/g, '');
      if (ciLimpia.length < 7 || ciLimpia.length > 8) return false;
      
      const digitos = ciLimpia.padStart(8, '0').split('').map(Number);
      const multiplicadores = [2, 9, 8, 7, 6, 3, 4];
      let suma = 0;

      for (let i = 0; i < 7; i++) {
        suma += digitos[i] * multiplicadores[i];
      }

      const digitoVerificador = ((10 - (suma % 10)) % 10);
      return digitoVerificador === digitos[7];
    }

  const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg'}

  return (
  
        <ImageBackground source={imagen}  style={styles.imagen}>
          <View style={styles.overlay} />
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
                  onSignup={clickSignup} error={''}          />

              </View>
      </View>
    </ImageBackground> 
    
  ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
     zIndex: 2,
  },
   subcontainer: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', borderRadius:15,
    margin:20,
  },
  imagen: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // Opacidad del fondo
  },
  content: {
    alignItems: 'center',
  },  
  line: {
    color: StyleRuta.primary,
    paddingTop: 45,
    borderBottomWidth: 1,
  }
}); 