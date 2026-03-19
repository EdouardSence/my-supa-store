"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RevalidateButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRevalidate() {
    setLoading(true);
    await fetch("/api/revalidate", { method: "POST" });
    router.refresh();
    await new Promise((r) => setTimeout(r, 100));
    setLoading(false);
  }

  return (
    <button
      onClick={handleRevalidate}
      disabled={loading}
      className="px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border transition-colors hover:bg-foreground/5 disabled:opacity-50"
      style={{ borderColor: "var(--border-color)", color: "var(--muted-fg)" }}
      title="Actualiser le cache"
    >
      {loading ? "..." : "↻"}
    </button>
  );
}
