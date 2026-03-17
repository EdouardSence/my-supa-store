import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold text-foreground/10">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-3 max-w-sm text-sm text-foreground/50">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/produits"
          className="rounded-lg border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5 transition-colors"
        >
          Voir les produits
        </Link>
      </div>
    </div>
  );
}
