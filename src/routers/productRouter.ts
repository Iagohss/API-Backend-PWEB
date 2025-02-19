import express from 'express';
import ProductController from '../controllers/productController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints para gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               caimento:
 *                 type: string
 *               material:
 *                 type: string
 *               tamanho:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', (req, res, next) => ProductController.createProduct(req, res, next));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 */
router.get('/', (req, res, next) => ProductController.getAllProducts(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 */
router.get('/:id', (req, res, next) => ProductController.getProductById(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 */
router.put('/:id', (req, res, next) => ProductController.updateProduct(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 */
router.delete('/:id', (req, res, next) => ProductController.deleteProduct(req, res, next));

export default router;
