import prisma from '../utils/prisma'; // Importação correta do Prisma Client
import { Purchase } from '../models/purchase'; // Use o modelo correto
import PurchaseRepository from "../repositories/purchaseRepository";

class PurchaseService {
    private purchaseRepository = new PurchaseRepository();

    async createPurchase(cartId: string, precoTotal: number, formaPagamento: string) {
        return await this.purchaseRepository.createPurchase(cartId, precoTotal, formaPagamento);
    }

    async getPurchaseById(id: string) {
        return await this.purchaseRepository.getPurchaseById(id);
    }

    async getAllPurchases() {
        return await this.purchaseRepository.getAllPurchases();
    }

    async deletePurchase(id: string) {
        return await this.purchaseRepository.deletePurchase(id);
    }
}

export default PurchaseService;

