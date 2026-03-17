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
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              My Supa Store
            </Link>
            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
              La boutique en ligne pour tous vos besoins.
            </p>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
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
        <div className="mt-10 border-t border-foreground/10 pt-6 text-center text-sm text-foreground/50">
          &copy; {currentYear} My Supa Store. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
