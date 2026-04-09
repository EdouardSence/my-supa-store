"use client";

export default function EnvClientTest() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const secretToken = process.env.MY_SECRET_TOKEN;

  return (
    <section
      className="mx-auto mt-10 max-w-7xl border px-4 py-5"
      style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}
    >
      <h2 className="mb-3 font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
        Test variables d&apos;environnement (Client)
      </h2>

      <div className="grid gap-3 text-sm">
        <p>
          <strong>NEXT_PUBLIC_SITE_NAME:</strong>{" "}
          <span>{siteName ?? "undefined"}</span>
        </p>

        <p>
          <strong>MY_SECRET_TOKEN:</strong>{" "}
          <span>{secretToken ?? "undefined"}</span>
        </p>
      </div>
    </section>
  );
}
