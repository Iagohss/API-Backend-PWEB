import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
// Função para criptografar a senha
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Função para comparar a senha
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
// Função para gerar um token JWT
export const generateToken = (
  userId: string,
  username: string,
  admin: boolean
): string => {
  return jwt.sign({ id: userId, username, admin }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
// Função para verificar um token JWT
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
