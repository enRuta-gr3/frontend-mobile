import viajes from '../json/viajes.json';

export function getTicketHistory() {
  return viajes.map(v => ({
    ...v,
    estado: 'Viajado', 
    precio: `$${v.precio}`
  }));
}
