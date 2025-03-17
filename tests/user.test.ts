import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/users/";

describe("User Controller - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há usuários", async () => {
      const response = await axios.get(API_URL);
      expect(response.status).toBe(204);
      expect(response.data).toEqual("");
    });

    it("deve retornar uma lista de usuários", async () => {
      await prisma.user.create({
        data: {
          name: "João Silva",
          email: "joao@email.com",
          password: "123456",
          admin: false,
        },
      });

      const response = await axios.get(API_URL);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(1);
      expect(response.data[0].name).toBe("João Silva");
    });
  });

  describe("POST /", () => {
    it("deve criar um novo usuário", async () => {
      const newUser = {
        name: "Maria Souza",
        email: "maria@email.com",
        password: "654321",
        admin: true,
      };

      const response = await axios.post(API_URL, newUser);
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(newUser);
    });

    it("deve retornar erro 400 ao enviar um usuário inválido", async () => {
      const invalidUser = {
        email: "invalidemail",
      };

      await expect(axios.post(API_URL, invalidUser)).rejects.toThrowError(
        expect.objectContaining({
          response: expect.objectContaining({
            status: 400,
            data: expect.objectContaining({
              message: expect.any(String),
            }),
          }),
        })
      );
    });
  });
});