import { CreateUserDTO } from "../dtos/createUserDTO";
import { LoginDTO } from "../dtos/loginDTO";
import { UpdateUserDTO } from "../dtos/updateUserDTO";
import InvalidInputError from "../errors/invalidInputError";
import UserNotFoundError from "../errors/userNotFoundError";
import UserRepository from "../repositories/userRepository";
import { comparePassword, generateToken } from "../utils/auth";

class AuthService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async autenticateUser(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userRepository.getUserByEmail(loginDTO.email);
    if (!user) throw new UserNotFoundError();

    const isPasswordValid = await comparePassword(
      loginDTO.password,
      user.password
    );
    if (!isPasswordValid)
      throw new InvalidInputError("Invalid username or password");

    const token = generateToken(user.id, user.name, user.admin);
    return token;
  }
}

export default AuthService;
