import { Request, Response, NextFunction } from 'express';
import CartService from '../services/cartService';

const cartService = new CartService();

class CartController {
    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
          const { userId } = req.params;
            const cart = await cartService.createCart(userId);
            res.status(201).json(cart);
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const cart = await cartService.getCartById(req.params.id);
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({ message: 'Carrinho não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async getAllCarts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await cartService.getAllCarts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getOpenCartByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cart = await cartService.getOpenCartByUser(userId);
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({ message: 'Nenhum carrinho aberto encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async closeCart(req: Request, res: Response, next: NextFunction) {
        try {
            const cart = await cartService.closeCart(req.params.id);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.deleteCart(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async addProductToCart(req: Request, res: Response, next: NextFunction) {
      try {
          const { cartId, productId, quantidade } = req.body;
          const cart = await cartService.addProductToCart(cartId, productId, quantidade);
          res.status(200).json(cart);
      } catch (error) {
          next(error);
      }
    } 

    async rmvProductFromCart(req: Request, res: Response, next: NextFunction) {
      try {
          const { cartId, productId, quantidade } = req.body; 
          const cart = await cartService.rmvProductFromCart(cartId, productId, quantidade);
          res.status(200).json(cart);
      } catch (error) {
          next(error);
      }
    }
}

export default new CartController();
