import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

const LeyendaEstadosAsientos = () => {
     const scheme = useColorScheme(); // puede ser 'light' o 'dark'
     const isDark = scheme === 'dark';
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.box, styles.libre]} />
        <Text style={[styles.label, isDark && { color: '#fff' }]}>Libre</Text>
        <View style={[styles.box, styles.ocupado]} />
        <Text style={[styles.label, isDark && { color: '#fff' }]}>Ocupado</Text>
        <View style={[styles.box, styles.seleccionado]} />
        <Text style={[styles.label, isDark && { color: '#fff' }]}>Seleccionado</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 2,
    borderRadius: 4,
  },
  libre: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
  },
  ocupado: {
    backgroundColor: '#555',
  },
  seleccionado: {
    backgroundColor: '#f97316',
  },
  label: {
    marginRight: 2,
    fontSize: 14,
  },
});

export default LeyendaEstadosAsientos;
