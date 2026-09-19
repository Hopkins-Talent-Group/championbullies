import { ANNOUNCEMENT } from "@/lib/content";

/**
 * The special offer the WordPress homepage carried between its hero and its
 * "What Makes Us Different" section. Rendered as a light band rather than a
 * dark one so the accent colour keeps its contrast on paper — the same
 * constraint globals.css documents for --line-strong.
 */
export function Announcement() {
  return (
    <section
      id="announcement"
      aria-labelledby="announcement-heading"
      style={{
        background: "var(--line-soft)",
        borderBottom: "1px solid var(--line)",
        padding: "clamp(34px, 5vh, 55px) var(--pad)",
      }}
    >
      <div
        className="mx-auto grid items-center gap-x-[55px] gap-y-[34px] lg:grid-cols-[1.618fr_1fr]"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 34 }}>
          <p className="caption">{ANNOUNCEMENT.eyebrow}</p>
          <h2
            id="announcement-heading"
            className="display"
            style={{ fontSize: "clamp(21px, 2.6vw, 26px)", marginTop: 13, maxWidth: "44ch" }}
          >
            {ANNOUNCEMENT.headline}
          </h2>
          <p className="body-lg" style={{ marginTop: 13 }}>
            {ANNOUNCEMENT.body}
          </p>
        </div>

        <a
          href={ANNOUNCEMENT.ctaHref}
          className="inline-flex items-center justify-center transition-opacity hover:opacity-85 lg:justify-self-end"
          style={{
            background: "var(--ink)",
            color: "#ffffff",
            padding: "13px 34px",
            borderRadius: "var(--r-pill)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
          }}
        >
          {ANNOUNCEMENT.ctaLabel}
        </a>
      </div>
    </section>
  );
}
