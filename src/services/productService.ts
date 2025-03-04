import { CreateProductDTO } from "../dtos/createProductDTO";
import { Product } from "../models/product";
import ProductRepository from "../repositories/productRepository";
import ProductNotFoundError from "../errors/productNotFoundError";
import InvalidInputError from "../errors/invalidInputError";
import { ProductFilterDTO } from "../dtos/productFilterDTO";
import { UpdateProductDTO } from "../dtos/updateProductDTO";

class ProductService {
  private productRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productDTO: CreateProductDTO): Promise<Product> {
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

  async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new ProductNotFoundError();

    let updatedFields: any = {};
    if (data.nome) updatedFields.nome = data.nome;
    if (data.caimento) updatedFields.caimento = data.caimento;
    if (data.cor) updatedFields.cor = data.cor;
    if (data.material) updatedFields.material = data.material;
    if (data.preco) updatedFields.preco = data.preco;
    if (data.tamanho) updatedFields.tamanho = data.tamanho;
    if (data.tipo) updatedFields.tipo = data.tipo;

    if (Object.keys(updatedFields).length === 0)
      throw new InvalidInputError(
        "Nenhum campo válido para atualização foi fornecido"
      );

    return await this.productRepository.updateProduct(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new ProductNotFoundError();
    return await this.productRepository.deleteProduct(id);
  }
}

export default ProductService;
