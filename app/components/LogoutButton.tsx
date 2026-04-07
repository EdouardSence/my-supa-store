"use client";

import { useActionState } from "react";
import { logoutAction } from "@/lib/auth-actions";

export default function LogoutButton() {
  const [, formAction, pending] = useActionState(logoutAction, null);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-none border border-foreground/20 px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {pending ? "Sortie..." : "Déconnexion"}
      </button>
    </form>
  );
}
