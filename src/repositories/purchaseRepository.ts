import prisma from "../utils/prisma";
import { Purchase } from "../models/purchase";
import InvalidInputError from "../errors/invalidInputError";
import PurchaseNotFoundError from "../errors/purchaseNotFoundError";
import PurchaseConflictError from "../errors/purchaseConflictError";

class PurchaseRepository {
  async createPurchase(cartId: string, precoTotal: number, formaPagamento: string): Promise<Purchase> {
    try {
      const existingPurchase = await prisma.purchase.findUnique({
        where: { cartId },
      });
      if (existingPurchase) {
        throw new PurchaseConflictError("Já existe uma compra para este carrinho.");
      }
      
      return await prisma.purchase.create({
        data: {
          cartId,
          precoTotal,
          formaPagamento,
          data: new Date(),
        },
      });

    } catch (error) {
      throw new InvalidInputError("Erro ao criar a compra.");
    }
  }

  async getAllPurchases(): Promise<Purchase[]> {
    try {
      return await prisma.purchase.findMany();
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar todas as compras.");
    }
  }

  async getPurchaseById(id: string): Promise<Purchase | null> {
    try {
      const purchase = await prisma.purchase.findUnique({
        where: { id },
      });
      if (!purchase) {
        throw new PurchaseNotFoundError("Compra não encontrada.");
      }
      return purchase;
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar a compra.");
    }
  }

  async getPurchasesByCart(cartId: string): Promise<Purchase[]> {
    try {
      return await prisma.purchase.findMany({
        where: {
          cartId,
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar compras pelo carrinho.");
    }
  }

  async deletePurchase(id: string): Promise<void> {
    try {
      const purchase = await prisma.purchase.findUnique({ where: { id } });
      if (!purchase) {
        throw new PurchaseNotFoundError("Compra não encontrada para deletar.");
      }
      
      await prisma.purchase.delete({
        where: { id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao deletar a compra.");
    }
  }
}

export default PurchaseRepository;