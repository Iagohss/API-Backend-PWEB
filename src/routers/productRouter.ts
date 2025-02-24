import express from "express";
import ProductController from "../controllers/productController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
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
router.post("/", (req, res, next) => {
  ProductController.createProduct(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products:
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
 *       204:
 *         description: Nenhum produto encontrado
 */
router.get("/", (req, res, next) => {
  ProductController.getAllProducts(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/price:
 *   get:
 *     summary: Retorna produtos por faixa de preço
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado na faixa de preço
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
router.get("/price", (req, res, next) => {
  ProductController.getProductsByPrice(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/name:
 *   get:
 *     summary: Retorna produtos pelo nome
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado com o nome fornecido
 */
router.get("/name", (req, res, next) => {
  ProductController.getProductsByName(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/tamanho/{tamanho}:
 *   get:
 *     summary: Retorna produtos pelo tamanho
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: tamanho
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado com o tamanho fornecido
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
router.get("/tamanho/:tamanho", (req, res, next) => {
  ProductController.getProductsByTamanho(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/caimento/{caimento}:
 *   get:
 *     summary: Retorna produtos pelo caimento
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: caimento
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado com o caimento fornecido
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
router.get("/caimento/:caimento", (req, res, next) => {
  ProductController.getProductsByCaimento(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/material:
 *   get:
 *     summary: Retorna produtos pelo material
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: material
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado com o material fornecido
 */
router.get("/material", (req, res, next) => {
  ProductController.getProductsByMaterial(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/type:
 *   get:
 *     summary: Retorna produtos pelo tipo
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDTO'
 *       204:
 *         description: Nenhum produto encontrado com o tipo fornecido
 */
router.get("/type", (req, res, next) => {
  ProductController.getProductsByType(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/{id}:
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
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/:id", (req, res, next) => {
  ProductController.getProductById(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/{id}:
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
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/:id", (req, res, next) => {
  ProductController.updateProduct(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/{id}:
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
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", (req, res, next) => {
  ProductController.deleteProduct(req, res, next);
  return;
});

export default router;
