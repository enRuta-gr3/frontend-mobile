 
import StyleRuta from '@/hooks/styles';
import axios from 'axios';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
 
import EditProfileScreen from '@/components/ui/editProfile';
import { obtenerUsuario } from '@/controllers/getClient';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditProfile() {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [cedula, setCedula] = useState('');
  const [descuento, setDescuento] = useState('Ninguno');
  const router = useRouter();
  
   useEffect(() => {

    const cargarDoc = async () => {
        const cedula = await AsyncStorage.getItem('ci');
        setCedula(cedula ?? '');
      };
    
    cargarDoc();

    const getUsuario = async () => {
      try {
        const ci= '45092234';   
        const usuarioObtenido = await obtenerUsuario(ci);
        setNombre(usuarioObtenido.nombres)
        setApellido(usuarioObtenido.apellidos)
        setFecha(formatDateMio(usuarioObtenido.fecha_nacimiento))
        setEmail(usuarioObtenido.email)

       
        console.log("Usuario obteneido>" +  JSON.stringify(usuarioObtenido))


      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };
    getUsuario();
  }, []);

  const clickSignup = async () => {
    if (!email || !password || !password2 || !nombre || !apellido || !cedula) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completá todos los campos requeridos"
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

    if(!validateDate(fecha)) {
       Alert.alert(
            "Campos inválidos",
            "No puede ser menor de 18 años para registrarse"  
          );
      return;
      } 

    try {

        let esJubilado = false;
        let esEstudiante = false;
        const formFecha = formatoDate(fecha); 
       
        if (descuento === 'Jubilado') {
          esJubilado = true;
        } else if (descuento === 'Estudiante') {
          esEstudiante = true;
        } 

//Mejorar por endoint class
      const res = await axios.post('https://backend-production-2812f.up.railway.app/api/auth/registrarUsuario', 
            {
              tipo_usuario:"CLIENTE",
              ci:cedula,
              nombres: nombre,
              apellidos: apellido,
              fecha_nacimiento: formFecha,
              descuento: descuento,
              email: email,
              esEstudiante:esEstudiante,
              esJubilado:esJubilado
            },
             {headers: {'Content-Type': 'application/json',},}
          );   
          const success = res.data.data.access_token;       
         

       if (res.data.success) { 
          router.push("/emailVerification");
       } else{
          Alert.alert('Error:', res.data.data )
       }   

    } catch (error: any) {
           console.log(error.response)
      if (!error.response?.success) {
            
          Alert.alert('Error:', error.response.data.data);

      }else{
             Alert.alert('No pudimos procesar la solicitud', 'Contacte a atención al cliente');
      }
    }};   




  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  const validateDate = (fecha: string): boolean => {
      const [dia, mes, año] = fecha.split('/');
      const currentYear = new Date(Date.now()).getFullYear();
      if (currentYear - Number(año) >= 18) {
        return true;
      }
      return false;
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
    
  const formatoDate = (fecha: string): string => {
    const [dia, mes, año] = fecha.split('/');
    return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  const formatDateMio = (isoString: string): string =>{
       const partes = isoString.split('T')[0].split('-');
       const [anio, mes, dia] = partes;
      return `${dia}/${mes}/${anio}`; 
      }
              

  const imagen = { uri: 'https://en-ruta.vercel.app/bus2.jpg'}

  return (
  
        <ImageBackground source={imagen}  style={styles.imagen}>
          <View style={styles.overlay} />
          <View style={styles.container}>
            
              <View style={styles.subcontainer}>
              <EditProfileScreen
            email={email}
            setEmail={setEmail}
            nombre={nombre}
            setNombre={setNombre}
            apellido={apellido}
            setApellido={setApellido}
            fecha={fecha}
            setFecha={setFecha}
            cedula={cedula}
            setCedula={setCedula}
            onSignup={clickSignup} error={''} 
            descuento={''} 
            setDescuento={function (value: string): void {
              throw new Error('Function not implemented.');
            } }  />

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