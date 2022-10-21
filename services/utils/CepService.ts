import axios from 'axios';

export class CepService {
  public get(cep: string) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`);
  }
}
