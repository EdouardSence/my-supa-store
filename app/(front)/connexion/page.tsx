import type { Metadata } from "next";
import { LoginForm, RegisterForm } from "@/app/components/AuthForms";

export const metadata: Metadata = {
  title: "Connexion — My Supa Store",
  description: "Connectez-vous ou créez votre compte.",
};

export default function ConnexionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="mb-10 border-b pb-5" style={{ borderColor: "var(--border-color)" }}>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
          Authentification
        </p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          Connexion
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="border p-5" style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}>
          <h2 className="mb-4 font-mono text-[11px] tracking-widest uppercase">Se connecter</h2>
          <LoginForm />
        </section>

        <section className="border p-5" style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}>
          <h2 className="mb-4 font-mono text-[11px] tracking-widest uppercase">Créer un compte</h2>
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}
