import { IProduct } from '@/models/data';
import { ICartStore } from '@/models/store';
import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true, stateFactory: true })
export default class Cart extends VuexModule implements ICartStore {
  productList: IProduct[] = [];

  get isEmptyCart(): boolean {
    return this.productList.length === 0;
  }

  get cartTotalValue(): number {
    return this.productList.reduce((total, el) => total + el.price, 0);
  }

  get productListLength(): number {
    return this.productList.length;
  }

  @Mutation
  setProductList(productList: IProduct[]) {
    this.productList = productList;
  }

  @Mutation
  insertOnProductList(product: IProduct) {
    this.productList.push(product);
  }

  @Mutation
  deleteFromProductList(index: number) {
    this.productList.splice(index, 1);
  }

  @Mutation
  deleteAllFromProductList() {
    this.productList = [];
  }

  @Action({ rawError: true })
  addToCart(product: IProduct) {
    this.context.commit('insertOnProductList', product);
    this.context.dispatch('alert/showSuccessAlert', 'Item adicionado ao carrinho', { root: true });
    this.context.dispatch('setCartOfLocalStorage');
  }

  @Action({ rawError: true })
  emptyCart() {
    this.context.commit('deleteAllFromProductList');
    this.context.dispatch('setCartOfLocalStorage');
  }

  @Action({ rawError: true })
  removeFromCart(index) {
    this.context.commit('deleteFromProductList', index);
    this.context.dispatch('setCartOfLocalStorage');
  }

  @Action({ rawError: true })
  getCartOfLocalStorage() {
    if (localStorage.getItem('cart')) {
      this.context.commit('setProductList', JSON.parse(localStorage.getItem('cart')));
    } else {
      return [];
    }
  }

  @Action({ rawError: true })
  setCartOfLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.productList));
  }
}
