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
      email: "admin@email.com",
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
  });

  afterAll(async () => {
    await prisma.cart.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  describe("PUT /product/add", () => { 
    it("deve adicionar um produto ao carrinho", async () => {
      try {
        const newUser = await prisma.user.create({
          data: {
            name: "Usuário de Teste",
            email: "teste@email.com",
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

        const cartId = newCart.id;

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
          cartId,
          productId: newProduct.id,
          quantidade: 1,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(response.status).toBe(200);
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho: ", error);
      }
    }, 20000);
  });
});