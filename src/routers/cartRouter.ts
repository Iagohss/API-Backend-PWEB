import express from 'express';
import CartController from '../controllers/cartController';

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

export default router;
