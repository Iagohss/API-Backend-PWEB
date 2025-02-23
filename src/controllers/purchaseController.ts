import { Request, Response, NextFunction } from 'express';
import PurchaseService from '../services/purchaseService';

const purchaseService = new PurchaseService();

class PurchaseController {
    async createPurchase(req: Request, res: Response, next: NextFunction) {
        try {
            const { cartId, precoTotal, formaPagamento } = req.body;
            const purchase = await purchaseService.createPurchase(cartId, precoTotal, formaPagamento);
            res.status(201).json(purchase);
        } catch (error) {
            next(error);
        }
    }

    async getPurchaseById(req: Request, res: Response, next: NextFunction) {
        try {
            const purchase = await purchaseService.getPurchaseById(req.params.id);
            if (purchase) {
                res.json(purchase);
            } else {
                res.status(404).json({ message: 'Compra não encontrada' });
            }
        } catch (error) {
            next(error);
        }
    }

    async getAllPurchases(req: Request, res: Response, next: NextFunction) {
        try {
            const purchases = await purchaseService.getAllPurchases();
            res.json(purchases);
        } catch (error) {
            next(error);
        }
    }

    async deletePurchase(req: Request, res: Response, next: NextFunction) {
        try {
            await purchaseService.deletePurchase(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new PurchaseController();
