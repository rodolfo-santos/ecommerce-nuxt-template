import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://192.168.0.103:3000/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});
