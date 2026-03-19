import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSponsoredProductByHandle, getSponsoredProducts } from "@/lib/graphql/client";
import type { SponsoredProduct } from "@/lib/graphql/types";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  const products = await getSponsoredProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.title} — My Supa Store`,
    description: `Produit sponsorisé: ${product.title}`,
  };
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default async function SponsoredProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) notFound();

  const price = product.priceRange.minVariantPrice;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 py-6 font-mono text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted-fg)" }}
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          Accueil
        </Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <span style={{ color: "var(--accent)" }}>Sponsorisé</span>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1px_1fr]">
        <div className="flex flex-col gap-4 pr-0 pb-12 lg:pr-12 lg:pb-0">
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            {product.images.edges[0]?.node && (
              <Image
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText ?? product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
            <span
              className="absolute left-0 top-6 px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{
                background: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              Sponsorisé
            </span>
          </div>

          {product.images.edges.length > 1 && (
            <ul className="flex gap-2">
              {product.images.edges.map((edge, i) => (
                <li
                  key={i}
                  className="relative h-16 w-16 flex-shrink-0 overflow-hidden"
                  style={{ border: "1px solid var(--border-color)" }}
                >
                  <Image
                    src={edge.node.url}
                    alt={edge.node.altText ?? `Vue ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="hidden lg:block"
          style={{ background: "var(--border-color)" }}
        />

        <div className="flex flex-col gap-8 pt-0 lg:pl-12 lg:pt-0">
          <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
            <div
              className="mb-8 h-px w-12 origin-left"
              style={{
                background: "var(--accent)",
                animation: "reveal-line 0.8s ease forwards",
              }}
              aria-hidden
            />
            <p
              className="mb-2 font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "var(--muted-fg)" }}
            >
              Produit Sponsorisé
            </p>
            <h1
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-bitcount), monospace" }}
            >
              {product.title}
            </h1>
          </div>

          <div
            className="flex items-baseline justify-between border-b pb-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <span
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight"
            >
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
              style={{
                color: product.availableForSale
                  ? "var(--accent)"
                  : "var(--muted-fg)",
                border: `1px solid ${
                  product.availableForSale
                    ? "var(--accent)"
                    : "var(--border-color)"
                }`,
              }}
            >
              {product.availableForSale ? "En stock" : "Rupture"}
            </span>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            <p
              className="font-mono text-[9px] tracking-widest uppercase mb-2"
              style={{ color: "var(--muted-fg)" }}
            >
              Contenu sponsorisé
            </p>
            <p className="text-sm" style={{ color: "var(--muted-fg)" }}>
              Ce produit est présenté par un partenaire. Les conditions de vente
              et de livraison peuvent varier.
            </p>
          </div>

          <Link
            href="/"
            className="w-full rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--muted-fg)",
              color: "var(--background)",
            }}
          >
            Découvrir plus de produits
          </Link>
        </div>
      </div>
    </div>
  );
}
