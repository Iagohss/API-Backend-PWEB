import { PrismaClient } from "@prisma/client";
import prisma from "../utils/prisma";
import { Cart } from "../models/cart";
import { CartResponse } from "../models/cartResponse";
import InvalidInputError from "../errors/invalidInputError";
import ProductNotFoundError from "../errors/productNotFoundError";
import CartNotFoundError from "../errors/cartNotFoundError";

class CartRepository {
  async createCart(userId: string) {
    try {
      return await prisma.cart.create({
        data: {
          userId: userId,
          isOpen: true,
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao criar or carrinho");
    }
  }

  async getAllCarts(): Promise<Cart[]> {
    return await prisma.cart.findMany();
  }

  async getCartById(id: string): Promise<CartResponse | null> {
    try {
      const cart = await prisma.cart.findUnique({
        where: { id },
        include: {
          cartProducts: true,
        },
      });
      return cart;
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar o carrinho.");
    }
  }

  async getOpenCartsByUser(userId: string): Promise<CartResponse[]> {
    try {
      const carts = await prisma.cart.findMany({
        where: {
          userId,
          isOpen: true,
        },
        include: {
          cartProducts: true,
        },
      });

      return carts;
    } catch (error) {
      throw new InvalidInputError(
        "Erro ao buscar os carrinhos abertos do usuário."
      );
    }
  }

  async getOpenAllCartsByUser(userId: string): Promise<Cart[]> {
    try {
      const carts = await prisma.cart.findMany({
        where: {
          userId,
        },
      });

      return carts;
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os carrinhos de um usuário.");
    }
  }

  async closeCart(id: string) {
    try {
      return await prisma.cart.update({
        where: { id },
        data: { isOpen: false },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao fechar o carrinho.");
    }
  }

  async deleteCart(id: string) {
    try {
      await prisma.cart.delete({
        where: { id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao deletar o carrinho.");
    }
  }

  async addProductToCart(
    cartId: string,
    productId: string,
    quantidade: number
  ) {
    try {
      const existingCartProduct = await prisma.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
      });

      if (existingCartProduct) {
        return await prisma.cartProduct.update({
          where: {
            cartId_productId: {
              cartId,
              productId,
            },
          },
          data: {
            quantidade: existingCartProduct.quantidade + quantidade,
          },
        });
      } else {
        return await prisma.cartProduct.create({
          data: {
            cartId,
            productId,
            quantidade,
          },
        });
      }
    } catch (error) {
      throw new InvalidInputError("Erro ao adicionar o produto ao carrinho.");
    }
  }

  async rmvProductFromCart(
    cartId: string,
    productId: string,
    quantidade: number
  ) {
    try {
      const existingCartProduct = await prisma.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
      });

      if (!existingCartProduct) throw new ProductNotFoundError();
      const novaQuantidade = existingCartProduct.quantidade - quantidade;

      if (novaQuantidade <= 0) {
        await prisma.cartProduct.delete({
          where: {
            cartId_productId: {
              cartId,
              productId,
            },
          },
        });
      } else {
        await prisma.cartProduct.update({
          where: {
            cartId_productId: {
              cartId,
              productId,
            },
          },
          data: {
            quantidade: novaQuantidade,
          },
        });
      }
    } catch (error) {
      throw new InvalidInputError("Erro ao remover o produto do carrinho.");
    }
  }
}

export default CartRepository;
