import dotenv from "dotenv";
import express, { Request, Response } from "express";
import app from "./app";
import { setupSwagger } from "./swagger";

const path = require('path');

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

setupSwagger(app);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

app.use(express.static(path.join(__dirname, 'public')));