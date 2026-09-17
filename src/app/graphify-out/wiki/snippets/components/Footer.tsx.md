export function Footer() {
  const linkStyle = { fontSize: 13, color: "var(--body)" };

  return (
    <footer
      id="footer"
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--line-soft)",
        padding: "clamp(44px,7vh,88px) var(--pad) 28px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div className="grid grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-9 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <p style={{ fontFamily: "var(--font-slab)", fontWeight: 600, fontSize: 17, margin: 0 }}>
              ChampionBullies<span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p
              style={{
                marginTop: 12,
                fontSize: 13,
------ snippet (first lines) ------