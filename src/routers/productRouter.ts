import express from 'express';
import ProductController from '../controllers/productController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDTO:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         tipo:
 *           type: string
 *         caimento:
 *           type: string
 *           enum: [Fit, Slim, SlimFit, Regular, Oversized, Baggy, Reta]
 *         material:
 *           type: string
 *         tamanho:
 *           type: string
 *           enum: [PP, P, M, G, GG]
 *         preco:
 *           type: number
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
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDTO'
 */
router.post('/', (req, res, next) => ProductController.createProduct(req, res, next));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 */
router.get('/', (req, res, next) => ProductController.getAllProducts(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDTO'
 */
router.get('/:id', (req, res, next) => ProductController.getProductById(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDTO'
 */
router.put('/:id', (req, res, next) => ProductController.updateProduct(req, res, next));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 */
router.delete('/:id', (req, res, next) => ProductController.deleteProduct(req, res, next));

export default router;
