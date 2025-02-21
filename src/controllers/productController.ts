import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/productService';
import { ProductDTO } from '../dtos/productDTO';

const productService = new ProductService();

class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productDTO: ProductDTO = req.body;
            const product = await productService.createProduct(productDTO);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByPrice(req: Request, res: Response, next: NextFunction) {
        try {
            const { minPrice, maxPrice } = req.query;
            const products = await productService.getProductsByPrice(Number(minPrice), Number(maxPrice));
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;
            const products = await productService.getProductsByName(String(name));
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByTamanho(req: Request, res: Response, next: NextFunction) {
        try {
            const { tamanho } = req.params;
            const products = await productService.getProductsByTamanho(tamanho);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByCaimento(req: Request, res: Response, next: NextFunction) {
        try {
            const { caimento } = req.params;
            const products = await productService.getProductsByCaimento(caimento);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByMaterial(req: Request, res: Response, next: NextFunction) {
        try {
            const { material } = req.query;
            const products = await productService.getProductsByMaterial(String(material));
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByType(req: Request, res: Response, next: NextFunction) {
        try {
            const { type } = req.query;
            const products = await productService.getProductsByType(String(type));
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            await productService.deleteProduct(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
