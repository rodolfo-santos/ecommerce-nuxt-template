import axios from 'axios';

const http = axios.create({
    baseURL: 'http://ws.correios.com.br/calculador',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
});

export default {
    buscar: (query: string) => {
        return http.get(`/CalcPrecoPrazo.aspx?${query}`);
    },
};
