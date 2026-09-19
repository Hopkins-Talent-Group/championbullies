import { TRUST_TAGLINE } from "@/lib/content";

/**
 * The three claims the old WordPress header and footer both repeated. Kept as
 * a thin band so it works as a divider between the hero and the promo below
 * without competing with either of them.
 */
export function TrustStrip() {
  return (
    <section
      id="trust"
      aria-label="What every ChampionBullies puppy is"
      style={{
        borderTop: "1px solid var(--line-soft)",
        borderBottom: "1px solid var(--line-soft)",
        padding: "21px var(--pad)",
      }}
    >
      <ul
        className="mx-auto flex flex-wrap items-center justify-center"
        style={{
          maxWidth: "var(--max-w)",
          margin: 0,
          padding: 0,
          listStyle: "none",
          columnGap: "clamp(34px, 6vw, 89px)",
          rowGap: 13,
        }}
      >
        {TRUST_TAGLINE.map((claim) => (
          <li key={claim} className="caption flex items-center gap-[13px]">
            <span
              aria-hidden="true"
              style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }}
            />
            {claim}
          </li>
        ))}
      </ul>
    </section>
  );
}
