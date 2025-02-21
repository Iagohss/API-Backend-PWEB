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
 * /carts:
 *   post:
 *     summary: Cria um novo carrinho para um usuário
 *     tags: [Carrinhos]
 */
router.post('/', (req, res, next) => CartController.createCart(req, res, next));

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Busca um carrinho pelo ID
 *     tags: [Carrinhos]
 */
router.get('/:id', (req, res, next) => CartController.getCartById(req, res, next));

/**
 * @swagger
 * /carts/user/{userId}:
 *   get:
 *     summary: Busca o carrinho aberto de um usuário
 *     tags: [Carrinhos]
 */
router.get('/user/:userId', (req, res, next) => CartController.getOpenCartByUser(req, res, next));

/**
 * @swagger
 * /carts/{id}/close:
 *   put:
 *     summary: Fecha um carrinho
 *     tags: [Carrinhos]
 */
router.put('/:id/close', (req, res, next) => CartController.closeCart(req, res, next));

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Deleta um carrinho
 *     tags: [Carrinhos]
 */
router.delete('/:id', (req, res, next) => CartController.deleteCart(req, res, next));

export default router;
