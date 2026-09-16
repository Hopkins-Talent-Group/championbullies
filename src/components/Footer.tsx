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
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: "32ch",
              }}
            >
              AKC registered English &amp; French bulldogs from champion bloodlines —
              home-raised in Florida.
            </p>
          </div>

          <nav aria-label="Footer — puppies">
            <h4 className="caption" style={{ margin: "0 0 14px" }}>
              Puppies
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 9,
              }}
            >
              <li>
                <a href="#gallery" className="transition-opacity hover:opacity-60" style={linkStyle}>
                  Available Puppies
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-opacity hover:opacity-60" style={linkStyle}>
                  English Bulldogs
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-opacity hover:opacity-60" style={linkStyle}>
                  French Bulldogs
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-opacity hover:opacity-60" style={linkStyle}>
                  Reserve a Puppy
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer — contact">
            <h4 className="caption" style={{ margin: "0 0 14px" }}>
              Contact
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 9,
              }}
            >
              <li>
                <a href="tel:+13212761159" className="transition-opacity hover:opacity-60" style={linkStyle}>
                  (321) 276-1159
                </a>
              </li>
              <li>
                <a
                  href="mailto:championbullies@aol.com"
                  className="transition-opacity hover:opacity-60"
                  style={linkStyle}
                >
                  championbullies@aol.com
                </a>
              </li>
              <li>
                <span style={linkStyle}>Florida, USA</span>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="caption flex flex-wrap items-center justify-between gap-4"
          style={{ marginTop: 44, paddingTop: 18, borderTop: "1px solid var(--line-soft)" }}
        >
          <span>© {new Date().getFullYear()} ChampionBullies — All rights reserved.</span>
          <span>Raised with care in Florida</span>
        </div>
      </div>
    </footer>
  );
}
