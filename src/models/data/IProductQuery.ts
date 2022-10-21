/* eslint-disable camelcase */
import { IProduct } from '~/models/data';

export interface IProductQuery {
  q?: string;
  _page?: number;
  _limit?: number;
  categories_like?: string[];
  price_gte?: number;
  price_lte?: number;
  _sort?: keyof IProduct;
  _order?: 'asc' | 'desc';
}
