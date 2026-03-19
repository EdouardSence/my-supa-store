import Link from "next/link";
import { unstable_cache } from "next/cache";
import { computePrimes } from "@/lib/primes";
import PrimeCalculator from "@/app/components/PrimeCalculator";

async function getPrimesUncached(limit: number) {
  const start = performance.now();
  const result = computePrimes(limit);
  const time = performance.now() - start;
  console.log(`[UNCACHED] computePrimes(${limit}) took ${time.toFixed(2)}ms`);
  return { ...result, time };
}

const getPrimesCached = unstable_cache(
  async (limit: number) => {
    const start = performance.now();
    const result = computePrimes(limit);
    const time = performance.now() - start;
    console.log(`[CACHED] computePrimes(${limit}) took ${time.toFixed(2)}ms`);
    return { ...result, time };
  },
  ["primes"],
  { revalidate: 60, tags: ["primes"] }
);

async function PrimesCached() {
  const start = performance.now();
  const result = await getPrimesCached(100000);
  const time = performance.now() - start;

  return (
    <div
      className="p-4"
      style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
    >
      <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
        Avec unstable_cache
      </p>
      <p className="mt-2 font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
        Temps total (incl. cache): <span className="text-foreground">{time.toFixed(2)}ms</span>
      </p>
      <p className="font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
        Temps calcul réel: <span className="text-foreground">{result.time.toFixed(2)}ms</span>
      </p>
      <p className="font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
        Premiers trouvés: <span className="text-foreground">{result.count.toLocaleString()}</span>
      </p>
    </div>
  );
}

async function PrimesUncached() {
  const start = performance.now();
  const result = await getPrimesUncached(100000);
  const time = performance.now() - start;

  return (
    <div
      className="p-4"
      style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
    >
      <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
        Sans cache
      </p>
      <p className="mt-2 font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
        Temps d&apos;exécution: <span className="text-foreground">{time.toFixed(2)}ms</span>
      </p>
      <p className="font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
        Premiers trouvés: <span className="text-foreground">{result.count.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default function CacheDemoPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 py-6 font-mono text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted-fg)" }}
      >
        <Link href="/" className="transition-colors hover:text-foreground">Accueil</Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <span className="text-foreground">Cache Demo</span>
      </nav>

      <h1
        className="text-4xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-bitcount)" }}
      >
        unstable_cache Demo
      </h1>
      <p className="mt-4 text-lg" style={{ color: "var(--muted-fg)" }}>
        Comparaison de performance avec et sans cache pour le crible d&apos;Ératosthène.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-bitcount)" }}
          >
            Résultat mis en cache
          </h2>
          <PrimesCached />
          <p className="mt-4 font-mono text-xs" style={{ color: "var(--muted-fg)" }}>
            La première requête calcule et met en cache. Les requêtes suivantes
            retournent le résultat directement depuis le cache.
          </p>
        </section>

        <section>
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-bitcount)" }}
          >
            Résultat non mis en cache
          </h2>
          <PrimesUncached />
          <p className="mt-4 font-mono text-xs" style={{ color: "var(--muted-fg)" }}>
            Chaque requête recalcule le résultat. Comparez les temps d&apos;exécution
            dans la console.
          </p>
        </section>
      </div>

      <section className="mt-16">
        <h2
          className="mb-6 text-xl font-bold"
          style={{ fontFamily: "var(--font-bitcount)" }}
        >
          Test interactif
        </h2>
        <PrimeCalculator />
      </section>

      <section className="mt-16 border-t pt-12" style={{ borderColor: "var(--border-color)" }}>
        <h2
          className="mb-4 text-xl font-bold"
          style={{ fontFamily: "var(--font-bitcount)" }}
        >
          Analyse des performances
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="p-4" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              SSG / ISR
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>
              Temps de build + revalidation. Ideal pour contenu statique.
            </p>
          </div>
          <div className="p-4" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              Dynamic
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>
              Calcul à chaque requête. Pour données personnalisées.
            </p>
          </div>
          <div className="p-4" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              unstable_cache
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>
              Cache的记忆 + invalidation. Pour calculs coûteux récurrents.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
