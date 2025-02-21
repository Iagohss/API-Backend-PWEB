import express from "express";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import cartRouter from "./routers/cartRouter";

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

export default app;

