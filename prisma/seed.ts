import { PrismaClient, type Prisma } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import productsJson from "../domains/catalog/data/products.json";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

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
};

const products = productsJson as unknown as JsonProduct[];

async function main() {
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
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });