import z from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(3).max(20),
  description: z.string().trim().min(3).max(100),

  price: z.coerce.number().min(0),

  brand: z.string().trim().default("Genérico"),

  images: z.array(z.string()).default([]),

  category: z.string().trim().min(3).max(20),

  // opcional y permite null
  subcategory: z.string().trim().min(3).max(20).nullable().optional(),

  // opcional y permite null
  subsubcategory: z.string().trim().min(3).max(20).nullable().optional(),

  stock: z.coerce.number().min(0),

  isActive: z.boolean().default(true),

  discount: z.coerce.number().min(0).max(100).default(0),
  discountActive: z.boolean().default(false),
});
