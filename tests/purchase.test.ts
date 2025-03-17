import axios from "axios";
import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/auth";
import app from "../src/app";
import http from "http";

let server: http.Server;
let token: string;
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api`;

describe("Purchase Controller - Testes de Integração", () => {
  beforeAll(async () => {
    server = app.listen(PORT);

    const adminUser = {
      name: "admin user",
      email: `admin${Date.now()}@email.com`,
      password: "admin123",
      admin: true,
    };

    await prisma.purchase.deleteMany();
    await prisma.cart.deleteMany();
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
    await prisma.purchase.deleteMany();
  });

  afterAll(async () => {
    await prisma.purchase.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  describe("POST /purchases", () => {
    it("deve finalizar uma compra", async () => {
      try {
        const newUser = await prisma.user.create({
          data: {
            name: "Usuário de Teste",
            email: `teste${Date.now()}@email.com`,
            password: "123456",
            admin: false,
          },
        });

        const newCart = await prisma.cart.create({
          data: {
            userId: newUser.id,
            isOpen: true,
          },
        });

        const newProduct = await prisma.product.create({
          data: {
            nome: "Camiseta",
            cor: "Azul",
            tipo: "Casual",
            caimento: "Slim",
            material: "Algodão",
            tamanho: "M",
            preco: 59.99,
          },
        });

        await axios.put(`${API_URL}/carts/product/add`, {
          cartId: newCart.id,
          productId: newProduct.id,
          quantidade: 1,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const response = await axios.post(`${API_URL}/purchases`, {
          cartId: newCart.id,
          formaPagamento: "Cartão de Crédito",
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(response.status).toBe(201);
      } catch (error) {
        console.error("Erro ao finalizar a compra: ", error);
      }
    }, 20000);
  });

  describe("GET /purchases", () => {
    it("deve listar todas as compras", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário de Teste",
          email: `teste${Date.now()}@email.com`,
          password: "123456",
          admin: false,
        },
      });

      const newCart = await prisma.cart.create({
        data: {
          userId: newUser.id,
          isOpen: false,
        },
      });

      await prisma.purchase.create({
        data: {
          cartId: newCart.id,
          precoTotal: 100.00,
          formaPagamento: "Cartão de Crédito",
        },
      });

      const response = await axios.get(`${API_URL}/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect([200, 204]).toContain(response.status);
    });
  });

  describe("GET /purchases/user/:id", () => {
    it("deve listar compras de um usuário", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário de Teste",
          email: `teste${Date.now()}@email.com`,
          password: "123456",
          admin: false,
        },
      });

      const newCart = await prisma.cart.create({
        data: {
          userId: newUser.id,
          isOpen: false,
        },
      });

      await prisma.purchase.create({
        data: {
          cartId: newCart.id,
          precoTotal: 150.00,
          formaPagamento: "Pix",
        },
      });

      const response = await axios.get(`${API_URL}/purchases/user/${newUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect([200, 204]).toContain(response.status);
    });
  });

  describe("DELETE /purchases/:id", () => {
    it("deve excluir uma compra", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário de Teste",
          email: `teste${Date.now()}@email.com`,
          password: "123456",
          admin: false,
        },
      });

      const newCart = await prisma.cart.create({
        data: {
          userId: newUser.id,
          isOpen: false,
        },
      });

      const newPurchase = await prisma.purchase.create({
        data: {
          cartId: newCart.id,
          precoTotal: 150.00,
          formaPagamento: "Cartão de Crédito",
        },
      });

      const response = await axios.delete(`${API_URL}/purchases/${newPurchase.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(204);
    });
  });
});
