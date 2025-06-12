import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StyleRuta from '@/hooks/styles';
import { Input } from '@rneui/themed';
import { Link } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onLogin: () => void;
}

export default function LoginLayout({ email, setEmail, password, setPassword, onLogin }: Props) {
  return (
     <SafeAreaView style={styles.container}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.logoWrapper}>
          <Image source={require('@/assets/images/logo.jpg')} style={styles.reactLogo} />
        </View>
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titles}>Bienvenido!</ThemedText>
      </ThemedView>

      <Input placeholder="Email" leftIcon={{ type: 'font-awesome', name: 'user' }} value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" secureTextEntry leftIcon={{ type: 'font-awesome', name: 'key' }} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}> Iniciar Sesión</Text>
      </TouchableOpacity>

      <Link href="/_signup" >
        <ThemedText type="link" style={styles.link}>¿No tienen una cuenta? 
          <ThemedText type="link" style={styles.linkRe}> Regístrate </ThemedText>
          </ThemedText>
      </Link>
      <Link href='/_reset'>
        <ThemedText type="link" style={styles.link}>¿Olvidaste tu contraseña? 
      </ThemedText>
      </Link>
    </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: 50, 
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  reactLogo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(1, 2, 0)',
  },
  link: {
    alignItems: 'stretch',
    color: 'rgb(0, 0, 0)',
  },
  linkRe:{
    color: "rgb(245, 74, 0)",
  },
   button: {
      backgroundColor: StyleRuta.primary,
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
}); 
