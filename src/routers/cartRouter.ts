import express from 'express';
import CartController from '../controllers/cartController';
import cartController from '../controllers/cartController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carrinhos
 *   description: Endpoints para gerenciamento de carrinhos
 */

/**
 * @swagger
 * /api/carts/{userId}:
 *   post:
 *     summary: Gera um novo carrinho vazio para um usuário
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 */
router.post('/:userId', (req, res, next) => CartController.createCart(req, res, next));

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
 */
router.get('/', (req, res, next) => cartController.getAllCarts(req, res, next));

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
 */
router.get('/:id', (req, res, next) => CartController.getCartById(req, res, next));

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
 */
router.get('/user/:userId', (req, res, next) => CartController.getOpenCartByUser(req, res, next));

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
 */
router.put('/close/:id', (req, res, next) => CartController.closeCart(req, res, next));

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     summary: deleta um carrinho
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
 */
router.delete('/:id', (req, res, next) => CartController.deleteCart(req, res, next));

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
 */
router.put('/product/add', (req, res, next) => CartController.addProductToCart(req, res, next));

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
 */
router.delete('/product/rmv', (req, res, next) => CartController.rmvProductFromCart(req, res, next));

export default router;
