import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { imagen } from '@/cfg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StyleRuta from '@/hooks/styles';

export default function NotFoundScreen() {
  return (
    <>
    <ImageBackground source={imagen} resizeMode="cover" style={StyleRuta.imagen}>
            <View style={StyleRuta.overlay} />
            <View style={styles.container}>
               <ThemedView style={styles.container}>
                <ThemedText type="title">No se encontró la pantalla solicitada.</ThemedText>
                <Link href="/" style={styles.link}>
                  <ThemedText type="link">Ir al inicio.</ThemedText>
                </Link>
              </ThemedView>
            </View>
          </ImageBackground>
    
     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
