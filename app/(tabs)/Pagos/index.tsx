/*import { RelativePathString, useRouter } from "expo-router";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import Payment from "@/components/ui/payment";
import { generatePayment } from "@/app/lib/pagoAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentScreen() {
    const router = useRouter();
    const handlePay = async () =>{
        try{
            const token = await AsyncStorage.getItem('token');
            if(!token){
                Alert.alert('Error', 'Usuario no autenticado, por favor inicie sesion');
                return;
            }

            const response  = await fetch("https://backend-production-2812f.up.railway.app/api/auth/obtenerUsuario", {  
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!response.ok){
                throw new Error('No se pudo obtener el usuario');
            }

            const user = await response.json();
            const { init_point } = await generatePayment(user.id);

            router.push({
                pathname: '/(tabs)/payment/webview' as RelativePathString,
                params: { init_point }
            });

        }catch(error){
            console.error('Error al iniciar el pago:', error);
            Alert.alert('Error', 'No se pudo inicializar el pago');
        };
    }
    const handleCancel = () =>{
        Alert.alert('Cancelado', 'El pago fue cancelado');
    };

   return (
    <View style={styles.container}>
        <Text style={styles.title}>Pagar</Text>
        <Payment onPay={handlePay} onCancel={handleCancel} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
  },
});*/