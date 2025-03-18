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
      email: `admin@email.com`,
      password: "admin123",
      admin: true,
    };

    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

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
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  describe("GET /products", () => {
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

  describe("POST /products", () => {
    it("deve cadastrar um novo produto com um usuário administrador", async () => {
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
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(newProduct);
    });

    it("deve impedir um usuário comum de cadastrar um produto", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Usuário Comum",
          email: `user${Date.now()}@email.com`,
          password: await hashPassword("123456"),
          admin: false,
        },
      });

      const userLoginResponse = await axios.post(`${API_URL}/auth/login/`, {
        email: user.email,
        password: "123456",
      });

      const userToken = userLoginResponse.data.token;

      const newProduct = {
        nome: "Tênis",
        cor: "Branco",
        tipo: "Esportivo",
        caimento: "Slim",
        material: "Couro",
        tamanho: "M",
        preco: 299.99,
      };

      await expect(
        axios.post(`${API_URL}/products/`, newProduct, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          response: expect.objectContaining({ status: 403 }),
        })
      );
    });
  });

  describe("POST /products/filter", () => {
    it("deve buscar produtos aplicando filtros corretamente", async () => {
      await prisma.product.createMany({
        data: [
          {
            nome: "Camiseta Slim",
            cor: "Azul",
            tipo: "Casual",
            caimento: "Slim",
            material: "Algodão",
            tamanho: "M",
            preco: 79.99,
          },
          {
            nome: "Bermuda Jeans",
            cor: "Preta",
            tipo: "Casual",
            caimento: "Regular",
            material: "Jeans",
            tamanho: "G",
            preco: 119.99,
          },
        ],
      });

      const validFilters = {
        tipo: "Casual",
        minPrice: 50,
        maxPrice: 150,
      };

      const queryParams = new URLSearchParams(validFilters as any).toString();
      const response = await axios.get(
        `${API_URL}/products/filter?${queryParams}`
      );

      expect(response.status).toBe(200);
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  describe("PUT /products/:id", () => {
    it("deve atualizar um produto existente", async () => {
      const product = await prisma.product.create({
        data: {
          nome: "Tênis Esportivo",
          cor: "Preto",
          tipo: "Esportivo",
          caimento: "Regular",
          material: "Sintético",
          tamanho: "G",
          preco: 249.99,
        },
      });

      const updatedProduct = { preco: 199.99 };

      const response = await axios.put(
        `${API_URL}/products/${product.id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.preco).toBe(updatedProduct.preco);
    });
  });

  describe("DELETE /products/:id", () => {
    it("deve excluir um produto", async () => {
      const product = await prisma.product.create({
        data: {
          nome: "Boné",
          cor: "Preto",
          tipo: "Acessório",
          caimento: "Regular",
          material: "Poliéster",
          tamanho: "M",
          preco: 49.99,
        },
      });

      const response = await axios.delete(`${API_URL}/products/${product.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(204);
    });
  });
});
