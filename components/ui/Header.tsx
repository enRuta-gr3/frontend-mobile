import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {    
  return (
    <><SafeAreaView  edges={[ ]}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.jpg')} style={styles.logo} />
        {/*  <TouchableOpacity onPress={() => alert('Va a la bandeja de notificaciones. \n Upps algo no funciono ')}>
            <FontAwesome name="bell" size={24} color="#333" />
          </TouchableOpacity>*/}
        </View>
      </SafeAreaView>
      </>

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
    backgroundColor: "#fff", 
    paddingTop: 55,
  },
  logo: {
    width: 60,
    height: 60
   // borderRadius: 20,
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
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

