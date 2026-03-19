"use client";

import { useState } from "react";
import { computePrimes } from "@/lib/primes";

export default function PrimeCalculator() {
  const [limit, setLimit] = useState(100000);
  const [result, setResult] = useState<{ count: number; sum: number; limit: number; time: number } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    setLoading(true);
    const start = performance.now();
    const res = computePrimes(limit);
    const time = performance.now() - start;
    setResult({ ...res, time });
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
          Limite:
        </label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="bg-transparent border px-3 py-2 font-mono text-sm"
          style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
          min={10}
          max={10000000}
        />
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        >
          {loading ? "Calcul..." : "Calculer"}
        </button>
      </div>

      {result && (
        <div
          className="grid grid-cols-2 gap-4 p-4"
          style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
        >
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
              Nombres premiers
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-bitcount)" }}>
              {result.count.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
              Somme totale
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-bitcount)" }}>
              {result.sum.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
              Limite
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-bitcount)" }}>
              {result.limit.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              Temps d&apos;exécution
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-bitcount)", color: "var(--accent)" }}>
              {result.time.toFixed(2)}ms
            </p>
          </div>
        </div>
      )}

      <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
        Crible d&apos;Ératosthène — Complexité O(n log log n)
      </p>
    </div>
  );
}
