import { User } from './user';
import { Product } from './product';
import { Cart } from './cart';

export class CartProduct {
  cartId: string;
  productId: string;
  quantidade: number;

  constructor(cartId: string, productId: string, quantidade: number) {
    this.cartId = cartId;
    this.productId = productId;
    this.quantidade = quantidade;
  }
}

export class CartResponse extends Cart {
  cartProducts: CartProduct[];

  constructor(userId: string, isOpen: boolean, cartProducts: CartProduct[]) {
    super(userId, isOpen);
    this.id = "";
    this.cartProducts = cartProducts;
  }
}
