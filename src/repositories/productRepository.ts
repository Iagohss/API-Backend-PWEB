import { Caimento, PrismaClient, Tamanho } from "@prisma/client";
import { Product } from "../models/product";
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

  async getProductsByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          preco: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductsByName(partialName: string): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          nome: {
            contains: partialName,
            mode: "insensitive",
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductsByTamanho(tamanho: Tamanho): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: { tamanho },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductsByCaimento(caimento: Caimento): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: { caimento },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductsByMaterial(material: string): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          material: {
            contains: material,
            mode: "insensitive",
          },
        },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao buscar os produtos");
    }
  }

  async getProductsByType(type: string): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          tipo: {
            contains: type,
            mode: "insensitive",
          },
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
