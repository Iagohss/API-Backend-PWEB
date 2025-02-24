import { Request, Response, NextFunction } from "express";
import CartService from "../services/cartService";
import CartNotFoundError from "../errors/cartNotFoundError";
import ProductNotFoundError from "../errors/productNotFoundError";
import UserNotFoundError from "../errors/userNotFoundError";
import InvalidInputError from "../errors/invalidInputError";
import CartConflictError from "../errors/cartConflictError";
import CartClosedError from "../errors/cartClosedError";

const cartService = new CartService();

class CartController {
  async getCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.getCartById(req.params.id);
      return res.json(cart);
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getAllCarts(req: Request, res: Response, next: NextFunction) {
    try {
      const carts = await cartService.getAllCarts();
      if (carts.length === 0) {
        return res.status(204).send();
      }
      return res.json(carts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getOpenCartByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const cart = await cartService.getOpenCartByUser(userId);
      return res.json(cart);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof CartConflictError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async closeCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.closeCart(req.params.id);
      return res.json(cart);
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      await cartService.deleteCart(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId, productId, quantidade } = req.body;
      const cart = await cartService.addProductToCart(
        cartId,
        productId,
        quantidade
      );
      return res.status(200).json(cart);
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof CartClosedError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async rmvProductFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId, productId, quantidade } = req.body;
      const cart = await cartService.rmvProductFromCart(
        cartId,
        productId,
        quantidade
      );
      return res.status(200).json(cart);
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof CartClosedError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export default new CartController();
