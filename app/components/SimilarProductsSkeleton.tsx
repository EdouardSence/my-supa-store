export default function SimilarProductsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div className="h-2 w-24 animate-pulse rounded mb-2" style={{ background: "var(--accent)", opacity: 0.4 }} />
        <div className="h-6 w-48 animate-pulse" style={{ background: "var(--card-bg)" }} />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <li
            key={i}
            className="overflow-hidden"
            style={{
              border: "1px solid var(--border-color)",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="animate-pulse"
              style={{ aspectRatio: "4/5", background: "var(--card-bg)" }}
            />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.2 }} />
              <div className="h-5 w-full animate-pulse rounded" style={{ background: "var(--muted-fg)", opacity: 0.3 }} />
              <div className="h-4 w-20 animate-pulse rounded" style={{ background: "var(--accent)", opacity: 0.2 }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
