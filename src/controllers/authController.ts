import { NextFunction, Request, Response } from "express";
import AuthService from "../services/authService";
import { LoginDTO } from "../dtos/loginDTO";
import UserNotFoundError from "../errors/userNotFoundError";
import InvalidInputError from "../errors/invalidInputError";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDTO: LoginDTO = req.body;
      const token = await this.authService.autenticateUser(loginDTO);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof InvalidInputError) {
        return res.status(400).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export default new AuthController();
