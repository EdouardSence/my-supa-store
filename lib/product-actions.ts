"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productFormSchema } from "@/lib/product-schema";
import { HOME_PRODUCTS_TAG } from "@/lib/queries";
import type { ProductFormState, ProductFormValues } from "@/lib/product-schema";

function getDraftValues(raw: Record<string, FormDataEntryValue>): Partial<ProductFormValues> {
  const toNumber = (value: FormDataEntryValue | undefined): number | undefined => {
    if (typeof value !== "string") return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    id: typeof raw.id === "string" ? raw.id : undefined,
    name: typeof raw.name === "string" ? raw.name : undefined,
    slug: typeof raw.slug === "string" ? raw.slug : undefined,
    description: typeof raw.description === "string" ? raw.description : undefined,
    price: toNumber(raw.price),
    stock: toNumber(raw.stock),
    sku: typeof raw.sku === "string" ? raw.sku : undefined,
    category: typeof raw.category === "string" ? raw.category : undefined,
    brand: typeof raw.brand === "string" ? raw.brand : undefined,
  };
}

export async function updateProductAction(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

  try {
    const parsed = productFormSchema.safeParse(raw);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Erreur de validation.";
      return { error: firstError, success: null, values: getDraftValues(raw) };
    }

    const { id, name, slug, description, price, stock, sku, category, brand } = parsed.data;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Produit introuvable.", success: null, values: getDraftValues(raw) };
    }

    // Check slug uniqueness (exclude current product)
    if (slug !== existing.slug) {
      const slugTaken = await prisma.product.findUnique({ where: { slug } });
      if (slugTaken) {
        return {
          error: "Ce slug est déjà utilisé par un autre produit.",
          success: null,
          values: getDraftValues(raw),
        };
      }
    }

    const previousSlug = existing.slug;

    // Check SKU uniqueness (exclude current product)
    if (sku !== existing.sku) {
      const skuTaken = await prisma.product.findUnique({ where: { sku } });
      if (skuTaken) {
        return {
          error: "Ce SKU est déjà utilisé par un autre produit.",
          success: null,
          values: getDraftValues(raw),
        };
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
    revalidateTag(HOME_PRODUCTS_TAG, "max");

    return { error: null, success: "Produit mis à jour avec succès.", values: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue côté serveur.";
    return {
      error: `Impossible de mettre à jour le produit: ${message}`,
      success: null,
      values: getDraftValues(raw),
    };
  }
}

export async function testErrorAction(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    error: "Impossible de mettre à jour le produit: Erreur simulée (test UX): la mise à jour a échoué.",
    success: null,
    values: getDraftValues(raw),
  };
}
