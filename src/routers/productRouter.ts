import express from "express";
import ProductController from "../controllers/productController";
import { validateBodyMiddleware } from "../middlewares/validateBodyMiddleware";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { validateParamsMiddleware } from "../middlewares/validateParamsMiddleware";
import { GetIdDTO } from "../dtos/idDTO";
import { ProductFilterDTO } from "../dtos/productFilterDTO";
import { UpdateProductDTO } from "../dtos/updateProductDTO";
import { authenticateAdmin } from "../middlewares/adminAuthMiddleware";
import { PaginationDTO } from "../dtos/paginationDTO";
import { validateQueryMiddleware } from "../middlewares/validateQueryMiddleware";

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
 *     description: Necessita de autenticação com privilégio de administrador.
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
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
router.post(
  "/",
  authenticateAdmin,
  validateBodyMiddleware(CreateProductDTO),
  async (req, res, next) => {
    await ProductController.createProduct(req, res, next);
    return;
  }
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     parameters:
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
router.get("/", validateQueryMiddleware(PaginationDTO), (req, res, next) => {
  ProductController.getAllProducts(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/filter:
 *   get:
 *     summary: Retorna produtos filtrados com base nos critérios fornecidos
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 500
 *           default: 500
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *           example: "Camiseta"
 *       - in: query
 *         name: cor
 *         required: false
 *         schema:
 *           type: string
 *           example: "Preto"
 *       - in: query
 *         name: tipo
 *         required: false
 *         schema:
 *           type: string
 *           example: "Camiseta"
 *       - in: query
 *         name: caimento
 *         required: false
 *         schema:
 *           type: string
 *           enum: [Fit, Slim, SlimFit, Regular, Oversized, Baggy, Reta]
 *           example: "Regular"
 *       - in: query
 *         name: material
 *         required: false
 *         schema:
 *           type: string
 *           example: "Algodão"
 *       - in: query
 *         name: tamanho
 *         required: false
 *         schema:
 *           type: string
 *           enum: [PP, P, M, G, GG]
 *           example: "M"
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *           example: 50.0
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *           example: 150.0
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
 *         description: Nenhum produto encontrado para os filtros fornecidos
 *       400:
 *         description: Requisição inválida. Pode ocorrer nos seguintes casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               Filtros não fornecidos:
 *                 value: { "error": "Pelo menos um filtro deve ser fornecido." }
 *               Apenas minPrice fornecido:
 *                 value: { "error": "Ambos minPrice e maxPrice devem ser fornecidos." }
 *               Apenas maxPrice fornecido:
 *                 value: { "error": "Ambos minPrice e maxPrice devem ser fornecidos." }
 *               minPrice maior que maxPrice:
 *                 value: { "error": "O preço mínimo não pode ser maior que o máximo." }
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get(
  "/filter",
  validateQueryMiddleware(PaginationDTO),
  validateQueryMiddleware(ProductFilterDTO),
  (req, res, next) => {
    ProductController.getFilteredProducts(req, res, next);
    return;
  }
);

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
router.get("/:id", validateParamsMiddleware(GetIdDTO), (req, res, next) => {
  ProductController.getProductById(req, res, next);
  return;
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     description: Necessita de autenticação com privilégio de administrador.
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
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
router.put(
  "/:id",
  authenticateAdmin,
  validateParamsMiddleware(GetIdDTO),
  validateBodyMiddleware(UpdateProductDTO),
  (req, res, next) => {
    ProductController.updateProduct(req, res, next);
    return;
  }
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     description: Necessita de autenticação com privilégio de administrador.
 *     tags: [Produtos]
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
router.delete(
  "/:id",
  authenticateAdmin,
  validateParamsMiddleware(GetIdDTO),
  (req, res, next) => {
    ProductController.deleteProduct(req, res, next);
    return;
  }
);

export default router;
