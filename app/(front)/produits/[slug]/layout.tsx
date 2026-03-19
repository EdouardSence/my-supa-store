import { Suspense } from "react";
import SimilarProductsSkeleton from "@/app/components/SimilarProductsSkeleton";
import SponsoredProductsSkeleton from "@/app/components/SponsoredProductsSkeleton";

type LayoutProps = {
  children: React.ReactNode;
  sponsored: React.ReactNode;
  similar: React.ReactNode;
};

export default function ProductDetailLayout({ children, sponsored, similar }: LayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        {similar}
      </Suspense>
      <Suspense fallback={<SponsoredProductsSkeleton />}>
        {sponsored}
      </Suspense>
    </>
  );
}
