import { Cart } from '../models/cart';
import CartRepository from '../repositories/cartRepository';

const cartRepository = new CartRepository();

class CartService {
    private cartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async createCart(userId: string): Promise<Cart> {
        const existingOpenCarts = await this.cartRepository.getOpenCartsByUser(userId);
        if (existingOpenCarts.length > 0) {
            throw new Error("Usuário já possui um carrinho aberto.");
        }
    
        const cart: Cart = new Cart(userId);
        return await this.cartRepository.createCart(cart);
    }    

    async getAllCarts(): Promise<Cart[]> {
      return await this.cartRepository.getAllCarts();
    }

    async getCartById(id: string): Promise<Cart | null> {
        return await this.cartRepository.getCartById(id);
    }

    async getOpenCartByUser(userId: string): Promise<Cart> {
        const carts = await this.cartRepository.getOpenCartsByUser(userId);
        if (carts.length > 1){
          throw new Error("Usuário possui mais de um carrinho aberto.");
        }

        if (carts.length == 0){
          throw new Error("Usuário não possui um carrinho aberto.");
        }

        return carts[0];
    }

    async closeCart(id: string): Promise<Cart> {
        return await this.cartRepository.closeCart(id);
    }

    async deleteCart(id: string): Promise<void> {
        return await this.cartRepository.deleteCart(id);
    }

    async addProductToCart(cartId: string, productId: string, quantidade: number){
      const cartResponse = await this.cartRepository.getCartById(cartId);
      if (!cartResponse.isOpen) {
          throw new Error("Não é possível alterar os produtos de um carrinho fechado");
      }

      if (quantidade < 0) {
        throw new Error("Este endpoint não deve remover produtos ao carrinho.")
      }

      return await this.cartRepository.addProductToCart(cartId, productId, quantidade);
    }

    async rmvProductFromCart(cartId: string, productId: string, quantidade: number){
      const cartResponse = await this.cartRepository.getCartById(cartId);
      if (!cartResponse.isOpen) {
          throw new Error("Não é possível alterar os produtos de um carrinho fechado");
      }

      if (quantidade < 0) {
        throw new Error("Este endpoint não deve adicionar produtos ao carrinho.")
      }

      const cartProduct = cartResponse.cartProducts.find(cp => cp.productId === productId);

      if (!cartProduct) {
        throw new Error("Produto não encontrado no carrinho.");
      }
      if (Math.abs(quantidade) > cartProduct.quantidade) {
        throw new Error("Não é possível remover mais produtos do que há no carrinho.");
      }
      
      return await this.cartRepository.rmvProductFromCart(cartId, productId, quantidade);
    }
}

export default CartService;
