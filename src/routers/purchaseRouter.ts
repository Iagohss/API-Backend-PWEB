import express from "express";
import PurchaseController from "../controllers/purchaseController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Endpoints para gerenciamento de compras
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseDTO'
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 */
router.post("/", (req, res, next) => {
  PurchaseController.createPurchase(req, res, next);
  return;
});

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     summary: Retorna todas as compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseDTO'
 *       204:
 *         description: Nenhuma compra encontrada
 */
router.get("/", (req, res, next) => {
  PurchaseController.getAllPurchases(req, res, next);
  return;
});

/**
 * @swagger
 * /api/purchases/{id}:
 *   get:
 *     summary: Busca uma compra pelo ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseDTO'
 *       404:
 *         description: Compra não encontrada
 */
router.get("/:id", (req, res, next) => {
  PurchaseController.getPurchaseById(req, res, next);
  return;
});

/**
 * @swagger
 * /api/purchases/{id}:
 *   delete:
 *     summary: Deleta uma compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Compra deletada com sucesso
 *       404:
 *         description: Compra não encontrada
 */
router.delete("/:id", (req, res, next) => {
  PurchaseController.deletePurchase(req, res, next);
  return;
});

export default router;
