import { imagen } from '@/cfg';
import StyleRuta from '@/hooks/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { getHistoryTicket, TicketHistoryItem } from '../../../controllers/getHistoryTicket';

export default function TicketHistory() {
  const [tickets, setTickets] = useState<TicketHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
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
          setError('Error de conexión.');             
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <ImageBackground source={imagen}  style={StyleRuta.imagen}>
    <SafeAreaView style={styles.container}>      
        <View style={StyleRuta.overlay} />
        <View style={styles.container2}>
            <Modal transparent={true} visible={loading} animationType="fade">
              <View style={styles.loadingOverlay}>
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="large" color="#fff" />
                  <Text style={styles.loadingText}>Cargando historial...</Text>
                </View>
              </View>
            </Modal>
            {error ? (
               <View style={styles.container2}>
                 <View style={styles.subcontainer}>
                  <View style={styles.emptyContainer}>
                      <FontAwesome5 name="ticket-alt" size={48} color={StyleRuta.primary} />
                      <Text style={styles.emptyTitle}>No tienes pasajes registrados</Text>
                     
                    </View>
                </View>
                </View>
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
                  ListEmptyComponent={
                    !loading ? (
                        <View style={styles.container2}>
                            <View style={styles.subcontainer}>
                              <View style={styles.emptyContainer}>
                                  <FontAwesome5 name="ticket-alt" size={48} color={StyleRuta.primary} />
                                  <Text style={styles.emptyTitle}>No tienes pasajes registrados</Text>
                                  
                                </View>
                            </View>
                            </View>
                    ) : null
                  }
                />
              </>
              )}
        </View>     
     
    </SafeAreaView>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    
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

   container2: {
    flex: 1,
     zIndex: 2,
     marginTop: 20,
     marginBottom: 20,
  },
   subcontainer: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', borderRadius:15,
    margin:20,
  },
  imagen: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // Opacidad del fondo
  },
  content: {
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});