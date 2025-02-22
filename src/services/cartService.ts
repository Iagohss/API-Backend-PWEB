import CartClosedError from "../errors/cartClosedError";
import CartConflictError from "../errors/cartConflictError";
import CartNotFoundError from "../errors/cartNotFoundError";
import InvalidInputError from "../errors/invalidInputError";
import ProductNotFoundError from "../errors/productNotFoundError";
import UserNotFoundError from "../errors/userNotFoundError";
import { Cart } from "../models/cart";
import CartRepository from "../repositories/cartRepository";
import ProductRepository from "../repositories/productRepository";
import UserRepository from "../repositories/userRepository";

const cartRepository = new CartRepository();

class CartService {
  private cartRepository;
  private userRepository;
  private productRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userRepository = new UserRepository();
    this.productRepository = new ProductRepository();
  }

  async createCart(userId: string): Promise<Cart> {
    const user = await this.userRepository.getUser(userId);
    if (!user) throw new UserNotFoundError();

    const existingOpenCarts = await this.cartRepository.getOpenCartsByUser(
      userId
    );
    if (existingOpenCarts.length > 0) throw new CartConflictError();

    const cart: Cart = new Cart(userId);
    return await this.cartRepository.createCart(cart);
  }

  async getAllCarts(): Promise<Cart[]> {
    return await this.cartRepository.getAllCarts();
  }

  async getCartById(id: string): Promise<Cart> {
    const cart = await this.cartRepository.getCartById(id);
    if (!cart) throw new CartNotFoundError();
    return cart;
  }

  async getOpenCartByUser(userId: string): Promise<Cart> {
    const user = await this.userRepository.getUser(userId);
    if (!user) throw new UserNotFoundError();

    const carts = await this.cartRepository.getOpenCartsByUser(userId);
    if (carts.length > 1) throw new CartConflictError();
    if (carts.length == 0) throw new CartNotFoundError();

    return carts[0];
  }

  async closeCart(id: string): Promise<Cart> {
    const cart = await this.cartRepository.getCartById(id);
    if (!cart) throw new CartNotFoundError();
    return await this.cartRepository.closeCart(id);
  }

  async deleteCart(id: string): Promise<void> {
    const cart = await this.cartRepository.getCartById(id);
    if (!cart) throw new CartNotFoundError();
    return await this.cartRepository.deleteCart(id);
  }

  async addProductToCart(
    cartId: string,
    productId: string,
    quantidade: number
  ) {
    const product = await this.productRepository.getProductById(productId);
    if (!product) throw new ProductNotFoundError();

    const cartResponse = await this.cartRepository.getCartById(cartId);
    if (!cartResponse) throw new CartNotFoundError();
    if (!cartResponse.isOpen) throw new CartClosedError();
    if (quantidade < 0) throw new InvalidInputError();

    return await this.cartRepository.addProductToCart(
      cartId,
      productId,
      quantidade
    );
  }

  async rmvProductFromCart(
    cartId: string,
    productId: string,
    quantidade: number
  ) {
    const cartResponse = await this.cartRepository.getCartById(cartId);
    if (!cartResponse) throw new CartNotFoundError();
    if (!cartResponse.isOpen) throw new CartClosedError();
    if (quantidade < 0) throw new InvalidInputError();

    const cartProduct = cartResponse.cartProducts.find(
      (cp) => cp.productId === productId
    );
    if (!cartProduct) throw new ProductNotFoundError();
    if (Math.abs(quantidade) > cartProduct.quantidade)
      throw new InvalidInputError(
        "Não é possível remover mais produtos do que há no carrinho."
      );

    return await this.cartRepository.rmvProductFromCart(
      cartId,
      productId,
      quantidade
    );
  }
}

export default CartService;
