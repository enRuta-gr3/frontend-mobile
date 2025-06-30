 
import { imagen } from '@/cfg';
import EditProfileScreen from '@/components/ui/EditProfile';
import { editProfile } from '@/controllers/editProfileSer';
import { obtenerUsuario } from '@/controllers/getClient';
import StyleRuta from '@/hooks/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function EditProfile() {
 const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [cedula, setCedula] = useState('');
  const [userid, setUserid] = useState('');
  const router = useRouter();
   const [mensajeError, setmensajeError] = useState<string>('');
  const [mensajeOK, setmensajeOK] = useState<string>('');


   useEffect(() => {

    const cargarDoc = async () => {
      const cedula = await AsyncStorage.getItem('ci');
      const userid = await AsyncStorage.getItem('userId');
      setCedula(cedula ?? '');
      setUserid(userid ?? '');
    
      try {
      const usuarioObtenido = await obtenerUsuario(cedula ?? '');
      setUserid(usuarioObtenido.uuidAuth);
      setNombre(usuarioObtenido.nombres);
      setApellido(usuarioObtenido.apellidos);
      setFecha(formatDateMio(usuarioObtenido.fecha_nacimiento));
      setEmail(usuarioObtenido.email);
      console.log("Usuario obteneido>" + JSON.stringify(usuarioObtenido));

      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };
   cargarDoc ();
  }, []);

  const clickSignup = async () => {
    if (!email || !nombre || !apellido || !cedula) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completá todos los campos requeridos"
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
       setmensajeError("No puede ser menor de 18 años para registrarse");
       setTimeout(() => setmensajeError(''), 3000);
      return;
      } 

    if (!validateEmail(email)) {
       setmensajeError( "Por favor ingrese un correo con formato válido");
       setTimeout(() => setmensajeError(''), 3000);
      return;
    }

    try {
        const res = await editProfile(userid, cedula, nombre, apellido, email, formatoDate(fecha));
      
        if (res.success) {
              setmensajeOK('Se actualizo correctamente el perfil');
              setTimeout(() => setmensajeOK(''), 3000);
        }else{
          console.log(res.message);
          setmensajeError(res.message || 'No se pudo modificar el perfil');
          setTimeout(() => setmensajeError(''), 3000);
        
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
              
  return (
  
        <ImageBackground source={imagen}  style={StyleRuta.imagen}>
          <View style={StyleRuta.overlay} />
          <View style={styles.container}>
           
                  
            <View style={styles.subcontainer}>
              <View style={styles.interno}>
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
                onSignup={clickSignup} error={''} descuento={''} setDescuento={function (value: string): void {
              throw new Error('Function not implemented.');
            } }               
                 />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/usuario/changePassS')}>
          <Text style={styles.buttonText}>Cambiar contraseña </Text>
        </TouchableOpacity>
              </View>
      </View>
    </ImageBackground> 
    
  ); 
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  interno: {
    marginBottom: 10,   
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
  },

}); 