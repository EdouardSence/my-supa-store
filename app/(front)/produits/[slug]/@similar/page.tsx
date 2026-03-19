import { getSimilarProducts } from "@/lib/queries";
import SimilarProducts from "@/app/components/SimilarProducts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SimilarSlot({ params }: PageProps) {
  const { slug } = await params;
  const { prisma } = await import("@/lib/prisma");
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return null;

  const similar = await getSimilarProducts(product.id);
  if (similar.length === 0) return null;
  return <SimilarProducts products={similar} />;
}
