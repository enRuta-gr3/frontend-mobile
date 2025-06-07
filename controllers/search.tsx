import { router } from "expo-router";

// controlador para buscar pasajes
export default class searchTravel {
  private origen: { id: number; nombre: string } | null = null;
  private destino: { id: number; nombre: string } | null = null;
  private fecha = '';
  private fecha_vuelta = '';
  private tipoViaje = '';
  private pasajes = 1;
  private etapa='';

  setFecha = (value: string) => { this.fecha = value };
  setFechaVuelta = (value: string) => { this.fecha_vuelta = value };
  setPasajes = (value: string) => { this.pasajes = parseInt(value) };
  setOrigen = (value: { id: number; nombre: string }) => { this.origen = value };
  setDestino = (value: { id: number; nombre: string }) => { this.destino = value };
  setTipoViaje = (value: string) => { this.tipoViaje = value };
  setEtapa = (value: string) => { this.etapa = value };

  viajeIda = () => ({
    origen: this.origen?.id.toString() ?? '',
    destino: this.destino?.id.toString() ?? '',
    nomorigen: this.origen?.nombre ?? '',
    nomdestino: this.destino?.nombre ?? '',
    fecha: this.fecha,
    etapa: this.etapa,
  });
  

  buscarPasajes = () => {
    if (!this.origen || !this.destino) return;

    router.push({
      pathname: '/_trips',
      params: {
        viajeIda: JSON.stringify(this.viajeIda()),
        tipoViaje: this.tipoViaje,
        pasajes: this.pasajes.toString(),
        etapa: this.etapa,
        ...(this.tipoViaje === 'ida-vuelta' ? { fechaVuelta: this.fecha_vuelta } : {}),
      }
    });
  };
}
