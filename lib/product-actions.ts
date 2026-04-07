"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productFormSchema } from "@/lib/product-schema";
import type { ProductFormState } from "@/lib/product-schema";

export async function updateProductAction(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const raw = Object.fromEntries(formData.entries());

  const parsed = productFormSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Erreur de validation.";
    return { error: firstError, success: null, values: null };
  }

  const { id, name, slug, description, price, stock, sku, category, brand } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Produit introuvable.", success: null, values: null };
  }

  // Check slug uniqueness (exclude current product)
  if (slug !== existing.slug) {
    const slugTaken = await prisma.product.findUnique({ where: { slug } });
    if (slugTaken) {
      return { error: "Ce slug est déjà utilisé par un autre produit.", success: null, values: null };
    }
  }

  const previousSlug = existing.slug;

  // Check SKU uniqueness (exclude current product)
  if (sku !== existing.sku) {
    const skuTaken = await prisma.product.findUnique({ where: { sku } });
    if (skuTaken) {
      return { error: "Ce SKU est déjà utilisé par un autre produit.", success: null, values: null };
    }
  }

  await prisma.product.update({
    where: { id },
    data: { name, slug, description, price, stock, sku, category, brand },
  });

  revalidatePath("/admin/produits");
  if (slug !== previousSlug) {
    revalidatePath(`/produits/${previousSlug}`);
  }
  revalidatePath(`/produits/${slug}`);
  revalidatePath("/");

  return { error: null, success: "Produit mis à jour avec succès.", values: null };
}
