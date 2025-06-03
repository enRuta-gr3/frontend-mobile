import config from '../config.json';
const ACCES_TOKEN = config.ACCES_TOKEN;
/*interface PasajeSelect {
  destino: any;
  origen: any;
  name: string;
  price: number;
}*/
export const handleIntegrationMP = async (/*pasajeSelect: PasajeSelect*/) => {
    const preferencia = {
        "items": [
            {
            "id": "Sound system",
          //   "title": `${pasajeSelect.name}`,
          //  "description": `Compra de pasajes para viajar ${pasajeSelect.origen} a ${pasajeSelect.destino}`,
            "category_id": "car_electronics",
            "quantity": 1,
            "currency_id": "$",
           // "unit_price": `${pasajeSelect.price}`
            }
        ]
    }
    try{
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ACCES_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferencia),
        })

        const data = await response.json();
        return data.init_point;

    } catch (error) {
        console.log(error);
    }

}