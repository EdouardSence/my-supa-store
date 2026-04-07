"use client";

import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AbGroup = "A" | "B";

type PrefetchLinkProps = {
  href: string;
  abGroup: AbGroup;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function PrefetchLink({ href, abGroup, className, style, children }: PrefetchLinkProps) {
  const router = useRouter();
  const prefetchedRef = useRef(false);

  const prefetchOnDemand = useCallback(() => {
    if (abGroup !== "B" || prefetchedRef.current) return;
    prefetchedRef.current = true;
    router.prefetch(href);
  }, [abGroup, href, router]);

  return (
    <Link
      href={href}
      prefetch={abGroup === "B" ? false : undefined}
      onMouseEnter={prefetchOnDemand}
      onFocus={prefetchOnDemand}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
