import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { getTicketHistory } from '../../controllers/ticketHistory';
import Header from "@/components/ui/Header";

const TicketHistoryScreen = () => {
  const router = useRouter();
  const tickets = getTicketHistory();
  return (
    <SafeAreaView style={styles.containersafe}>
        <View style={styles.container}>
       
      <View style={styles.header}>       
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial de Pasajes</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <FlatList
        data={tickets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketCard}>
            <Text style={styles.route}>{item.origen} → {item.destino}</Text>
            <Text style={styles.info}>Fecha: {item.fecha} - Hora: {item.hora}</Text>
            <Text style={styles.info}>Precio: {item.precio}</Text>
            <Text style={[styles.estado, item.estado === "Cancelado" && styles.cancelado]}>{item.estado}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay pasajes en el historial.</Text>}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   containersafe: {
    flex: 1,
    paddingTop: 50, 
    backgroundColor: '#fff',
  },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    //paddingTop: 40,
   // paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { flex: 1, fontSize: 22, fontWeight: "bold", textAlign: "center", color: '#222' },
  ticketCard: { backgroundColor: "#f5f5f5", borderRadius: 10, padding: 16, marginHorizontal: 16, marginBottom: 12 },
  route: { fontSize: 18, fontWeight: "bold" },
  info: { fontSize: 14, color: "#333" },
  estado: { fontSize: 14, fontWeight: "bold", color: "green" },
  cancelado: { color: "red" },
});

export default TicketHistoryScreen;
