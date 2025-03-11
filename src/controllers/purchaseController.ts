import { Request, Response, NextFunction } from "express";
import PurchaseService from "../services/purchaseService";
import CartNotFoundError from "../errors/cartNotFoundError";
import CartConflictError from "../errors/cartConflictError";
import EmptyCartError from "../errors/emptyCartError";
import ProductNotFoundError from "../errors/productNotFoundError";
import PurchaseConflictError from "../errors/purchaseConflictError";
import PurchaseNotFoundError from "../errors/purchaseNotFoundError";
import UserNotFoundError from "../errors/userNotFoundError";
import InvalidInputError from "../errors/invalidInputError";
import { PurchaseDTO } from "../dtos/purchaseDTO";
import { PaginationDTO } from "../dtos/paginationDTO";

const purchaseService = new PurchaseService();

class PurchaseController {
  async createPurchase(req: Request, res: Response, next: NextFunction) {
    try {
      const purchaseDTO: PurchaseDTO = req.body;
      const purchase = await purchaseService.createPurchase(purchaseDTO);
      res.status(201).json(purchase);
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof CartConflictError) {
        res.status(409).json({ message: error.message });
      } else if (error instanceof EmptyCartError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof InvalidInputError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof PurchaseConflictError) {
        res.status(409).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getPurchaseById(req: Request, res: Response, next: NextFunction) {
    try {
      const purchase = await purchaseService.getPurchaseById(req.params.id);
      res.json(purchase);
    } catch (error) {
      if (error instanceof PurchaseNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getPurchasesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationDTO: PaginationDTO =
        req.query as unknown as PaginationDTO;
      const purchases = await purchaseService.getPurchasesByUserId(
        paginationDTO,
        req.params.userId
      );
      if (purchases.length === 0) {
        return res.status(204).send();
      }
      res.json(purchases);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getAllPurchases(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationDTO: PaginationDTO =
        req.query as unknown as PaginationDTO;
      const purchases = await purchaseService.getAllPurchases(paginationDTO);
      if (purchases.length === 0) {
        return res.status(204).send();
      }
      res.json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async deletePurchase(req: Request, res: Response, next: NextFunction) {
    try {
      await purchaseService.deletePurchase(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof PurchaseNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export default new PurchaseController();
