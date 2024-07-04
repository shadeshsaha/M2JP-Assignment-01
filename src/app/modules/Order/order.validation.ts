import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export default orderValidationSchema;
