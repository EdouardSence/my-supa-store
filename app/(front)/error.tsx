"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FrontError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-5xl font-bold text-foreground/10">Erreur</p>
      <h1 className="mt-4 text-2xl font-semibold">Quelque chose s&apos;est mal passé</h1>
      <p className="mt-3 max-w-sm text-sm text-foreground/50">
        Une erreur inattendue est survenue. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-foreground/30">#{error.digest}</p>
      )}
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          Réessayer
        </button>
        <a
          href="/"
          className="rounded-lg border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5 transition-colors"
        >
          Accueil
        </a>
      </div>
    </div>
  );
}
