import { router } from "expo-router";

// controlador de para busacar pasajes 
export default class searchTravel {
  private origen = '';
  private destino = '';
  private fecha = '';
  private pasajes = 1;

  setOrigen = (value: string) => { this.origen = value };
  setDestino = (value: string) => { this.destino = value };
  setFecha = (value: string) => { this.fecha = value };
  setPasajes = (value: string) => { this.pasajes = parseInt(value) };

  buscarPasajes = () => {
   router.push('/_trips');

    console.log("Buscando pasajes con:", {
      origen: this.origen,
      destino: this.destino,
      fecha: this.fecha,
      pasajes: this.pasajes
    });
  };
}
