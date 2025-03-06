import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/products/";

describe("Product Controller - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há produtos", async () => {
      const response = await axios.get(API_URL);
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

      const response = await axios.get(API_URL);

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

      const response = await axios.post(API_URL, newProduct);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(newProduct);
    });

    it("deve retornar erro 400 ao enviar um produto inválido", async () => {
      const invalidProduct = {
        nome: "",
        preco: -10,
      };

      await expect(axios.post(API_URL, invalidProduct)).rejects.toThrowError(
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
