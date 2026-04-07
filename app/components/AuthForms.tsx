"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/lib/auth-actions";
import { AUTH_INITIAL_STATE } from "@/lib/auth-state";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, AUTH_INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          className="w-full border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
          Mot de passe
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          className="w-full border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>

      {state.error && <p className="text-xs" style={{ color: "#f87171" }}>{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full border px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:bg-foreground/5 disabled:opacity-50"
        style={{ borderColor: "var(--border-color)" }}
      >
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, AUTH_INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="register-name" className="mb-1 block text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
          Nom
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          required
          className="w-full border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>

      <div>
        <label htmlFor="register-email" className="mb-1 block text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          required
          className="w-full border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>

      <div>
        <label htmlFor="register-password" className="mb-1 block text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
          Mot de passe
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>

      {state.error && <p className="text-xs" style={{ color: "#f87171" }}>{state.error}</p>}
      {state.success && <p className="text-xs" style={{ color: "#4ade80" }}>{state.success}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full border px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:bg-foreground/5 disabled:opacity-50"
        style={{ borderColor: "var(--border-color)" }}
      >
        {pending ? "Création..." : "Créer un compte"}
      </button>
    </form>
  );
}
