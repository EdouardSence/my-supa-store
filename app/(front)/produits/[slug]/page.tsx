import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductBySlug, getSimilarProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductTabs from "@/app/components/ProductTabs";
import SimilarProducts from "@/app/components/SimilarProducts";
import SimilarProductsSkeleton from "@/app/components/SimilarProductsSkeleton";
import ProductInfoSkeleton from "@/app/components/ProductInfoSkeleton";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} — My Supa Store`,
    description: product.description,
  };
}

async function ProductInfo({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
    throw new Error("Product not found");
  }

  const { name, description, price, currency, stock, brand, specs, sku, id } = product;
  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <div className="flex flex-col gap-8 pt-0 lg:pl-12 lg:pt-0">
      <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
        <div
          className="mb-8 h-px w-12 origin-left"
          style={{ background: "var(--accent)", animation: "reveal-line 0.8s ease forwards" }}
          aria-hidden
        />
        <p className="mb-2 font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--muted-fg)" }}>
          {brand}
        </p>
        <h1
          className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          {name}
        </h1>
        <p className="mt-2 font-mono text-[9px] tracking-widest" style={{ color: "var(--muted-fg)" }}>
          SKU: {sku}
        </p>
      </div>

      <div className="flex items-baseline justify-between border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
        <span className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
          {formatPrice(price, currency)}
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
          style={
            !inStock
              ? { color: "var(--muted-fg)", border: "1px solid var(--border-color)" }
              : lowStock
              ? { background: "var(--accent)", color: "var(--accent-fg)" }
              : { color: "var(--accent)", border: "1px solid var(--accent)" }
          }
        >
          {!inStock ? "Rupture" : lowStock ? `${stock} restants` : "En stock"}
        </span>
      </div>

      <AddToCartButton productId={id} inStock={inStock} />

      <Suspense fallback={<div className="border-t pt-8 h-48" style={{ borderColor: "var(--border-color)" }} />}>
        <ProductTabs description={description} specs={specs} />
      </Suspense>
    </div>
  );
}

async function SimilarProductsSection({ productId }: { productId: string }) {
  const similar = await getSimilarProducts(productId);
  if (similar.length === 0) return null;
  return <SimilarProducts products={similar} />;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
    return null;
  }

  const { name, images, category, stock } = product;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 py-6 font-mono text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted-fg)" }}
      >
        <Link href="/" className="transition-colors hover:text-foreground">Accueil</Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <Link href="/produits" className="transition-colors hover:text-foreground">Produits</Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <span className="text-foreground">{name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1px_1fr]">
        <div className="flex flex-col gap-4 pr-0 pb-12 lg:pr-12 lg:pb-0">
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
          >
            <Image
              src={images.main}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span
              className="absolute left-0 top-6 px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              {category}
            </span>
            {stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(12,12,12,0.7)" }}>
                <span className="font-mono text-sm tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
                  Rupture de stock
                </span>
              </div>
            )}
          </div>

          {images.gallery.length > 1 && (
            <ul className="flex gap-2">
              {images.gallery.map((src: string, i: number) => (
                <li
                  key={i}
                  className="relative h-16 w-16 flex-shrink-0 overflow-hidden"
                  style={{ border: "1px solid var(--border-color)" }}
                >
                  <Image src={src} alt={`${name} — vue ${i + 1}`} fill sizes="64px" className="object-cover" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden lg:block" style={{ background: "var(--border-color)" }} />

        <Suspense fallback={<ProductInfoSkeleton />}>
          <ProductInfo slug={slug} />
        </Suspense>
      </div>

      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProductsSection productId={product.id} />
      </Suspense>
    </div>
  );
}
