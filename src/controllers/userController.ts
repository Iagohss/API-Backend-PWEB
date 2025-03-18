import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import { CreateUserDTO } from "../dtos/createUserDTO";
import InvalidInputError from "../errors/invalidInputError";
import UserConflictError from "../errors/userConflictError";
import UserNotFoundError from "../errors/userNotFoundError";
import { UpdateUserDTO } from "../dtos/updateUserDTO";
import { PaginationDTO } from "../dtos/paginationDTO";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO: CreateUserDTO = req.body;
      const user = await this.userService.createUser(userDTO);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof UserConflictError) {
        return res.status(409).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
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
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationDTO: PaginationDTO = req.query as unknown as PaginationDTO;
      const users = await this.userService.getAllUsers(paginationDTO);
      if (users.length === 0) {
        return res.status(204).send();
      }
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateUserDTO: UpdateUserDTO = req.body;
      const updatedUser = await this.userService.updateUser(id, updateUserDTO);
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof UserConflictError) {
        return res.status(409).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export default new UserController();
