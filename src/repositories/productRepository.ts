import { PrismaClient } from '@prisma/client';
import { Product } from '../models/product';

const prisma = new PrismaClient();

class ProductRepository {
    async createProduct(product: Product): Promise<Product> {
        return prisma.product.create({
            data: product
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async getProductById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id }
        });
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data: product
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id }
        });
    }
}

export default ProductRepository;
