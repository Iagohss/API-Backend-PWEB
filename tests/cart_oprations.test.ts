import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/carts/";

describe("Cart Operations - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.cartProduct.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /:id/add", () => {
    it("deve adicionar um produto ao carrinho", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Usuário Carrinho",
          email: "carrinho@email.com",
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
      
      const product = await prisma.product.create({
        data: {
          nome: "Tênis",
          cor: "Branco",
          tipo: "Esportivo",
          caimento: "Regular",
          material: "Couro",
          tamanho: "M",
          preco: 299.99,
        },
      });

      const response = await axios.post(`${API_URL}${cart.id}/add`, {
        productId: product.id,
        quantidade: 2,
      });

      expect(response.status).toBe(200);
      expect(response.data.cartProducts.length).toBe(1);
      expect(response.data.cartProducts[0].quantidade).toBe(2);
    }, 10000);
  });
});
