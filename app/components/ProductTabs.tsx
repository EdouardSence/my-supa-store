"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Tab = "description" | "specs";

type Props = {
  description: string;
  specs: Record<string, unknown>;
};

export default function ProductTabs({ description, specs }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: Tab = searchParams.get("tab") === "specs" ? "specs" : "description";

  function setTab(id: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-t pt-8" style={{ borderColor: "var(--border-color)" }}>
      <div className="flex border-b" style={{ borderColor: "var(--border-color)" }} role="tablist">
        {(
          [
            { id: "description", label: "Description" },
            { id: "specs", label: "Spécifications" },
          ] as { id: Tab; label: string }[]
        ).map(({ id, label }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              role="tab"
              aria-selected={active}
              className="relative mr-6 pb-3 font-mono text-[9px] tracking-[0.2em] uppercase transition-colors"
              style={{ color: active ? "var(--foreground)" : "var(--muted-fg)" }}
            >
              {label}
              {active && (
                <span
                  className="absolute inset-x-0 -bottom-px h-px"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-6" role="tabpanel">
        {tab === "description" ? (
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
            {description}
          </p>
        ) : (
          <dl>
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-baseline justify-between border-b py-2.5 last:border-0"
                style={{ borderColor: "var(--border-color)" }}
              >
                <dt
                  className="font-mono text-[10px] tracking-widest capitalize"
                  style={{ color: "var(--muted-fg)" }}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </dt>
                <dd className="text-sm font-medium">
                  {typeof value === "boolean" ? (value ? "Oui" : "Non") : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
