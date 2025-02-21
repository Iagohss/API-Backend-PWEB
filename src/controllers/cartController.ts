import { Request, Response, NextFunction } from 'express';
import CartService from '../services/cartService';

const cartService = new CartService();

class CartController {
    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
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
}

export default new CartController();
