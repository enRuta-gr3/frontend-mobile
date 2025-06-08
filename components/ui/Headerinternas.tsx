import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Headerinternas() {
  return (
    <>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.jpg')} style={styles.logo} />
          <TouchableOpacity onPress={() => alert('Va a la bandeja de notificaciones. \n Upps algo no funciono ')}>
            <FontAwesome name="bell" size={24} color="#333" />
          </TouchableOpacity>
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
   
    backgroundColor: "#fff", 
    paddingTop: 24,
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
