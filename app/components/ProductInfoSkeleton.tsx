export default function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col gap-8 pt-0 lg:pl-12 lg:pt-0">
      <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
        <div className="mb-8 h-px w-12 animate-pulse" style={{ background: "var(--accent)", opacity: 0.4 }} />
        <div className="h-3 w-20 animate-pulse rounded mb-4" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
        <div className="h-10 w-3/4 animate-pulse rounded" style={{ background: "var(--card-bg)" }} />
        <div className="h-3 w-24 animate-pulse rounded mt-4" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
      </div>

      <div className="flex items-baseline justify-between border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
        <div className="h-12 w-32 animate-pulse rounded" style={{ background: "var(--card-bg)" }} />
        <div className="h-6 w-24 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
      </div>

      <div className="h-12 animate-pulse rounded-xl" style={{ background: "var(--card-bg)" }} />

      <div className="border-t pt-8" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex gap-6 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
          <div className="h-4 w-24 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
          <div className="h-4 w-28 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
        </div>
        <div className="pt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.15 }} />
          <div className="h-4 w-5/6 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.15 }} />
          <div className="h-4 w-4/6 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.15 }} />
        </div>
      </div>
    </div>
  );
}
