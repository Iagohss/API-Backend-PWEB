import { PrismaClient } from '@prisma/client';
import prisma from '../utils/prisma';
import { Cart } from '../models/cart'

class CartRepository {
    async createCart(cart: Cart) {
        try {
            return await prisma.cart.create({
                data: {
                  userId: cart.userId,
                  isOpen: cart.isOpen,
                },
            });
        } catch (error) {
            throw new Error('Erro ao criar o carrinho.');
        }
    }

    async getCartById(id: string) {
        try {
            const cart = await prisma.cart.findUnique({
                where: { id },
            });

            if (!cart) {
                throw new Error('Carrinho não encontrado.');
            }

            return cart;
        } catch (error) {
            throw new Error('Erro ao buscar o carrinho.');
        }
    }

    async getOpenCartByUser(userId: string) {
        try {
            return await prisma.cart.findFirst({
                where: {
                    userId,
                    isOpen: true,
                },
            });
        } catch (error) {
            throw new Error('Erro ao buscar o carrinho aberto do usuário.');
        }
    }

    async closeCart(id: string) {
        try {
            return await prisma.cart.update({
                where: { id },
                data: { isOpen: false },
            });
        } catch (error) {
            throw new Error('Erro ao fechar o carrinho.');
        }
    }

    async deleteCart(id: string) {
        try {
            await prisma.cart.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Erro ao deletar o carrinho.');
        }
    }
}

export default CartRepository;
