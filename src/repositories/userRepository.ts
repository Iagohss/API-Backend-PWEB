import { User } from "../models/user";
import prisma from "../utils/prisma";

class UserRepository {
  async createUser(user: User) {
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
      throw new Error('Erro ao criar um usuário.');
    }
  }

  async getUser(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      return user; 
    } catch (error) {
      throw new Error('Erro ao buscar o usuário pelo e-mail.');
    }
  }

  async updateUser(id: string, user: User): Promise<void> {
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
      
    } catch (error) {
      throw new Error('Erro ao atualizar usuário.');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new Error('Erro ao deletar usuário.');
    }
  }

}

export default UserRepository;
