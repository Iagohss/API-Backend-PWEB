import express from "express";
import PurchaseController from "../controllers/purchaseController";
import { validateBodyMiddleware } from "../middlewares/validateBodyMiddleware";
import { PurchaseDTO } from "../dtos/purchaseDTO";
import { IdDTO } from "../dtos/idDTO";
import { validateParamsMiddleware } from "../middlewares/validateParamsMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import { GetUserIdDTO } from "../dtos/userIdDTO";
import { authenticateAdmin } from "../middlewares/adminAuthMiddleware";
import { PaginationDTO } from "../dtos/paginationDTO";
import { validateQueryMiddleware } from "../middlewares/validateQueryMiddleware";

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
 *     description: Necessita de autenticação (usuário logado).
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 example: "456e7890-b12d-34a5-c678-987654321000"
 *               formaPagamento:
 *                 type: string
 *                 example: "Cartão de crédito"
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseResponse'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: "O carrinho está vazio"
 *       404:
 *         description: Carrinho, produto ou usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: "Carrinho não encontrado"
 *       409:
 *         description: Conflito na criação da compra
 *         content:
 *           application/json:
 *             example:
 *               message: "Já existe uma compra associada a esse carrinho"
 */
router.post(
  "/",
  validateBodyMiddleware(PurchaseDTO),
  authenticate,
  (req, res, next) => {
    PurchaseController.createPurchase(req, res, next);
  }
);

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     summary: Retorna todas as compras
 *     description: Necessita de autenticação com privilégio de administrador.
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offset
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseResponse'
 *       204:
 *         description: Nenhuma compra encontrada
 */
router.get(
  "/",
  authenticateAdmin,
  validateQueryMiddleware(PaginationDTO),
  (req, res, next) => {
    PurchaseController.getAllPurchases(req, res, next);
  }
);

/**
 * @swagger
 * /api/purchases/{id}:
 *   get:
 *     summary: Busca uma compra pelo ID
 *     description: Necessita de autenticação (usuário logado).
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
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
 *               $ref: '#/components/schemas/PurchaseResponse'
 *       404:
 *         description: Compra não encontrada
 *         content:
 *           application/json:
 *             example:
 *               message: "Compra não encontrada"
 */
router.get(
  "/:id",
  authenticate,
  validateParamsMiddleware(IdDTO),
  (req, res, next) => {
    PurchaseController.getPurchaseById(req, res, next);
  }
);

/**
 * @swagger
 * /api/purchases/user/{userId}:
 *   get:
 *     summary: Retorna todas as compras de um usuário específico
 *     description: Necessita de autenticação (usuário logado).
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: offset
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Compras do usuário encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseResponse'
 *       204:
 *         description: Nenhuma compra encontrada para esse usuário
 *       404:
 *         description: Usuário não encontradao
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário não encontrado"
 */
router.get(
  "/user/:userId",
  authenticate,
  validateParamsMiddleware(GetUserIdDTO),
  validateQueryMiddleware(PaginationDTO),
  (req, res, next) => {
    PurchaseController.getPurchasesByUserId(req, res, next);
  }
);

/**
 * @swagger
 * /api/purchases/{id}:
 *   delete:
 *     summary: Deleta uma compra
 *     description: Necessita de autenticação com privilégio de administrador.
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             example:
 *               message: "Compra não encontrada"
 */
router.delete(
  "/:id",
  authenticateAdmin,
  validateParamsMiddleware(IdDTO),
  (req, res, next) => {
    PurchaseController.deletePurchase(req, res, next);
  }
);

export default router;
