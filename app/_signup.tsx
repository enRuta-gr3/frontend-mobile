import React, { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { View } from 'react-native';
import StyleRuta from '@/hooks/styles';
import { ImageBackground, StyleSheet } from "react-native";
import SignupScreen from "../components/ui/Signup"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nombre, setNombre] = useState(""); 
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  

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
 
   /* if (password !== password2) {
          Alert.alert(
            "Campos inválidos",
            "La contraseña ingresada no es igual a la confirmación de contraseña"
          );
          return;
        }*/
    try {
    /*   await axios.post("https://reqres.in/api/signup", {
            email,
            password,       
            nombre,
            apellido,
            cedula,
            
              });*/
        Alert.alert("Registro exitoso", "Revisá tu bandeja de entrada y seguí el enlace para confirmar tu dirección de email.");
      //  router.push("/user");
    } catch (err) {
      Alert.alert("Error de autenticación", "Credenciales incorrectas");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg'}

  return (

    <ImageBackground source={imagen} resizeMode='cover' style={styles.imagen}>
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
            cedula={cedula}
            setCedula={setCedula}
            onSignup={clickSignup} 
            fecha={""} 
            setFecha={function (value: string): void {
                     throw new Error("Function not implemented.");
                   } } 
            correo={""} 
            setCorreo={function (value: string): void {
                      throw new Error("Function not implemented.");
                     } } 
            descuento={""} 
            setDescuento={function (value: string): void {
                     throw new Error("Function not implemented.");
                  } } />   

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