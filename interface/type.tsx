export interface Localidad {
  id_localidad: number;
  nombreLocalidad: string;
  departamento: Departamento;
};

export interface Departamento {
  id_departamento: number;
  nombreDepartamento: string;
}

export interface Viaje  {
  id_viaje: number;
  fecha_partida: string;
 fecha_llegada: string;
  hora_partida: string;
  hora_llegada: string;
  localidadOrigen: Localidad;
  localidadDestino: Localidad;
  precio_viaje: number;
  estado: string;
  asientosDisponibles: number;
  cantidad?: number;
}   

 export interface Omnibus  {
  nro_coche: number;
  asientos: Asiento[];
  viajes: {
    asientosDisponibles: number;
    estado: string;
  }[];
};

export interface Compra  {
  viaje: Viaje;
  id_usuario: string; 
  asientos: Asiento[]; 
};

export interface Asiento  {
  id_asiento: number;
  numero_asiento: number; 
  id_omnibus: number;
  estado: string; // 'libre', 'ocupado'
};

export interface AsientoData {
  id_disAsiento: number;
  asiento: {
    id_asiento: number;
    numero_asiento: number; 
    id_omnibus: number;
  };
  estado: 'OCUPADO' | 'LIBRE' | 'BLOQUEADO';
}

export interface SeleccionAsientos {
  idViaje: number;
  asientos: number[];
}

export interface ReservaCompleta {
  viajeIda: Viaje;
  asientosIda: number[];
  viajeVuelta?: Viaje;
  asientosVuelta?: number[];
  pasajes: number;
}
export interface ViajeParams {
  origen: string;
  destino: string;
  nomorigen: string;
  nomdestino: string;
  fecha: string;
  pasajes: string;
  tipoViaje: string;
}
export interface ViajeIda {
  origen: string;
  destino: string;
  nomorigen: string;
  nomdestino: string;
  fecha: string;
}

export interface TripItem {
  fecha_partida: string,
  fecha_llegada: string,      
  hora_partida: string;
  hora_llegada: string;
  localidadOrigen: Localidad;
  localidadDestino: Localidad;
  precio_viaje: number;
  estado: string;
  asientosDisponibles: number;
  onPress: () => void;
}

//listar

// Bloqueo

export interface AsientoParaBloquear {
  id_disAsiento: number;
  asiento: Asiento;
  viaje: {
    id_viaje: number;
  };
  idBloqueo: string; //uuid
}

export interface AsientoBloqueadoResponse {
  id_disAsiento: number;
  asiento: {
    id_asiento: number;
    numero_asiento: number;
    id_omnibus: number;
  };
  viaje: {
    id_viaje: number;
    precio_viaje: number;
    asientosDisponibles: number;
  };
  estado: string;
  idBloqueo: string;
}

export interface BloqueoResponse {
  success: boolean;
  message: string;
  errorCode: string | null;
  data: AsientoBloqueadoResponse[];
}

export interface Usuario{
       data(data: any): unknown;
       tipo_usuario: string,
       uuidAuth: string,
       ci: string,
       nombres: string,
       apellidos: string,
       email: string,
       fecha_nacimiento: string,
       eliminado: boolean,
       esEstudiante: boolean,
       esJubilado: boolean,
       estado_descuento: boolean
}

// cambio contrase;a
interface Error<T = null> {
  success: boolean;
  message: string;
  errorCode: string;
  data: T;
}


//pago
 
export interface ViajeVenta {
  uuidAuth: string;
  viaje: {
    id_viaje: number;
    cantidad: number;
  };
}


export interface Pasaje {
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
        nombreDepartamento: string;
      };
    };
    localidadDestino: {
      nombreLocalidad: string;
      departamento: {
        nombreDepartamento: string;
      };
    };
  };
  asiento: {
    numero_asiento: number;
  };
  ciCliente: string;
}
