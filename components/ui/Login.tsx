import { logoDark, logoLight } from '@/cfg';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import StyleRuta from '@/hooks/styles';
import { Input } from '@rneui/themed';
import { Link } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image, SafeAreaView, StyleSheet, Text,
  TouchableOpacity, View, useColorScheme
} from 'react-native';

type Props = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
   loading: boolean;
};

export default function LoginLayout({ email, setEmail, password, setPassword, onLogin }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [loading, setLoading] = React.useState(false);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFF', dark: '#161719' }}
        headerImage={
          <View style={styles.logoWrapper}>
            <Image source={isDark ? logoDark : logoLight} style={styles.reactLogo} />
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <Text style={[styles.titles, { color: isDark ? '#fff' : '#000' }]}>
            Bienvenido!
          </Text>
        </ThemedView>

        <Input
          placeholder="Email o Documento"
          leftIcon={{ type: 'font-awesome', name: 'user', color: isDark ? '#fff' : '#000' }}
          value={email}
          onChangeText={setEmail}
          inputStyle={{ color: isDark ? '#fff' : '#000' }}
        />
        <Input
          placeholder="Contraseña"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'key', color: isDark ? '#fff' : '#000' }}
          value={password}
          onChangeText={setPassword}
          inputStyle={{ color: isDark ? '#fff' : '#000' }}
        />

        <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" /> 
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <Link href="/_signup">
          <Text style={[styles.link, { color: isDark ? '#fff' : '#000' }]}>
            ¿No tenés una cuenta?
            <Text style={styles.linkRe}>     Registrate</Text>
          </Text>
        </Link>
        <Link href="/_reset">
          <Text style={[styles.link, { color: isDark ? '#fff' : '#000',textDecorationLine: 'underline'  }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </Link>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  reactLogo: { height: 200, width: 200, resizeMode: 'contain' },
  titles: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  link: { marginTop: 10, fontSize: 15},
  linkRe: { color: "rgb(245, 74, 0)" },
  button: {
    backgroundColor: StyleRuta.primary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold'
  },
});
