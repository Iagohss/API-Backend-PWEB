import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/carts/";

describe("Cart Controller - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há carrinhos", async () => {
      const response = await axios.get(API_URL);
      expect(response.status).toBe(204);
      expect(response.data).toEqual("");
    });

    it("deve retornar uma lista de carrinhos", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Teste User",
          email: "teste@email.com",
          password: "123456",
          admin: false,
        },
      });
      
      await prisma.cart.create({
        data: {
          userId: user.id,
          isOpen: true,
        },
      });

      const response = await axios.get(API_URL);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(1);
    });
  });

  describe("POST /", () => {
    it("deve criar um novo carrinho", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Novo Usuário",
          email: "novo@email.com",
          password: "123456",
          admin: false,
        },
      });
      
      const newCart = {
        userId: user.id,
      };

      const response = await axios.post(API_URL, newCart);
      expect(response.status).toBe(201);
      expect(response.data.userId).toBe(newCart.userId);
    });
  });
});