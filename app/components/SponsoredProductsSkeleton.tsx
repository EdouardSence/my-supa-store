export default function SponsoredProductsSkeleton() {
  return (
    <section className="mt-20 border-t pt-16" style={{ borderColor: "var(--border-color)" }}>
      <div className="mb-10">
        <div
          className="h-3 w-20 mb-2 animate-pulse"
          style={{ background: "var(--border-color)" }}
        />
        <div
          className="h-8 w-64 animate-pulse"
          style={{ background: "var(--border-color)" }}
        />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>
            <div
              className="aspect-[3/4] animate-pulse"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
