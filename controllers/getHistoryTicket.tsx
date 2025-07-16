import axios from 'axios';

export interface TicketHistoryResponse {
  success: boolean;
  message: string;
  errorCode: string | null;
  data: TicketHistoryItem[];
}

export interface TicketHistoryItem {
  id_pasaje: number;
  precio: number;
  viaje: {
    fecha_partida: string;
    hora_partida: string;
    fecha_llegada: string;
    hora_llegada: string;
    localidadOrigen: {
      nombreLocalidad: string;
      departamento: {
        id_departamento: number;
        nombreDepartamento: string;
      };
    };
    localidadDestino: {
      nombreLocalidad: string;
      departamento: {
        id_departamento: number;
        nombreDepartamento: string;
      };
    };
  };
  asiento: {
    numero_asiento: number;
  };
}
export async function getHistoryTicket(userId: string) {
  try {
       const response = await axios.post<TicketHistoryResponse>(
      'https://backend-production-2812f.up.railway.app/api/pasajes/solicitarHistorialPasajes',
      { uuidAuth: userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
   return response.data;

  } catch (error: any) {
    throw error.response;
  }
}         