import { useMemo } from 'react';

export const useDurationTrip = (
  fecha_partida: string,
  hora_partida: string,
  fecha_llegada: string,
  hora_llegada: string
): string => {
  const duracion = useMemo(() => {
    try {
      const [dia1, mes1, anio1] = fecha_partida.split("/").map(Number);
      const [h1, m1] = hora_partida.split(":").map(Number);
      const [dia2, mes2, anio2] = fecha_llegada.split("/").map(Number);
      const [h2, m2] = hora_llegada.split(":").map(Number);

      const inicio = new Date(anio1, mes1 - 1, dia1, h1, m1);
      const fin = new Date(anio2, mes2 - 1, dia2, h2, m2);

      const diffMs = fin.getTime() - inicio.getTime();
      if (diffMs < 0) return "Tiempo inválido";

      const totalMin = Math.floor(diffMs / 1000 / 60);
      const horas = Math.floor(totalMin / 60);
      const minutos = totalMin % 60;

      return `${horas}h ${minutos}m`;
    } catch (e) {
      return "Error de formato";
    }
  }, [fecha_partida, hora_partida, fecha_llegada, hora_llegada]);

  return duracion;
};

