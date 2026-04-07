import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Espace protégé — My Supa Store",
  description: "Page réservée aux utilisateurs authentifiés.",
};

export default async function EspaceProtegePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/connexion");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <header className="border-b pb-5" style={{ borderColor: "var(--border-color)" }}>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
          Accès privé
        </p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          Espace protégé
        </h1>
      </header>

      <div className="mt-6 border p-5" style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}>
        <p className="text-sm" style={{ color: "var(--muted-fg)" }}>
          Bonjour <span className="font-semibold text-foreground">{session.user.name ?? session.user.email}</span>,
          vous êtes connecté.
        </p>
      </div>
    </div>
  );
}
