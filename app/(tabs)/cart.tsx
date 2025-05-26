/*import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking, SafeAreaView, ScrollView, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const initialCart = [
  { id: '1', nombre: 'Pasaje Montevideo - Punta del Este', precio: 450 },
  { id: '2', nombre: 'Pasaje Colonia - Montevideo', precio: 390 },
];

const LOGO = require('@/assets/images/logo.jpg'); 

export default function CartScreen() {
  const [cart, setCart] = useState(initialCart);
  const [paying, setPaying] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  const handleRemove = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePayMercadoPago = async () => {
    setPaying(true);
    const mercadoPagoUrl = 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=TU_ID_DE_PREFERENCIA';
    const supported = await Linking.canOpenURL(mercadoPagoUrl);
    setPaying(false);
    if (supported) {
      Linking.openURL(mercadoPagoUrl);
    } else {
      Alert.alert('Error', 'No se pudo abrir Mercado Pago.');
    }
  };

  const handlePayEfectivo = () => {
    Alert.alert('Pago en Efectivo', 'Por favor, acércate a la boletería para abonar tu compra.');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subtitle}>Revisa tus pasajes antes de pagar</Text>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <Text style={styles.itemDetail}>Cantidad: 1</Text>
                </View>
                <Text style={styles.itemPrice}>${item.precio}</Text>
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  <FontAwesome name="trash" size={20} color="#d00" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>El carrito está vacío.</Text>}
          />
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total a pagar:</Text>
            <Text style={styles.totalAmount}>${total}</Text>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={handlePayMercadoPago} disabled={cart.length === 0 || paying}>
            <FontAwesome name="credit-card" size={20} color="#fff" />
            <Text style={styles.payButtonText}>Pagar con Mercado Pago</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cashButton} onPress={handlePayEfectivo} disabled={cart.length === 0}>
            <FontAwesome name="money" size={20} color="#fff" />
            <Text style={styles.payButtonText}>Pago en Efectivo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  container: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 16, margin: 10, elevation: 2 },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', color: '#222' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 18, textAlign: 'center' },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderRadius: 10, padding: 14, marginBottom: 12 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  itemDetail: { fontSize: 13, color: '#888' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 10, color: '#009ee3' },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 18, paddingHorizontal: 4 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#009ee3' },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#009ee3', padding: 18, borderRadius: 12, marginTop: 10, opacity: 1 },
  cashButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4caf50', padding: 18, borderRadius: 12, marginTop: 10, opacity: 1 },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});
*/