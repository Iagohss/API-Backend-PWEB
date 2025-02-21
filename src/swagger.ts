import swaggerJSDoc from "swagger-jsdoc";
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
        url: `http://localhost:${process.env.PORT || 3000}/api`,
      },
    ],
    ...swaggerSchemas, 
  },
  apis: ["./src/routers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
