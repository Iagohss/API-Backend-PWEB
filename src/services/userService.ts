import { CreateUserDTO } from "../dtos/createUserDTO";
import { PaginationDTO } from "../dtos/paginationDTO";
import { UpdateUserDTO } from "../dtos/updateUserDTO";
import InvalidInputError from "../errors/invalidInputError";
import UserConflictError from "../errors/userConflictError";
import userNotFoundError from "../errors/userNotFoundError";
import { User } from "../models/user";
import CartRepository from "../repositories/cartRepository";
import UserRepository from "../repositories/userRepository";
import { hashPassword } from "../utils/auth";

class UserService {
  private userRepository;
  private cartRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async createUser(userDTO: CreateUserDTO): Promise<User & { cartId: string }> {
    const existingUser = await this.userRepository.getUserByEmail(
      userDTO.email
    );
    if (existingUser) throw new UserConflictError();

    const hashedPassowrd = await hashPassword(userDTO.password);

    const user = new User(
      userDTO.name,
      userDTO.email,
      hashedPassowrd,
      userDTO.admin
    );
    const newUser = await this.userRepository.createUser(user);
    const cart = await this.cartRepository.createCart(newUser.id);
    return {
      ...newUser,
      cartId: cart.id,
    };
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new userNotFoundError();
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new userNotFoundError();
    return user;
  }

  async getAllUsers(paginationDTO: PaginationDTO): Promise<User[]> {
    return await this.userRepository.getAllUsers(
      paginationDTO.offset,
      paginationDTO.limit
    );
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new userNotFoundError();

    let updatedFields: any = {};
    if (data.name) updatedFields.name = data.name;

    if (data.email && data.email != user.email) {
      const users = await this.userRepository.getUserByEmail(data.email);
      if (users) throw new UserConflictError();
      updatedFields.email = data.email;
    }

    if (data.password) {
      const hashedPassowrd = await hashPassword(data.password);
      updatedFields.password = hashedPassowrd;
    }
    if (data.admin) updatedFields.admin = data.admin;

    if (Object.keys(updatedFields).length === 0)
      throw new InvalidInputError(
        "Nenhum campo válido para atualização foi fornecido"
      );

    return await this.userRepository.updateUser(id, updatedFields);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new userNotFoundError();

    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;
