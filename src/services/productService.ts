import { Product } from '../models/product';
import ProductRepository from '../repositories/productRepository';

class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(tipo: string, caimento: string, material: string, tamanho: string, preco: number): Promise<Product> {
        const product = new Product(tipo, caimento, material, tamanho, preco);
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
