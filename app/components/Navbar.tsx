import Link from "next/link";
import CartCount from "./CartCount";
import { auth } from "@/auth";
import LogoutButton from "./LogoutButton";

const navLinks = [
  { href: "/produits", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
];

function getTrigram(name: string | null | undefined, fallback: string): string {
  const source = (name?.trim() || fallback.trim()).toUpperCase();
  const lettersOnly = source.replace(/[^A-ZÀ-ÖØ-Ý]/g, "");
  return (lettersOnly.slice(0, 3) || "USR").padEnd(3, "X");
}

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const trigram = user ? getTrigram(user.name, user.email ?? "USR") : null;
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--border-color] bg-[--background]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1 text-base leading-none transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          <span>My Supa Store</span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
            aria-hidden
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-[11px] tracking-widest text-[--muted-fg] uppercase transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <CartCount />
          {isAdmin && (
            <Link
              href="/admin"
              className="font-mono text-[11px] tracking-widest text-[--muted-fg] uppercase transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/espace-protege"
                className="font-mono text-[11px] tracking-widest text-[--muted-fg] uppercase transition-colors hover:text-foreground"
              >
                {trigram}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/connexion"
              className="rounded-none border border-foreground/20 px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
