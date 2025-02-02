import dotenv from "dotenv";
import express, { Request, Response } from "express";
import app from "./app";

const path = require('path');

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

app.use(express.static(path.join(__dirname, 'public')));