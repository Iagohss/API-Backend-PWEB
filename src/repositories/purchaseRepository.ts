import prisma from "../utils/prisma";
import { Purchase } from "../models/purchase";
import InvalidInputError from "../errors/invalidInputError";
import { PurchaseResponse } from "../models/purchaseResponse";

class PurchaseRepository {
  async createPurchase(purchase: Purchase): Promise<Purchase> {
    try {
      return await prisma.purchase.create({
        data: {
          cartId: purchase.cartId,
          precoTotal: purchase.precoTotal,
          formaPagamento: purchase.formaPagamento,
          data: purchase.data,
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao criar a compra.");
    }
  }

  async getAllPurchases(): Promise<PurchaseResponse[]> {
    try {
      return await prisma.purchase.findMany({
        include: {
          cart: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  admin: true
                },
              },
              cartProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar todas as compras.");
    }
  }

  async getPurchaseById(id: string): Promise<PurchaseResponse | null> {
    try {
      return await prisma.purchase.findUnique({
        where: { id },
        include: {
          cart: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  admin: true
                },
              },
              cartProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar a compra.");
    }
  }

  async getPurchaseByCartId(cartId: string): Promise<PurchaseResponse | null> {
    try {
      return await prisma.purchase.findUnique({
        where: { cartId },
        include: {
          cart: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  admin: true
                },
              },
              cartProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar a compra.");
    }
  }

  async getPurchaseByCartsIds(cartsIds: string[]): Promise<PurchaseResponse[]> {
    try {
      return await prisma.purchase.findMany({
        where: {
          cartId: { in: cartsIds },
        },
        include: {
          cart: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  admin: true,
                },
              },
              cartProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError(
        "Erro ao buscar compras por múltiplos carrinhos."
      );
    }
  }

  async deletePurchase(id: string): Promise<void> {
    try {
      await prisma.purchase.delete({
        where: { id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao deletar a compra.");
    }
  }
}

export default PurchaseRepository;
