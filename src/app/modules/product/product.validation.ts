import { z } from "zod";

// Define the variants schema
const variantValidationSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

// Define the product schema
export const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(variantValidationSchema),
  inventory: z.object({
    quantity: z.number().int().min(0),
    inStock: z.boolean(),
  }),
});

export default productValidationSchema;
