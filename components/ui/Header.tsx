import { Image, StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
    const logoLight = require('@/assets/images/logo.jpg');
    const logoDark = require('@/assets/images/logo_oscuro.png');
  
  return (
    <SafeAreaView edges={[]}> 
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Image source={isDark ? logoDark : logoLight}  style={styles.logo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomStartRadius: 1,
    elevation: 8,
    backgroundColor: '#fff',
    paddingTop: 55,
  },
  headerDark: {
    backgroundColor: '#181c24',
  },
  logo: {
    width: 60,
    height: 60,
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

