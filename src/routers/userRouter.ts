import express from 'express';
import UserController from '../controllers/userController';

export const router = express();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               admin:
 *                 type: boolean
 *           example:
 *             name: "Jon Doe"
 *             email: "jondoe@email.com"
 *             password: "123"
 *             admin: false
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 admin:
 *                   type: boolean
 *             example:
 *               id: "a73c85b6"
 *               name: "Jon Doe"
 *               email: "jondoe@email.com"
 *               password: "123"
 *               admin: false
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/', (req, res, next) => UserController.createUser(req, res, next));

/**
 * @swagger
 * /users/{id}:
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 admin:
 *                   type: boolean
 *             example:
 *               id: "a73c85b6"
 *               name: "Jon Doe"
 *               email: "jondoe@email.com"
 *               password: "123"
 *               admin: false
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', (req, res, next) => {
  UserController.getUser(req, res, next);
  return;
});

/**
 * @swagger
 * /users:
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   admin:
 *                     type: boolean
 *             example:
 *               - id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48"
 *                 name: "Jon Doe"
 *                 email: "jondoe@email.com"
 *                 password: "123"
 *                 admin: false
 *               - id: "b45d12c7-ef3d-4908-82cd-12f5ea03c7a9"
 *                 name: "Jane Doe"
 *                 email: "janedoe@email.com"
 *                 password: "456"
 *                 admin: true
 */
router.get('/', (req, res, next) => {
  UserController.getAllUsers(req, res, next);
  return;
});


/**
 * @swagger
 * /users/{id}:
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               admin:
 *                 type: boolean
 *           example:
 *             name: "Jon Doe"
 *             email: "jondoe@email.com"
 *             password: "123"
 *             admin: false
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', (req, res, next) => UserController.updateUser(req, res, next));

/**
 * @swagger
 * /users/{id}:
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
 */
router.delete('/:id', (req, res, next) => UserController.deleteUser(req, res, next));

export default router;