import { CONTACT, SOCIAL_LINKS } from "@/lib/site";

/**
 * The utility bar from the top of the WordPress page: contact details on the
 * left, social icons on the right, on the brand red fading to black.
 *
 * Every value below is the one post-15.css in the live site actually applies —
 * `linear-gradient(130deg, #D80027 0%, #000000 100%)`, 10px of vertical
 * padding, white text and icons, and hidden below 768px. #D80027 is already
 * this project's --accent, so the gradient references the token rather than
 * repeating the hex.
 *
 * Two deliberate departures from the WordPress version:
 *   1. Type and icon sizes follow this design system (13px text, matching
 *      Footer.tsx) instead of the live bar's 16px, so the bar stays
 *      subordinate to body copy.
 *   2. The social icons only become links once they have somewhere to go —
 *      see SOCIAL_LINKS in lib/site.ts.
 */

const CONTACT_ICONS = {
  location: {
    viewBox: "0 0 384 512",
    d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
  },
  email: {
    viewBox: "0 0 512 512",
    d: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z",
  },
  phone: {
    viewBox: "0 0 512 512",
    d: "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z",
  },
} as const;

const SOCIAL_ICONS = {
  facebook: {
    viewBox: "0 0 512 512",
    d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
  },
  twitter: {
    viewBox: "0 0 512 512",
    d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
  },
  instagram: {
    viewBox: "0 0 448 512",
    d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
} as const;

export function TopBar() {
  return (
    <div
      className="hidden md:block"
      style={{
        background: "linear-gradient(130deg, var(--accent) 0%, #000000 100%)",
        color: "#fff",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "var(--max-w)",
          padding: "10px var(--pad)",
          fontSize: 13,
          lineHeight: 1.4,
        }}
      >
        <ul
          aria-label="Contact details"
          className="flex items-center"
          style={{ gap: 35, margin: 0, padding: 0, listStyle: "none" }}
        >
          <li>
            <span
              className="inline-flex items-center"
              style={{ gap: 8 }}
            >
              <svg
                aria-hidden="true"
                viewBox={CONTACT_ICONS.location.viewBox}
                style={{ width: 13, height: 13, fill: "currentColor", flexShrink: 0 }}
              >
                <path d={CONTACT_ICONS.location.d} />
              </svg>
              {CONTACT.location}
            </span>
          </li>
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center transition-opacity hover:opacity-75"
              style={{ gap: 8, color: "inherit", textDecoration: "none" }}
            >
              <svg
                aria-hidden="true"
                viewBox={CONTACT_ICONS.email.viewBox}
                style={{ width: 14, height: 14, fill: "currentColor", flexShrink: 0 }}
              >
                <path d={CONTACT_ICONS.email.d} />
              </svg>
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center transition-opacity hover:opacity-75"
              style={{ gap: 8, color: "inherit", textDecoration: "none" }}
            >
              <svg
                aria-hidden="true"
                viewBox={CONTACT_ICONS.phone.viewBox}
                style={{ width: 13, height: 13, fill: "currentColor", flexShrink: 0 }}
              >
                <path d={CONTACT_ICONS.phone.d} />
              </svg>
              {CONTACT.phoneLabel}
            </a>
          </li>
        </ul>

        <ul
          aria-label="Social media"
          className="flex items-center"
          style={{ gap: 15, margin: 0, padding: 0, listStyle: "none" }}
        >
          {SOCIAL_LINKS.map((social) => {
            const icon = SOCIAL_ICONS[social.key];
            const svg = (
              <svg
                aria-hidden="true"
                viewBox={icon.viewBox}
                style={{ width: 15, height: 15, fill: "currentColor", display: "block" }}
              >
                <path d={icon.d} />
              </svg>
            );
            return (
              <li key={social.key} style={{ display: "flex" }}>
                {social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="transition-opacity hover:opacity-75"
                    style={{ color: "inherit", display: "inline-flex" }}
                  >
                    {svg}
                  </a>
                ) : (
                  <span
                    title={social.label}
                    aria-label={`${social.label} (link coming soon)`}
                    style={{ display: "inline-flex", opacity: 0.9 }}
                  >
                    {svg}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
