import { UserDTO } from '../dtos/userDTO';
import UserConflictError from '../errors/userConflictError';
import userNotFoundError from '../errors/userNotFoundError';
import { User } from '../models/user';
import CartRepository from '../repositories/cartRepository';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository;
  private cartRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async createUser(userDTO : UserDTO ): Promise<User & {cartId: string}>  {
    const existingUser = await this.userRepository.getUserByEmail(userDTO.email);
    if(existingUser)
      throw new UserConflictError();

    const user = new User(
      userDTO.name, 
      userDTO.email, 
      userDTO.password, 
      userDTO.admin
    );
    const newUser = await this.userRepository.createUser(user);
    const cart = await this.cartRepository.createCart(newUser.id);
    return {
      ...newUser,
      cartId: cart.id,
    };
  }

  async getUser(id: string): Promise<User>  {
    const user = await this.userRepository.getUser(id);
    if (!user)
      throw new userNotFoundError();
    return user;
  }

  async getAllUsers(): Promise<User[]>  {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id: string, name: string, email: string, password: string, admin: boolean): Promise<User> {
    const user = await this.userRepository.getUser(id);
    if (!user)
      throw new userNotFoundError();

    if (user.email != email){
      const users = await this.userRepository.getUserByEmail(email);
      if (users) throw new UserConflictError();
    }

    const userChanges = new User(name, email, password, admin);
    return await this.userRepository.updateUser(id, userChanges);
  }

  async deleteUser(id: string): Promise<void>  {
    const user = await this.userRepository.getUser(id);
    if (!user)
      throw new userNotFoundError();

    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;