import { prisma } from "@/lib/prisma";
import type { Product } from "@/lib/products";

function toProduct(raw: Awaited<ReturnType<typeof prisma.product.findFirst>>): Product | null {
  if (!raw) return null;
  return raw as unknown as Product;
}

function toProducts(
  raws: Awaited<ReturnType<typeof prisma.product.findMany>>,
): Product[] {
  return raws as unknown as Product[];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return toProducts(rows);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(200);
  const row = await prisma.product.findUnique({ where: { slug } });
  return toProduct(row);
}

export async function getProductCount(): Promise<number> {
  return prisma.product.count();
}

export async function getSimilarProducts(productId: string): Promise<Product[]> {
  await delay(1500);
  const rows = await prisma.similarProduct.findMany({
    where: { productId },
    orderBy: { score: "asc" },
    take: 4,
    include: {
      similarProduct: true,
    },
  });
  return toProducts(rows.map((r: { similarProduct: unknown }) => r.similarProduct));
}
