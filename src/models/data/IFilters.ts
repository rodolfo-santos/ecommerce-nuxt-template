export interface IFilters {
  filters: {
    currencyBRL: (value: number) => string;
    percent: (value: number) => string;
    truncate: (value: string, length: number, append: string) => string;
    toFixed: (value: number, fixed: number) => string;
    decimalToPercentage: (value: number) => string;
    cpf: (value: string) => string;
  };
}
