import { User } from '../models/user';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(name: string, email: string, password: string, admin: boolean) {
    const user = new User(name, email, password, admin);

    return await this.userRepository.createUser(user);
  }

  async getUser(id: string) {
    return await this.userRepository.getUser(id);
  }

  async updateUser(id: string, name: string, email: string, password: string, admin: boolean) {
    const userChanges = new User(name, email, password, admin);

    return await this.userRepository.updateUser(id, userChanges);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;