import { z } from 'zod';

// Variant schema validation
const variantValidationSchema = z.object({
  type: z.string({
    required_error: 'Variant type is required',
    invalid_type_error: 'Variant type must be a string',
  }),
  value: z.string({
    required_error: 'Variant value is required',
    invalid_type_error: 'Variant value must be a string',
  }),
});

// Inventory schema validation
const inventoryValidationSchema = z.object({
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
  inStock: z.boolean({
    required_error: 'InStock status is required',
    invalid_type_error: 'InStock must be a boolean',
  }),
});

// Product schema validation
export const productValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }),
  tags: z.array(z.string(), {
    required_error: 'Tags are required',
    invalid_type_error: 'Tags must be an array of strings',
  }),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
  isDeleted: z.boolean().optional().default(false),
});

// Update product schema
export const updateProductValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .optional(),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .optional(),
  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .optional(),
  tags: z
    .array(z.string(), {
      required_error: 'Tags are required',
      invalid_type_error: 'Tags must be an array of strings',
    })
    .optional(),
  variants: z.array(variantValidationSchema).optional(),
  inventory: inventoryValidationSchema.optional(),
  isDeleted: z.boolean().optional(),
});
