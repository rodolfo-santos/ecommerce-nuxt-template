import axios from 'axios';

export class ShippingCalculatorService {
  get(query: string) {
    return axios.get(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${query}`);
  }
}
