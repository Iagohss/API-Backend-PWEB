import { CartProductDTO } from "../dtos/cartProductDTO";
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

class CartService {
  private cartRepository;
  private userRepository;
  private productRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userRepository = new UserRepository();
    this.productRepository = new ProductRepository();
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

  async addProductToCart(data: CartProductDTO) {
    const product = await this.productRepository.getProductById(data.productId);
    if (!product) throw new ProductNotFoundError();

    const cartResponse = await this.cartRepository.getCartById(data.cartId);
    if (!cartResponse) throw new CartNotFoundError();
    if (!cartResponse.isOpen) throw new CartClosedError();
    if (data.quantidade < 0) throw new InvalidInputError();

    return await this.cartRepository.addProductToCart(
      data.cartId,
      data.productId,
      data.quantidade
    );
  }

  async rmvProductFromCart(data: CartProductDTO) {
    const cartResponse = await this.cartRepository.getCartById(data.cartId);
    if (!cartResponse) throw new CartNotFoundError();
    if (!cartResponse.isOpen) throw new CartClosedError();
    if (data.quantidade < 0) throw new InvalidInputError();

    const cartProduct = cartResponse.cartProducts.find(
      (cp) => cp.productId === data.productId
    );
    if (!cartProduct) throw new ProductNotFoundError();
    if (Math.abs(data.quantidade) > cartProduct.quantidade)
      throw new InvalidInputError(
        "Não é possível remover mais produtos do que há no carrinho."
      );

    return await this.cartRepository.rmvProductFromCart(
      data.cartId,
      data.productId,
      data.quantidade
    );
  }
}

export default CartService;
