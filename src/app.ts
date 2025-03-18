import express from "express";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import cartRouter from "./routers/cartRouter";
import purchaseRouter from "./routers/purchaseRouter";
import authRouter from "./routers/authRouter";
import "reflect-metadata";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/purchases", purchaseRouter);

export default app;
