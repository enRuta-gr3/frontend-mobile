import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Link } from "expo-router";
import { ScrollView } from "react-native";



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
  correo: string;
  setCorreo: (value: string) => void;
  cedula: string;
  setCedula: (value: string) => void;
  descuento: string;
  setDescuento: (value: string) => void;
 
  onSignup: () => void;
}

export default function SignupScreen({
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
  nombre,
  setNombre,
  apellido,
  setApellido,
  fecha,
  setFecha,
  correo, setCorreo,
  descuento, setDescuento, 
  cedula, setCedula,
  onSignup,
}: Props) {
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!nombre || !apellido || !fecha || !correo || !cedula || !password || !password2) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    onSignup();
  };

  return (     
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 0 }}>
        <ThemedView style={styles.container}>


          <Text style={styles.subtitle}>Ingresa tus datos personales para comenzar</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput style={styles.input} placeholder="dd/mm/aaaa" value={fecha} onChangeText={setFecha} />
          <TextInput style={styles.input} placeholder="tu@correo.com" keyboardType="email-address" value={correo} onChangeText={setCorreo} />
          <TextInput style={styles.input} placeholder="Documento" keyboardType="numeric" value={cedula} onChangeText={setCedula} />
          <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmar contraseña" value={password2} onChangeText={setPassword2} secureTextEntry />

          <Text style={styles.label}>Tipo de descuento:</Text>
          {["Ninguno", "Jubilado", "Estudiante"].map((tipo) => (
            <TouchableOpacity key={tipo} style={styles.radioContainer} onPress={() => setDescuento(tipo)}>
              <View style={[styles.radioCircle, descuento === tipo && styles.radioSelected]} />
              <Text style={styles.radioText}>{tipo}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>% Si corresponde:</Text>
          <Text style={styles.hint}>
            (Si selecciona Jubilado o Estudiante, deberá presentar la documentación correspondiente en el mostrador para validar el descuento en sus pasajes)
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          <Link href="./login" style={styles.padding20}>
            <ThemedText type="link" style={styles.link}>
              Ya tengo cuenta.
              <ThemedText type="link" style={styles.linkRe}>
                {" "} Ingresar
              </ThemedText>
            </ThemedText>
          </Link>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10,  zIndex: 2,paddingBottom: 40},
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 14, borderRadius: 8, backgroundColor: "#f9f9f9" },
  label: { fontWeight: "bold", marginTop: 12 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  radioContainer: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  radioCircle: { height: 18, width: 18, borderRadius: 9, borderWidth: 2, borderColor: "#555", marginRight: 8, backgroundColor: "#fff" },
  radioSelected: { backgroundColor: "#555" },
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
});