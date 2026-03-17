import Link from "next/link";
import CartCount from "./CartCount";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          My Supa Store
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <CartCount />
          <Link
            href="/connexion"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            Connexion
          </Link>
        </div>
      </nav>
    </header>
  );
}
