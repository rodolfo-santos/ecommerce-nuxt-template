import Vue from 'vue';
import { IFilters } from '~/models/data';

const filters: IFilters = {
  filters: {
    currencyBRL: (value: number) =>
      value ? Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'N/A',
    percent: (value: number) => `${value}%`,
    truncate: (value: string, length: number = 4, append: string = '.') =>
      value.length > length ? value.substring(0, length) + append : value,
    toFixed: (value: number, fixed: number) => Number(value).toFixed(fixed),
    decimalToPercentage: (value: number) => `${Number(value * 100).toFixed(1)}%`,

    cpf: (value: string) => {
      if (!value) return '***.***.***-**';
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  }
};

Vue.mixin(filters);
export default filters;
