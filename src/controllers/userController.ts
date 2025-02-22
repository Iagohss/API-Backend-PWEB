import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import { UserDTO } from "../dtos/userDTO";
import InvalidInputError from "../errors/invalidInputError";
import UserConflictError from "../errors/userConflictError";
import UserNotFoundError from "../errors/userNotFoundError";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO: UserDTO = req.body;
      const user = await this.userService.createUser(userDTO);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof UserConflictError) {
        return res.status(409).json({ message: error.message });
      }
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        return res.status(204).send();
      }
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password, admin } = req.body;
      const updatedUser = await this.userService.updateUser(
        id,
        name,
        email,
        password,
        admin
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: "Dados de entrada inválidos." });
      }
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      if (error instanceof UserConflictError) {
        return res.status(409).json({ message: error.message });
      }
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      next(error);
    }
  }
}

export default new UserController();
