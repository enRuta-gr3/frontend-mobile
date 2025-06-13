export default async function capturarOrder(idVenta: number, token: string) {
  try {
    const res = await fetch('https://backend-production-2812f.up.railway.app/api/venta/confirmarVentaPaypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_venta: idVenta, id_orden: token }),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || `Error del servidor: ${res.status}`);
    }

    if (responseData.status !== 'COMPLETED' || responseData.success === false) {
      throw new Error(responseData.message || `La orden no fue completada: ${responseData.status || 'estado desconocido'}`);
    }

    return responseData;

  } catch (error) {
    console.error('Error capturarOrder:', error);
    throw error;
  }
}

