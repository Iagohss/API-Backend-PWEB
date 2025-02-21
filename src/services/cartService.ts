import { Cart } from '../models/cart';
import CartRepository from '../repositories/cartRepository';

const cartRepository = new CartRepository();

class CartService {
    private cartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async createCart(userId: string): Promise<Cart> {
        const existingCart = await this.cartRepository.getOpenCartByUser(userId);
        if (existingCart) {
            throw new Error("Usuário já possui um carrinho aberto.");
        }
    
        const cart: Cart = new Cart(userId);
        return await this.cartRepository.createCart(cart);
    }    

    async getCartById(id: string): Promise<Cart | null> {
        return await this.cartRepository.getCartById(id);
    }

    async getOpenCartByUser(userId: string): Promise<Cart | null> {
        return await this.cartRepository.getOpenCartByUser(userId);
    }

    async closeCart(id: string): Promise<Cart> {
        return await this.cartRepository.closeCart(id);
    }

    async deleteCart(id: string): Promise<void> {
        return await this.cartRepository.deleteCart(id);
    }
}

export default CartService;
