import { Caimento, Tamanho } from "@prisma/client";
import { ProductDTO } from "../dtos/productDTO";
import { Product } from "../models/product";
import ProductRepository from "../repositories/productRepository";
import ProductNotFoundError from "../errors/productNotFoundError";
import InvalidInputError from "../errors/invalidInputError";
import { ProductFilterDTO } from "../dtos/productFilterDTO";

class ProductService {
  private productRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    const product = new Product(
      productDTO.tipo,
      productDTO.nome,
      productDTO.cor,
      productDTO.caimento,
      productDTO.material,
      productDTO.tamanho,
      productDTO.preco
    );
    return await this.productRepository.createProduct(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async getFilteredProducts(filters: ProductFilterDTO): Promise<Product[]> {
    if (!filters || Object.keys(filters).length === 0) {
      throw new InvalidInputError("Pelo menos um filtro deve ser fornecido.");
    }

    if (
      (filters.minPrice !== undefined && filters.maxPrice === undefined) ||
      (filters.maxPrice !== undefined && filters.minPrice === undefined)
    ) {
      throw new InvalidInputError(
        "Ambos minPrice e maxPrice devem ser fornecidos."
      );
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      if (filters.minPrice > filters.maxPrice) {
        throw new InvalidInputError(
          "O preço mínimo não pode ser maior que o máximo"
        );
      }
    }

    return await this.productRepository.getFilteredProducts(filters);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new ProductNotFoundError();
    return product;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new ProductNotFoundError();
    return await this.productRepository.updateProduct(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new ProductNotFoundError();
    return await this.productRepository.deleteProduct(id);
  }
}

export default ProductService;
