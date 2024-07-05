/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { z } from 'zod';
import notFound from './app/middlewares/notFound';
import { orderRoutes } from './app/modules/Order/order.route';
import { ProductRoutes } from './app/modules/product/product.routes';
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Mission To JP - Assignment-01');
});

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response) => {
  // Handling the Zod error with a professional error message
  if (err instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      message: `${
        err?.issues[0]?.message !== 'Required'
          ? `${err?.issues[0]?.code} : ${err?.issues[0]?.message}`
          : 'Field is required! Please provide required data.'
      }`,
      error: err?.issues,
    });
  } else if (err?.code === 11000 && err.keyPattern.name) {
    res.status(400).json({
      success: false,
      message: 'Product name must be unique. The name already exists.',
    });
  } else {
    // Sending JSON response with error details
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
});

// Not Found Route - 404
app.use(notFound);

export default app;
