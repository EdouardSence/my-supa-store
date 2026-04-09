import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getProductBySlug, getAllProducts, getSimilarProducts } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductTabs from "@/app/components/ProductTabs";
import ProductInfoSkeleton from "@/app/components/ProductInfoSkeleton";
import SimilarProducts from "@/app/components/SimilarProducts";
import SimilarProductsSkeleton from "@/app/components/SimilarProductsSkeleton";
import SponsoredProductsSection from "@/app/components/SponsoredProductsSection";
import SponsoredProductsSkeleton from "@/app/components/SponsoredProductsSkeleton";
import { getSponsoredProducts } from "@/lib/graphql/client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getFirstGalleryImage(images: unknown): string | null {
  if (!images || typeof images !== "object") return null;

  const gallery = (images as { gallery?: unknown }).gallery;
  if (!Array.isArray(gallery)) return null;

  const first = gallery.find((value): value is string => typeof value === "string" && value.length > 0);
  return first ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      images: true,
    },
  });

  if (!product) return { title: "Produit introuvable" };

  const firstGalleryImage = getFirstGalleryImage(product.images);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: firstGalleryImage
        ? [
            {
              url: firstGalleryImage,
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
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

async function SimilarSection({ productId, abGroup }: { productId: string; abGroup: "A" | "B" }) {
  const similar = await getSimilarProducts(productId);
  if (similar.length === 0) return null;
  return <SimilarProducts products={similar} abGroup={abGroup} />;
}

async function SponsoredSection() {
  const sponsored = await getSponsoredProducts();
  if (sponsored.length === 0) return null;
  return <SponsoredProductsSection products={sponsored} />;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const abCookie = cookieStore.get("ab_group")?.value;
  const abGroup = abCookie === "B" ? "B" : "A";

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
        <SimilarSection productId={product.id} abGroup={abGroup} />
      </Suspense>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredSection />
      </Suspense>
    </div>
  );
}
