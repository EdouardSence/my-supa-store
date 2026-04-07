import { z } from "zod";

export const productFormSchema = z.object({
  id: z.string().min(1, "L'ID est requis."),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  slug: z.string().min(2, "Le slug doit contenir au moins 2 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  price: z.coerce.number().positive("Le prix doit être positif."),
  stock: z.coerce.number().int().nonnegative("Le stock doit être ≥ 0."),
  sku: z.string().min(3, "Le SKU doit contenir au moins 3 caractères."),
  category: z.string().min(1, "La catégorie est requise."),
  brand: z.string().min(1, "La marque est requise."),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type ProductFormState = {
  error: string | null;
  success: string | null;
  values: Partial<ProductFormValues> | null;
};

export const PRODUCT_FORM_INITIAL_STATE: ProductFormState = {
  error: null,
  success: null,
  values: null,
};
