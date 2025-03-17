import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/purchases/";

describe("Purchase Controller - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.purchase.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há compras", async () => {
      const response = await axios.get(API_URL);
      expect(response.status).toBe(204);
      expect(response.data).toEqual("");
    }, 10000);

    it("deve retornar uma lista de compras", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Usuário Teste",
          email: "usuarioteste@email.com",
          password: "123456",
          admin: false,
        },
      });
      
      const cart = await prisma.cart.create({
        data: {
          userId: user.id,
          isOpen: true,
        },
      });
      
      await prisma.purchase.create({
        data: {
          cartId: cart.id,
          precoTotal: 150.00,
          formaPagamento: "Cartão",
          data: new Date(),
        },
      });

      const response = await axios.get(API_URL);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(1);
    }, 10000);
  });

  describe("POST /", () => {
    it("deve criar uma nova compra", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Usuário Compra",
          email: "comprador@email.com",
          password: "123456",
          admin: false,
        },
      });
      
      const cart = await prisma.cart.create({
        data: {
          userId: user.id,
          isOpen: true,
        },
      });
      
      const newPurchase = {
        cartId: cart.id,
        precoTotal: 200.75,
        formaPagamento: "Pix",
      };

      const response = await axios.post(API_URL, newPurchase);
      expect(response.status).toBe(201);
      expect(response.data.precoTotal).toBe(newPurchase.precoTotal);
    }, 10000);
  });
});
