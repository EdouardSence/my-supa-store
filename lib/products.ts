export type ProductSpecs = Record<string, string | number | boolean>;

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: {
    main: string;
    gallery: string[];
  };
  specs: ProductSpecs;
};

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Casque Over-Ear Pro",
    slug: "casque-over-ear-pro",
    description:
      "Casque audio professionnel avec réduction de bruit active, autonomie 30h. Coussinets en mousse mémoire, pliable avec étui rigide.",
    price: 249.99,
    currency: "EUR",
    stock: 42,
    sku: "AUD-CAS-001",
    category: "Audio",
    brand: "SoundMax",
    images: {
      main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
      ],
    },
    specs: {
      weight: "320g",
      driverSize: "40mm",
      impedance: "32 Ohm",
      bluetooth: true,
    },
  },
  {
    id: "prod-2",
    name: "Montre Connectée Sport",
    slug: "montre-connectee-sport",
    description:
      "Montre GPS avec suivi cardio, SpO2, 50+ modes sport. Écran AMOLED 1.4\", étanche 5 ATM, batterie 14 jours.",
    price: 179,
    currency: "EUR",
    stock: 0,
    sku: "WAT-SPT-002",
    category: "Wearables",
    brand: "FitTrack",
    images: {
      main: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
      ],
    },
    specs: {
      screenSize: "1.4 inch",
      waterResistance: "5 ATM",
      batteryDays: 14,
      gps: true,
    },
  },
  {
    id: "prod-3",
    name: "Clavier Mécanique RGB",
    slug: "clavier-mecanique-rgb",
    description:
      "Clavier 65% compact, switches Cherry MX Red, rétroéclairage RGB par touche. Alu usiné, repose-poignets magnétique inclus.",
    price: 149.99,
    currency: "EUR",
    stock: 18,
    sku: "KBD-MEC-003",
    category: "Périphériques",
    brand: "KeyFlow",
    images: {
      main: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
        "https://images.unsplash.com/photo-1541140534514-08295abd76af?w=800",
      ],
    },
    specs: {
      layout: "65%",
      switchType: "Cherry MX Red",
      backlight: "RGB",
      connection: "USB-C",
    },
  },
  {
    id: "prod-4",
    name: "Lampe de Bureau LED",
    slug: "lampe-bureau-led",
    description:
      "Lampe design réglable en hauteur et orientation. Température de couleur 2700K–6500K, intensité dimmable, base lestée.",
    price: 69,
    currency: "EUR",
    stock: 156,
    sku: "LMP-LED-004",
    category: "Bureau",
    brand: "Lumio",
    images: {
      main: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
        "https://images.unsplash.com/photo-1524484485832-bcea3bfd239c?w=800",
      ],
    },
    specs: {
      power: "12W",
      colorTemp: "2700K-6500K",
      dimmable: true,
      material: "Aluminium",
    },
  },
  {
    id: "prod-5",
    name: "Sac à Dos 25L Pro",
    slug: "sac-a-dos-25l-pro",
    description:
      'Sac pour laptop jusqu\'à 17", compartiment tablette, poches organisatrices. Tissu résistant à l\'eau, bretelles rembourrées.',
    price: 89.99,
    currency: "EUR",
    stock: 7,
    sku: "BAG-BP-005",
    category: "Accessoires",
    brand: "CarryAll",
    images: {
      main: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
      ],
    },
    specs: {
      capacity: "25L",
      laptopSleeve: "17 inch",
      waterResistant: true,
      weight: "0.9 kg",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(price);
}
