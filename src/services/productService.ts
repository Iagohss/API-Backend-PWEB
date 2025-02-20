import { ProductDTO } from '../dtos/productDTO';
import { Product } from '../models/product';
import ProductRepository from '../repositories/productRepository';

class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(productDTO : ProductDTO) : Promise<Product> {
        const product = new Product(
          productDTO.tipo, 
          productDTO.nome,
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

    async getProductById(id: string): Promise<Product | null> {
        return await this.productRepository.getProductById(id);
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
        return await this.productRepository.updateProduct(id, data);
    }

    async deleteProduct(id: string): Promise<void> {
        return await this.productRepository.deleteProduct(id);
    }
}

export default ProductService;
