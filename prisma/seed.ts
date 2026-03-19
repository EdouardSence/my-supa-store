import { PrismaClient, type Prisma } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import productsJson from "../domains/catalog/data/products.json";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma: any = new PrismaClient({ adapter });

type JsonProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: { main: string; gallery: string[] };
  specs: Record<string, unknown>;
  similar?: string[];
};

const products = productsJson as unknown as JsonProduct[];

async function main() {
  await prisma.similarProduct.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      currency: p.currency,
      stock: p.stock,
      sku: p.sku,
      category: p.category,
      brand: p.brand,
      images: p.images as Prisma.InputJsonValue,
      specs: p.specs as Prisma.InputJsonValue,
    })),
  });
  console.log(`Seed OK: ${products.length} produits insérés.`);

  const slugToId = new Map(products.map((p) => [p.slug, p.id]));
  const similarData: {
    productId: string;
    similarProductId: string;
    score: number;
  }[] = [];

  for (const p of products) {
    if (!p.similar?.length) continue;
    p.similar.forEach((slug, index) => {
      const similarId = slugToId.get(slug);
      if (similarId && similarId !== p.id) {
        similarData.push({
          productId: p.id,
          similarProductId: similarId,
          score: index + 1,
        });
      }
    });
  }

  if (similarData.length) {
    await prisma.similarProduct.createMany({ data: similarData });
    console.log(`Seed OK: ${similarData.length} liens similaires insérés.`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
