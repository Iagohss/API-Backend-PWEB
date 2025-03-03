import { PrismaClient, Prisma } from "@prisma/client";
import { Product } from "../models/product";
import { ProductFilter } from "../models/productFilter";
import InvalidInputError from "../errors/invalidInputError";

const prisma = new PrismaClient();

class ProductRepository {
  async createProduct(product: Product): Promise<Product> {
    try {
      return await prisma.product.create({
        data: {
          tipo: product.tipo,
          nome: product.nome,
          cor: product.cor,
          caimento: product.caimento,
          material: product.material,
          tamanho: product.tamanho,
          preco: product.preco,
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao criar o produto");
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getFilteredProducts(filters: ProductFilter): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          nome: filters.nome
            ? { contains: filters.nome, mode: "insensitive" }
            : Prisma.skip,
          tipo: filters.tipo
            ? { contains: filters.tipo, mode: "insensitive" }
            : Prisma.skip,
          cor: filters.cor
            ? { contains: filters.cor, mode: "insensitive" }
            : Prisma.skip,
          caimento: filters.caimento ?? Prisma.skip,
          material: filters.material
            ? { contains: filters.material, mode: "insensitive" }
            : Prisma.skip,
          tamanho: filters.tamanho ?? Prisma.skip,
          preco:
            filters.minPrice && filters.maxPrice
              ? {
                  gte: filters.minPrice ?? Prisma.skip,
                  lte: filters.maxPrice ?? Prisma.skip,
                }
              : Prisma.skip,
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar o produto");
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      return await prisma.product.update({
        where: { id },
        data: product,
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao atualizar o produto");
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao deletar o produto");
    }
  }
}

export default ProductRepository;
