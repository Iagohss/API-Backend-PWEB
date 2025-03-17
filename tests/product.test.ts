import axios from "axios";
import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/auth";
import app from "../src/app";
import http from "http";



let server: http.Server;
let token: string;
const PORT = process.env.PORT || 3000; 

const API_URL = `http://localhost:${PORT}/api`;

describe("Product Controller - Testes de Integração", () => {
  beforeAll(async () => {
    server = app.listen(PORT);

    const adminUser = {
      name: "admin user",
      email: "admin@email.com",
      password: "admin123",
      admin: true,
    };

    await prisma.cart.deleteMany();
    await prisma.user.deleteMany({
      where: { email: adminUser.email },
    });

    const hashedPassword = await hashPassword(adminUser.password);
    await prisma.user.create({
      data: {
        name: adminUser.name,
        email: adminUser.email,
        password: hashedPassword,
        admin: adminUser.admin,
      },
    });

    const loginResponse = await axios.post(`${API_URL}/auth/login/`, {
      email: adminUser.email,
      password: adminUser.password,
    });

    token = loginResponse.data.token;
  }, 20000);

  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há produtos", async () => {
      const response = await axios.get(`${API_URL}/products/`);
      expect(response.status).toBe(204);
      expect(response.data).toEqual("");
    });

    it("deve retornar uma lista de produtos", async () => {
      await prisma.product.create({
        data: {
          nome: "Camiseta",
          cor: "Azul",
          tipo: "Camiseta",
          caimento: "Slim",
          material: "Algodão",
          tamanho: "M",
          preco: 59.99,
        },
      });

      const response = await axios.get(`${API_URL}/products/`);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(1);
      expect(response.data[0].nome).toBe("Camiseta");
    });
  });

  describe("POST /", () => {
    it("deve criar um novo produto e retorná-lo", async () => {
      const newProduct = {
        nome: "Calça Jeans",
        cor: "Preta",
        tipo: "Calça",
        caimento: "Regular",
        material: "Jeans",
        tamanho: "G",
        preco: 129.99,
      };

      const response = await axios.post(`${API_URL}/products/`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(newProduct);
    });

    it("deve retornar erro 400 ao enviar um produto inválido", async () => {
      const invalidProduct = {
        nome: "",
        preco: -10,
      };

      await expect(
        axios.post(`${API_URL}/products/`, invalidProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).rejects.toThrow(
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
