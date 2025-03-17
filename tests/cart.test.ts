import axios from "axios";
import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/auth";
import app from "../src/app";
import http from "http";

let server: http.Server;
let token: string;
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api`;

describe("Cart Controller - Testes de Integração", () => {
  beforeAll(async () => {
    server = app.listen(PORT);

    const adminUser = {
      name: "admin user",
      email: `admin${Date.now()}@email.com`,
      password: "admin123",
      admin: true,
    };

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
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.cart.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  describe("GET /carts", () => {
    it("deve listar todos os carrinhos", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário de Teste",
          email: `teste${Date.now()}@email.com`,
          password: "123456",
          admin: false,
        },
      });

      await prisma.cart.create({
        data: {
          userId: newUser.id,
          isOpen: true,
        },
      });

      const response = await axios.get(`${API_URL}/carts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect([200, 204]).toContain(response.status);
    });
  });

  describe("PUT /carts/product/add", () => {
    it("deve adicionar um produto ao carrinho", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário Teste",
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

      const response = await axios.put(`${API_URL}/carts/product/add`, {
        cartId: newCart.id,
        productId: newProduct.id,
        quantidade: 1,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /carts/:id", () => {
    it("deve excluir um carrinho", async () => {
      const newUser = await prisma.user.create({
        data: {
          name: "Usuário Teste",
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

      const response = await axios.delete(`${API_URL}/carts/${newCart.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(204);
    });
  });

  describe("DELETE /carts/product/rmv", () => {
    it("deve remover um produto do carrinho", async () => {
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

      const response = await axios.delete(`${API_URL}/carts/product/rmv`, {
        data: { cartId: newCart.id, productId: newProduct.id, quantidade: 1 },
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(200);
    });
  });

  describe("PUT /carts/product/add - Restrição de Acesso", () => {
    it("deve impedir usuários não autenticados de adicionar itens ao carrinho", async () => {
      await expect(
        axios.put(`${API_URL}/carts/product/add`, {
          cartId: "cart-exemplo",
          productId: "produto-exemplo",
          quantidade: 1,
        })
      ).rejects.toThrowError(
        expect.objectContaining({ response: expect.objectContaining({ status: 401 }) })
      );
    });
  });

  describe("GET /carts/user/:id", () => {
    it("deve visualizar carrinho aberto de um usuário", async () => {
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

      const response = await axios.get(`${API_URL}/carts/user/${newUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(200);
    });
  });

  describe("GET /carts/:id", () => {
    it("deve buscar um carrinho pelo ID", async () => {
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
  
      const response = await axios.get(`${API_URL}/carts/${newCart.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(newCart.id);
    });
  });  
});
