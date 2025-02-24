import { Caimento, Tamanho } from "@prisma/client";
import { ProductDTO } from "../dtos/productDTO";
import { Product } from "../models/product";
import ProductRepository from "../repositories/productRepository";
import ProductNotFoundError from "../errors/productNotFoundError";
import InvalidInputError from "../errors/invalidInputError";

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

  async getProductsByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<Product[]> {
    if (minPrice > maxPrice) throw new InvalidInputError();
    return await this.productRepository.getProductsByPrice(minPrice, maxPrice);
  }

  async getProductsByName(partialName: string): Promise<Product[]> {
    return await this.productRepository.getProductsByName(partialName);
  }

  async getProductsByTamanho(tamanho: string): Promise<Product[]> {
    return await this.productRepository.getProductsByTamanho(
      tamanho as Tamanho
    );
  }

  async getProductsByCaimento(caimento: string): Promise<Product[]> {
    return await this.productRepository.getProductsByCaimento(
      caimento as Caimento
    );
  }

  async getProductsByMaterial(material: string): Promise<Product[]> {
    return await this.productRepository.getProductsByMaterial(material);
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return await this.productRepository.getProductsByType(type);
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
