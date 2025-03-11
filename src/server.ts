import "reflect-metadata";
import dotenv from "dotenv";
import { Express, Request, Response } from "express";
import app from "./app";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
setupSwagger(app);
fs.writeFileSync(
  path.join(__dirname, "swagger.yaml"),
  JSON.stringify(swaggerSpec),
  "utf8"
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
