import cors from "cors";
import express, { Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Mission To JP - Assignment-01");
});

export default app;
