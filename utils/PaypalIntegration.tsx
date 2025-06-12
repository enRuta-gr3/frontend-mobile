interface ViajeInfo {
  id_viaje: number;
  cantidad: number;
}

export const handleIntegrationPayPal = async (uuidAuth: string, viajes: ViajeInfo[]) => {
  const body = {
    pago: {
      medio_de_pago: {
        id_medio_de_pago: 3,  
        nombre: 'PayPal'
      },
      urlRedir:'enruta://success'
    },
    pasajes: viajes.map((v) => ({
      uuidAuth: uuidAuth,  
      viaje: {
          id_viaje: v.id_viaje,
          cantidad: v.cantidad
        }
    })),
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

