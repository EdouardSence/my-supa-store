import { prisma } from "@/lib/prisma";
import type { Product } from "@/lib/products";

/**
 * Les champs `images` et `specs` sont stockés en JSON dans SQLite.
 * On les caste vers nos types applicatifs après récupération.
 */
function toProduct(raw: Awaited<ReturnType<typeof prisma.product.findFirst>>): Product | null {
  if (!raw) return null;
  return raw as unknown as Product;
}

function toProducts(
  raws: Awaited<ReturnType<typeof prisma.product.findMany>>,
): Product[] {
  return raws as unknown as Product[];
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return toProducts(rows);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return toProduct(row);
}

export async function getProductCount(): Promise<number> {
  return prisma.product.count();
}
