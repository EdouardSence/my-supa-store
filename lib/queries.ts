import { prisma } from "@/lib/prisma";
import type { Product } from "@/lib/products";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const HOME_PRODUCTS_TAG = "home-products";

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

const getHomeProductsCachedInternal = unstable_cache(
  async (): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    return toProducts(rows);
  },
  ["home-products-v1"],
  {
    revalidate: 3600,
    tags: [HOME_PRODUCTS_TAG],
  },
);

export async function getHomeProducts(): Promise<Product[]> {
  return getHomeProductsCachedInternal();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return toProduct(row);
}

export async function getProductCount(): Promise<number> {
  return prisma.product.count();
}

export const getSimilarProducts = cache(async (productId: string): Promise<Product[]> => {
  const rows = await prisma.similarProduct.findMany({
    where: { productId },
    orderBy: { score: "asc" },
    take: 4,
    include: {
      similarProduct: true,
    },
  });
  return toProducts(rows.map((r) => r.similarProduct));
});
