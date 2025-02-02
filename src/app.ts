import express from "express";

const app = express();

app.use(express.json());

//app.use('/api/users', userRoutes);

export default app;

