import express from "express";
import UserController from "../controllers/userController";

export const router = express();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseWithCartId'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Email já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/", (req, res, next) => {
  UserController.createUser(req, res, next);
  return;
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/:id", (req, res, next) => {
  UserController.getUser(req, res, next);
  return;
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       204:
 *         description: Não há usuários cadastrados
 */
router.get("/", (req, res, next) => {
  UserController.getAllUsers(req, res, next);
  return;
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
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
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Email já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/:id", (req, res, next) => {
  UserController.updateUser(req, res, next);
  return;
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", (req, res, next) => {
  UserController.deleteUser(req, res, next);
  return;
});

export default router;
