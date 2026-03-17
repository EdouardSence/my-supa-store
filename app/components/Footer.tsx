import Link from "next/link";

const footerSections = [
  {
    title: "Boutique",
    links: [
      { href: "/produits", label: "Tous les produits" },
      { href: "/nouveautes", label: "Nouveautés" },
      { href: "/promotions", label: "Promotions" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/livraison", label: "Livraison" },
      { href: "/retours", label: "Retours" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/cgv", label: "CGV" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border-color)", background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block font-mono text-xs font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            >
              My Supa Store
            </Link>
            <div
              className="mt-3 h-px w-8"
              style={{ background: "var(--accent)" }}
              aria-hidden
            />
            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: "var(--muted-fg)" }}
            >
              La boutique en ligne pour tous vos besoins.
            </p>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="mb-4 font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-xs transition-colors hover:text-foreground"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
          style={{ borderColor: "var(--border-color)" }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "var(--muted-fg)" }}
          >
            &copy; {currentYear} My Supa Store
          </p>
          <p
            className="font-mono text-[9px] tracking-[0.15em] uppercase"
            style={{ color: "var(--muted-fg)" }}
          >
            Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
