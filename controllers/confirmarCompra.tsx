

export default async function capturarOrder(idVenta: number, token: string) {
  try {
    const res = await fetch('https://backend-production-2812f.up.railway.app/api/venta/confirmarVentaPaypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_venta: idVenta, id_orden: token }),
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

