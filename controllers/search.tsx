import { router } from "expo-router";

// controlador de para busacar pasajes 
export default class searchTravel {
  
  private origen: { id: number; nombre: string } | null = null;
  private destino: { id: number; nombre: string } | null = null;
  private fecha = '';
  private tipoViaje = '';
  private pasajes = 1;

  setFecha = (value: string) => { this.fecha = value };
  setPasajes = (value: string) => { this.pasajes = parseInt(value) };
  setOrigen = (value: { id: number; nombre: string }) => { this.origen = value;};
  setDestino = (value: { id: number; nombre: string }) => {this.destino = value;};
  setTipoViaje = (value:  string ) => {this.tipoViaje = value;};


  buscarPasajes = () => {
    if (!this.origen || !this.destino) return;

    router.push({
      pathname: '/_trips',
      params: {
        origen: JSON.stringify(this.origen.id),
        destino: JSON.stringify(this.destino.id),
        nomorigen: JSON.stringify(this.origen.nombre),
        nomdestino: JSON.stringify(this.destino.nombre),
        fecha: this.fecha,
        pasajes: this.pasajes.toString(),
        tipoViaje: this.tipoViaje,
      },
    });

    console.log("Buscando pasajes desde",this.tipoViaje);
  };
}