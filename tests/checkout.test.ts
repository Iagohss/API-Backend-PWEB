import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/purchases/";

describe("Checkout - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.purchase.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /", () => {
    it("deve finalizar uma compra", async () => {
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
      
      const response = await axios.post(API_URL, {
        cartId: cart.id,
        precoTotal: 599.99,
        formaPagamento: "Cartão de Crédito",
      });

      expect(response.status).toBe(201);
      expect(response.data.precoTotal).toBe(599.99);
    }, 10000);
  });
});
