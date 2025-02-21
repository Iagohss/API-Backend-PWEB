import { Caimento, PrismaClient, Tamanho } from '@prisma/client';
import { Product } from '../models/product';

const prisma = new PrismaClient();

class ProductRepository {
    async createProduct(product: Product): Promise<Product> {
        return prisma.product.create({
            data: {
              tipo: product.tipo, 
              nome: product.nome, 
              cor: product.cor, 
              caimento: product.caimento,  
              material: product.material,  
              tamanho: product.tamanho, 
              preco: product.preco, 
            }
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async getProductsByPrice(minPrice: number, maxPrice: number): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
              preco: {
                  gte: minPrice, 
                  lte: maxPrice
              }
          }
      });
    }

    async getProductsByName(partialName: string): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
              nome: {
                  startsWith: `%${partialName}%`,
                  mode: 'insensitive',
              }
          }
      });
    }

    async getProductsByTamanho(tamanho: Tamanho): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
              tamanho: tamanho
          }
      });
    }

    async getProductsByCaimento(caimento: Caimento): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
            caimento: caimento
          }
      });
    }

    async getProductsByMaterial(material: string): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
            material: {
              startsWith: `%${material}%`,
              mode: 'insensitive',
            }
          }
      });
    }

    async getProductsByType(type: string): Promise<Product[]> {
      return prisma.product.findMany({
          where: {
            tipo: {
              startsWith: `%${type}%`,
              mode: 'insensitive',
            }
          }
      });
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
