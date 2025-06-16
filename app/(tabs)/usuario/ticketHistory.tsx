import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getHistoryTicket, TicketHistoryItem } from '../../../controllers/getHistoryTicket';

export default function TicketHistory() {
  const [tickets, setTickets] = useState<TicketHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = await AsyncStorage.getItem('userid');
        if (!userId) {
          setError('No se encontró el usuario.');
          setLoading(false);
          return;
        }
        const res = await getHistoryTicket(userId);
        if (res.success) {
          setTickets(res.data);
        } else {
          setError('No se pudo obtener el historial.');
        }
      } catch (err) {
        setError('Error al cargar los tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={loading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Cargando historial...</Text>
          </View>
        </View>
      </Modal>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <>
        
          <FlatList
            data={tickets}
            keyExtractor={item => item.id_pasaje.toString()}
            renderItem={({ item }) => (
              <View style={styles.ticketCard}>
                <Text style={styles.ticketTitle}>{item.viaje.localidadOrigen.nombreLocalidad} → {item.viaje.localidadDestino.nombreLocalidad}</Text>
                <Text>Fecha: {item.viaje.fecha_partida} - {item.viaje.hora_partida}</Text>
                <Text>Asiento: {item.asiento.numero_asiento}</Text>
                <Text>Precio: ${item.precio}</Text>
              </View>
            )}
            ListEmptyComponent={<Text>No tienes tickets aún.</Text>}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // igual que editProfile
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  loadingBox: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});