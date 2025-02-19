import express from "express";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

export default app;

