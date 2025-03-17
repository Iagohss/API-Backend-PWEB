import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/auth/";

describe("Auth Controller - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /login", () => {
    it("deve fazer login e retornar um token JWT", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Teste User",
          email: "teste@email.com",
          password: "123456",
          admin: false,
        },
      });

      const response = await axios.post(`${API_URL}login`, {
        email: user.email,
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("token");
    }, 10000);
  });

  describe("POST /logout", () => {
    it("deve fazer logout e remover o token", async () => {
      const response = await axios.post(`${API_URL}logout`);
      expect(response.status).toBe(200);
      expect(response.data.message).toBe("Logout realizado com sucesso");
    }, 10000);
  });
});
