import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminProductEditForm from "@/app/components/AdminProductEditForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Admin / Produits</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">Modifier le produit</h1>
        </div>
        <Link
          href="/admin/produits"
          className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-600 hover:text-white"
        >
          Retour à la liste
        </Link>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <AdminProductEditForm
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            stock: product.stock,
            sku: product.sku,
            category: product.category,
            brand: product.brand,
          }}
        />
      </div>
    </div>
  );
}
