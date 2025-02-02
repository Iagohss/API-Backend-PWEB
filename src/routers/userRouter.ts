import express from 'express';
import UserController from '../controllers/userController';

export const router = express();

router.post('/', (req, res, next) => UserController.createUser(req, res, next));

router.get('/:id', (req, res, next) => {
  UserController.getUser(req, res, next)
  return;
});

router.put('/:id', (req, res, next) => UserController.updateUser(req, res, next));

router.delete('/:id', (req, res, next) => UserController.deleteUser(req, res, next));

export default router;