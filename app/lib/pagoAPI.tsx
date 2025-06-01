/*import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "https://backend-production-2812f.up.railway.app/api/pagos";  //backend-production-2812f.up.railway. eso  va a cambiar cuando este le endpoint de pago

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return{
    "contet-type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}
export async function generatePayment(usuarioId: number): Promise<{ init_point: string; venta_id: string }> {
  const response = await fetch(`${API_BASE}/generar-pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuarioId }), 
  });
  
  const data = await response.json();
  return { init_point: data.init_point, venta_id: data.venta_id };
}


export async function confirmPayment(ventaId: number, datosPago: any) {
  const res = await fetch(`${API_BASE}/confirmarPago`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ventaId, datosPago }),
  })
  if (!res.ok) {
    throw new Error("Error al confirmar pago");
  }

  return await res.json(); 
}
*/