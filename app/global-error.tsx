"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="bg-[--background] text-[--foreground] antialiased">
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--accent)" }}>
            Erreur critique
          </p>

          <p className="mt-4 text-7xl font-bold text-foreground/10">500</p>

          <h1
            className="mt-4 text-2xl font-semibold"
            style={{ fontFamily: "var(--font-bitcount), monospace" }}
          >
            L&apos;application a rencontré une erreur
          </h1>

          <p className="mt-3 max-w-md text-sm" style={{ color: "var(--muted-fg)" }}>
            Une erreur inattendue est survenue. Vous pouvez réessayer maintenant ou retourner à l&apos;accueil.
          </p>

          {error.digest ? (
            <p className="mt-2 font-mono text-xs text-foreground/30">#{error.digest}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Réessayer
            </button>

            <Link
              href="/"
              className="rounded-lg border border-foreground/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
