import axios from "axios";
import prisma from "../src/utils/prisma";

const API_URL = "http://localhost:3000/api/users/";

describe("User Update & Delete - Testes de Integração", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("PUT /:id", () => {
    it("deve atualizar um usuário", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Antigo Nome",
          email: "antigo@email.com",
          password: "123456",
          admin: false,
        },
      });

      const response = await axios.put(`${API_URL}${user.id}`, {
        name: "Novo Nome",
      });

      expect(response.status).toBe(200);
      expect(response.data.name).toBe("Novo Nome");
    }, 10000);
  });

  describe("DELETE /:id", () => {
    it("deve deletar um usuário", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Usuário a ser deletado",
          email: "delete@email.com",
          password: "123456",
          admin: false,
        },
      });

      const response = await axios.delete(`${API_URL}${user.id}`);
      expect(response.status).toBe(204);
    }, 10000);
  });
});
