const CLIENT_ID = 'ATUNaGK47J9j1jlkjrSsSfLG8hilQs9-5xMIL3APcMxdjguExhGZlk2_0aCrDbClDQTAmCnO-C4Q5pOZ'; //back
const SECRET = 'EOUblpOaHBWbSydObD2LRWe379rQFKYNbx0U_XH2mC-4pA0Vs_j0ZCFbz1cBcUNc7_JlkZRuRmdDBiQi'; //back

const API_URL = 'https://api-m.sandbox.paypal.com';  // back


export const handleIntegrationPayPal = async () => {
  try {
    const credentials = btoa(`${CLIENT_ID}:${SECRET}`);

    const tokenRes = await fetch(`${API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) throw new Error('Error al obtener token');
    const tokenData = await tokenRes.json();

    const orderRes = await fetch(`${API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: '903' },
          description: 'Compra de pasajes de Punta del Este a Salto',
        }],
        application_context: {
          return_url: 'enruta://success',
          cancel_url: 'enruta://cancel',
        },
      }),
    });

    if (!orderRes.ok) throw new Error('Error al crear orden');
    const orderData = await orderRes.json();

    const approvalLink = orderData.links.find((link: any) => link.rel === 'approve')?.href;

    return approvalLink;

  } catch (error: any) {
    console.error('Error al crear orden PayPal:', error.message);
    throw error;
  }
};

export const captureOrder = async (orderId: string) => {
  try {
    const credentials = btoa(`${CLIENT_ID}:${SECRET}`);

    const tokenRes = await fetch(`${API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) throw new Error('Error al obtener token');
    const tokenData = await tokenRes.json();

    const captureRes = await fetch(`${API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!captureRes.ok) throw new Error('Error al capturar orden');
    const captureData = await captureRes.json();
    console.log('Esto es capture',captureData);
    console.log('esto es status',captureData.status);
    return captureData;

  } catch (error: any) {
    console.error('Error al capturar orden PayPal:', error.message);
    throw error;
  }
};


