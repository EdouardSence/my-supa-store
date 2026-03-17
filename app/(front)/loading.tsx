export default function FrontLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Header skeleton — matches editorial page header */}
      <div className="border-b py-14 lg:py-20" style={{ borderColor: "var(--border-color)" }}>
        <div className="h-2 w-16 animate-pulse rounded-none mb-4" style={{ background: "var(--accent)", opacity: 0.4 }} />
        <div className="h-12 w-56 animate-pulse" style={{ background: "var(--card-bg)" }} />
      </div>

      {/* Grid skeleton — portrait 4:5 cards */}
      <ul className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <li
            key={i}
            className="overflow-hidden"
            style={{
              border: "1px solid var(--border-color)",
              animationDelay: `${i * 40}ms`,
            }}
          >
            {/* Portrait image placeholder */}
            <div
              className="animate-pulse"
              style={{ aspectRatio: "4/5", background: "var(--card-bg)" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
