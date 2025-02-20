import { UserDTO } from '../dtos/userDTO';
import { User } from '../models/user';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userDTO : UserDTO ): Promise<User>  {
    const user = new User(
      userDTO.name, 
      userDTO.email, 
      userDTO.password, 
      userDTO.admin
    );
    return await this.userRepository.createUser(user);
  }

  async getUser(id: string): Promise<User>  {
    return await this.userRepository.getUser(id);
  }

  async getAllUsers(): Promise<User[]>  {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id: string, name: string, email: string, password: string, admin: boolean): Promise<User> {
    const userChanges = new User(name, email, password, admin);

    return await this.userRepository.updateUser(id, userChanges);
  }

  async deleteUser(id: string): Promise<void>  {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;