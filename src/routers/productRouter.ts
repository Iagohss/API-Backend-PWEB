import express from "express";
import ProductController from "../controllers/productController";
import { validateBodyMiddleware } from "../middlewares/validateBodyMiddleware";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { validateParamsMiddleware } from "../middlewares/validateParamsMiddleware";
import { GetIdDTO } from "../dtos/getIdDTO";
import { ProductFilterDTO } from "../dtos/productFilterDTO";
import { UpdateProductDTO } from "../dtos/updateProductDTO";
import { authenticateAdmin } from "../middlewares/adminAuthMiddleware";

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
 * /api/products/filter:
 *   post:
 *     summary: Retorna produtos filtrados com base nos critérios fornecidos
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductFilterDTO"
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ProductDTO"
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
router.post(
  "/filter",
  validateBodyMiddleware(ProductFilterDTO),
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
