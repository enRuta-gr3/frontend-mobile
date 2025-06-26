import { Image, StyleSheet, useColorScheme, View } from 'react-native';

export default function Headerinternas() {
      const scheme = useColorScheme();
      const isDark = scheme === 'dark';
      const logoLight = require('@/assets/images/logo.jpg');
      const logoDark = require('@/assets/images/logo_oscuro.png');

  return (
    <>
        <View style={styles.header}>
          <Image source={isDark ? logoDark : logoLight} style={styles.logo} />
        </View>   
      </>

  ); 
} 

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderBottomStartRadius: 1, 
    paddingTop: 24,
    paddingBottom: 12,
  },
  logo: {
    width: 60,
    height: 60
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
