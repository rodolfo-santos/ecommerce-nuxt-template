import { IProduct } from '@/models/data';

export interface ICartStore {
  productList: IProduct[];

  isEmptyCart: boolean;
  cartTotalValue: number;
  productListLength: number;

  setProductList(productList: IProduct[]): void;
  insertOnProductList(product: IProduct): void;

  deleteFromProductList(index: number): void;
  deleteAllFromProductList(): void;
  addToCart(product: IProduct): void;
  emptyCart(): void;
  removeFromCart(index: number): void;
  getCartOfLocalStorage(): void;
}
