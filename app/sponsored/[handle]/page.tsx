import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSponsoredProductByHandle, getSponsoredProducts } from "@/lib/graphql/client";
import type { SponsoredProduct } from "@/domains/catalog/entity/sponsoredProduct";

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
    title: `${product.name} — My Supa Store`,
    description: `Produit sponsorisé: ${product.name}`,
  };
}

function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export default async function SponsoredProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) notFound();

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
        <span className="text-foreground">{product.name}</span>
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
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
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
              {product.name}
            </h1>
          </div>

          <div
            className="flex items-baseline justify-between border-b pb-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <span
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight"
            >
              {formatPrice(product.price, product.currency)}
            </span>
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
              style={{
                color: "var(--accent)",
                border: "1px solid var(--accent)",
              }}
            >
              En stock
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
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "var(--accent-fg)",
            }}
          >
            Voir sur Mock.shop →
          </Link>
        </div>
      </div>
    </div>
  );
}
