import config from '../config.json'; //me pasa el back
const ACCES_TOKEN = config.ACCES_TOKEN; //me pasa el back

export const handleIntegrationMP = async () => {
  const preferencia = {
    items: [
      {
        id: "Sound system",
        title: "Compra de pasajes", //me pasa el back
        description: "Compra de pasajes para viajar desde Punta del Este a Salto", //me pasa el back
        category_id: "services",
        quantity: 1, //me pasa el back
        currency_id: "UYU", //me pasa el back
        unit_price: 903 //me pasa el back
      }
    ]
  };

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCES_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferencia),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error en la respuesta de MP:", data);
      return null;
    }

    return data.init_point;

  } catch (error) {
    console.error("Error en la integración con MP:", error);
    return null;
  }
};
