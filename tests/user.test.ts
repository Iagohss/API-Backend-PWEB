import axios from "axios";
import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/auth";
import app from "../src/app";
import http from "http";

let server: http.Server;
let token: string;

const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api`;

const adminUser = {
  name: "admin user",
  email: "admin@email.com",
  password: "admin123",
  admin: true,
};

describe("User Controller - Testes de Integração", () => {
  beforeAll(async () => {
    server = app.listen(PORT);
  }, 20000);

  beforeEach(async () => {
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
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  describe("POST /users", () => {
    it("deve cadastrar um usuário válido", async () => {
      const newUser = {
        name: "João Silva",
        email: `joao.silva${Date.now()}@teste.com`,
        password: "senha123",
      };

      const response = await axios.post(`${API_URL}/users/`, newUser);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty("name", newUser.name);
      expect(response.data).toHaveProperty("email", newUser.email);
    });

    it("não deve permitir cadastro sem dados obrigatórios", async () => {
      const newUser = {};

      await expect(axios.post(`${API_URL}/users/`, newUser)).rejects.toThrow(
        expect.objectContaining({
          response: expect.objectContaining({
            status: 400,
          }),
        })
      );
    });
  });

  describe("GET /users", () => {
    it("deve listar todos os usuários", async () => {
      const response = await axios.get(`${API_URL}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(1);
    });
  });

  describe("GET /users/:id", () => {
    it("deve buscar um usuário pelo ID", async () => {
      const userData = {
        name: "test user",
        email: `test${Date.now()}@email.com`,
        password: "test123",
        admin: true,
      };

      const hashedPassword = await hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          admin: userData.admin,
        },
      });

      const response = await axios.get(`${API_URL}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("id", user.id);
      expect(response.data).toHaveProperty("name");
      expect(response.data).toHaveProperty("email");
    });
  });

  describe("PUT /users/:id", () => {
    it("deve atualizar os dados de um usuário", async () => {
      const userData = {
        name: "test user",
        email: `test${Date.now()}@email.com`,
        password: "test123",
        admin: true,
      };

      const updatedUser = {
        name: "João Silva Atualizado",
      };

      const hashedPassword = await hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          admin: userData.admin,
        },
      });

      const response = await axios.put(
        `${API_URL}/users/${user.id}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("name", updatedUser.name);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deve excluir um usuário", async () => {
      const userData = {
        name: "test user",
        email: `test${Date.now()}@email.com`,
        password: "test123",
        admin: true,
      };

      const hashedPassword = await hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          admin: userData.admin,
        },
      });

      const response = await axios.delete(`${API_URL}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status).toBe(204);
    });
  });

  describe("POST /auth/login", () => {
    it("deve fazer login com credenciais válidas", async () => {
      const userData = {
        name: "test user",
        email: `test${Date.now()}@email.com`,
        password: "test123",
        admin: true,
      };

      const hashedPassword = await hashPassword(userData.password);
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          admin: userData.admin,
        },
      });

      const loginResponse = await axios.post(`${API_URL}/auth/login/`, {
        email: userData.email,
        password: userData.password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.data).toHaveProperty("token");
      token = loginResponse.data.token;
    });

    it("não deve permitir login com credenciais inválidas", async () => {
      const userData = {
        name: "test user",
        email: `test${Date.now()}@email.com`,
        password: "test123",
        admin: true,
      };

      const hashedPassword = await hashPassword(userData.password);
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          admin: userData.admin,
        },
      });

      await expect(
        axios.post(`${API_URL}/auth/login/`, {
          email: userData.email,
          password: "senhaErrada",
        })
      ).rejects.toThrow(
        expect.objectContaining({
          response: expect.objectContaining({
            status: 400,
            data: expect.objectContaining({
              message: expect.stringMatching("Invalid username or password"),
            }),
          }),
        })
      );
    });
  });
});
