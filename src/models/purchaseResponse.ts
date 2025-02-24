import { Purchase } from "./purchase";
import { User } from "./user";
import { Product } from "./product";

class CartProductResponse {
  quantidade: number;
  product: Product;

  constructor(quantidade: number, product: Product) {
    this.quantidade = quantidade;
    this.product = product;
  }
}

class CartResponseWithUser {
  user: Omit<User, "password">;
  cartProducts: CartProductResponse[];

  constructor(user: User, cartProducts: CartProductResponse[]) {
    this.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    };
    this.cartProducts = cartProducts;
  }
}

export class PurchaseResponse extends Purchase {
  cart: CartResponseWithUser;

  constructor(
    id: string,
    cartId: string,
    precoTotal: number,
    formaPagamento: string,
    data: Date,
    cart: CartResponseWithUser
  ) {
    super(cartId, precoTotal, formaPagamento, data);
    this.id = id;
    this.cart = cart;
  }
}
