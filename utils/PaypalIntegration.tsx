import { ViajeVenta } from "@/interface/type";

interface ViajeInfo {
  id_viaje: number;
  cantidad: number;
}

//https://en-ruta.vercel.app/

export const handleIntegrationPayPal = async (pago: ViajeVenta[]) => {
  const body = {
          pago: {
            medio_de_pago: {
              id_medio_de_pago: 3,  
              nombre: 'PayPal'
            },
            urlRedir:'enruta://success'
          },
          pasajes: pago.map((item) => ({
            uuidAuth: item.uuidAuth,
            viaje: {
              id_viaje: item.viaje.id_viaje,
              cantidad: item.viaje.cantidad,
            },
          })), // endpasajes
      };

  console.log('Cuerpo del request:', JSON.stringify(body, null, 2));

  const res = await fetch('https://backend-production-2812f.up.railway.app/api/pagos/solicitarParametrosPago', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });


  if (!res.ok) {
    const text = await res.text();
    console.error('Respuesta del servidor (no OK):', res.status, text);
    throw new Error(`Error del servidor: ${res.status} - ${text}`);
  }

  const data = await res.json();
  console.log('Respuesta JSON:', data);

  return data.data.urlPago;
};



export const confirmarVentaPaypal = async (id_venta: number, id_orden: string) => {
  const res = await fetch('https://backend-production-2812f.up.railway.app/api/venta/confirmarVentaPaypal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_venta, id_orden }),
  });
 
  alert("confirmarventa")
  console.log('Cuerpo del request:', JSON.stringify(res, null, 2));
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error confirmando la venta en backend');
  }
  return await res.json();
}; // confirmarVEntaPAypal