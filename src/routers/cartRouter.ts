import express from "express";
import CartController from "../controllers/cartController";
import cartController from "../controllers/cartController";
import { validateParamsMiddleware } from "../middlewares/validateParamsMiddleware";
import { GetIdDTO } from "../dtos/getIdDTO";
import { validateBodyMiddleware } from "../middlewares/validateBodyMiddleware";
import { CartProductDTO } from "../dtos/cartProductDTO";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carrinhos
 *   description: Endpoints para gerenciamento de carrinhos
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Retorna todos os carrinhos
 *     tags: [Carrinhos]
 *     responses:
 *       200:
 *         description: Lista de carrinhos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartResponse'
 *       204:
 *         description: Nenhum carrinho encontrado
 */
router.get("/", (req, res, next) => {
  cartController.getAllCarts(req, res, next);
  return;
});

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Busca um carrinho pelo ID
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do carrinho
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Carrinho não encontrado'
 */
router.get("/:id", validateParamsMiddleware(GetIdDTO), (req, res, next) => {
  CartController.getCartById(req, res, next);
  return;
});

/**
 * @swagger
 * /api/carts/user/{userId}:
 *   get:
 *     summary: Busca o carrinho aberto de um usuário pelo seu ID
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       404:
 *         description: Carrinho ou usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuário não encontrado'
 *       409:
 *         description: O usuário possui mais de um carrinho aberto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get(
  "/user/:userId",
  validateParamsMiddleware(GetIdDTO),
  (req, res, next) => {
    CartController.getOpenCartByUser(req, res, next);
    return;
  }
);

/**
 * @swagger
 * /api/carts/close/{id}:
 *   put:
 *     summary: Fecha um carrinho
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho fechado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Carrinho não encontrado'
 */
router.put(
  "/close/:id",
  validateParamsMiddleware(GetIdDTO),
  (req, res, next) => {
    CartController.closeCart(req, res, next);
    return;
  }
);

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     summary: Deleta um carrinho
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carrinho deletado com sucesso
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Carrinho não encontrado'
 */
router.delete("/:id", validateParamsMiddleware(GetIdDTO), (req, res, next) => {
  CartController.deleteCart(req, res, next);
  return;
});

/**
 * @swagger
 * /api/carts/product/add:
 *   put:
 *     summary: Adiciona produtos ao carrinho
 *     tags: [Carrinhos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 example: "e0dee3e3-1054-4dfc-b5e4-a05244570b11"
 *               productId:
 *                 type: string
 *                 example: "596672c3-2f23-4c91-85ea-681c8a21ebcd"
 *               quantidade:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartId:
 *                   type: string
 *                   example: "e0dee3e3-1054-4dfc-b5e4-a05244570b11"
 *                 productId:
 *                   type: string
 *                   example: "596672c3-2f23-4c91-85ea-681c8a21ebcd"
 *                 quantidade:
 *                   type: number
 *                   example: 15
 *       404:
 *         description: Carrinho ou produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Carrinho não encontrado'
 *       409:
 *         description: Não é possível alterar um carrinho fechado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Não é possível alterar um carrinho fechado'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put(
  "/product/add",
  validateBodyMiddleware(CartProductDTO),
  (req, res, next) => {
    CartController.addProductToCart(req, res, next);
    return;
  }
);

/**
 * @swagger
 * /api/carts/product/rmv:
 *   delete:
 *     summary: Remove produtos do carrinho
 *     tags: [Carrinhos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 example: "e0dee3e3-1054-4dfc-b5e4-a05244570b11"
 *               productId:
 *                 type: string
 *                 example: "596672c3-2f23-4c91-85ea-681c8a21ebcd"
 *               quantidade:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Produto removido do carrinho com sucesso
 *       404:
 *         description: Carrinho ou produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Carrinho não encontrado'
 *       409:
 *         description: Não é possível alterar um carrinho fechado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Não é possível alterar um carrinho fechado'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/product/rmv",
  validateBodyMiddleware(CartProductDTO),
  (req, res, next) => {
    CartController.rmvProductFromCart(req, res, next);
    return;
  }
);

export default router;
