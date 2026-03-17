export default function FrontLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header skeleton */}
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-foreground/10" />
        <div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />
      </div>

      {/* Grid skeleton */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-xl border border-foreground/10"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="aspect-square animate-pulse bg-foreground/10" />
            <div className="flex flex-col gap-2 p-4">
              <div className="h-3 w-1/2 animate-pulse rounded bg-foreground/10" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-foreground/10" />
              <div className="mt-2 h-5 w-1/3 animate-pulse rounded bg-foreground/10" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
