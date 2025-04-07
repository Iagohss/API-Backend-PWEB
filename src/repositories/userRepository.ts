import InvalidInputError from "../errors/invalidInputError";
import UserNotFoundError from "../errors/userNotFoundError";
import { User } from "../models/user";
import prisma from "../utils/prisma";

class UserRepository {
  async createUser(user: User): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          admin: user.admin,
        },
      });
      return newUser;
    } catch (error) {
      throw new InvalidInputError("Erro ao criar o usuário");
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      return user;
    } catch (error) {
      throw new UserNotFoundError();
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw new UserNotFoundError();
    }
  }

  async getAllUsers(offset: number, limit: number): Promise<User[]> {
    return prisma.user.findMany({
      skip: offset,
      take: limit,
    });
  }

  async updateUser(id: string, user: User): Promise<User> {
    try {
      const filteredData = Object.fromEntries(
        Object.entries({
          name: user.name,
          email: user.email,
          password: user.password,
        }).filter(([_, value]) => value !== undefined)
      );

      return await prisma.user.update({
        where: {
          id: id,
        },
        data: filteredData,
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao atualizar o usuário");
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new InvalidInputError("Erro ao deletar o usuário");
    }
  }
}

export default UserRepository;
