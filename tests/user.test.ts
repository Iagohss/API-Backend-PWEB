import axios from "axios";
import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/auth";
import app from "../src/app";
import http from "http";

let server: http.Server;
let token: string;
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api`;

describe("User Controller - Testes de Integração", () => {
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
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  describe("GET /", () => {
    it("deve retornar uma lista vazia quando não há usuários", async () => {
      const response = await axios.get(`${API_URL}/users/`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(204);
      expect(response.data).toEqual("");
    });
  });

  describe("POST /", () => {
    it("deve criar um novo usuário e retorná-lo", async () => {
      const newUser = {
        name: "Maria Souza",
        email: "maria@email.com",
        password: "654321",
        admin: false,
      };

      const response = await axios.post(`${API_URL}/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      
  

      expect(response.status).toBe(201);
      expect(response.data.name).toBe(newUser.name);
      expect(response.data.admin).toBe(newUser.admin);
      expect(response.data.email).toBe(newUser.email);
    });
  });
});