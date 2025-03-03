import { Request, Response, NextFunction } from "express";
import ProductService from "../services/productService";
import { ProductDTO } from "../dtos/productDTO";
import InvalidInputError from "../errors/invalidInputError";
import ProductNotFoundError from "../errors/productNotFoundError";
import { ProductFilterDTO } from "../dtos/productFilterDTO";

const productService = new ProductService();

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productDTO: ProductDTO = req.body;
      const product = await productService.createProduct(productDTO);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      if (products.length === 0) {
        return res.status(204).send();
      }
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getFilteredProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productFilterDTO: ProductFilterDTO = req.body;
      const filteredProducts = await productService.getFilteredProducts(productFilterDTO);
      if (filteredProducts.length === 0) {
        return res.status(204).send();
      }
      res.json(filteredProducts);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export default new ProductController();
