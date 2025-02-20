import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { swaggerSchemas } from "./swaggerSchemas";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PWEB",
      version: "1.0.0",
      description: "Documentação da API da disciplina de PWEB",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    ...swaggerSchemas, 
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
