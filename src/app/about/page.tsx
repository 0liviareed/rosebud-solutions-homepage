import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Rosebud Solutions",
  description:
    "The minds behind Rosebud Solutions. Two operators who built the system first, then packaged it for others.",
  alternates: { canonical: "/about" },
};

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26zM5.34 7.44a2.06 2.06 0 11.001-4.12 2.06 2.06 0 01-.001 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

export default function AboutPage() {
  return (
    <main className="rb-content">
      <section className="rb-sec" data-rb-sec aria-label="About">
        <div className="rb-topo rb-topo-6" aria-hidden="true">
          <svg viewBox="0 0 360 260" preserveAspectRatio="none">
            <path className="rb-bright" d="M 0 210 C 40 160, 90 90, 124 128 C 144 150, 156 114, 178 112 C 200 110, 218 146, 242 128 C 264 112, 296 160, 360 200" />
            <path d="M 0 224 C 42 176, 94 106, 128 140 C 146 158, 160 124, 180 122 C 204 120, 220 154, 246 138 C 268 124, 300 172, 360 214" />
            <path d="M 0 238 C 46 196, 98 124, 132 154 C 150 170, 164 134, 184 132 C 206 130, 222 162, 250 146 C 272 134, 304 184, 360 226" />
            <path className="rb-bright" d="M 0 250 C 50 214, 102 140, 136 168 C 154 182, 168 146, 188 144 C 208 142, 226 170, 254 154 C 278 142, 308 194, 360 236" />
            <path d="M 10 258 C 56 228, 108 156, 140 182 C 156 194, 172 158, 192 156 C 212 154, 230 178, 258 162 C 280 154, 310 202, 360 244" />
          </svg>
        </div>
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">About</p>
            <h1 className="rb-h2" data-rb-fade="1">
              The minds behind <em>Rosebud Solutions.</em>
            </h1>
            <p className="rb-sub" data-rb-fade="2">
              Two operators who built the system first, then packaged it for others.
            </p>
          </div>

          <div data-rb-fade="3">
            <article className="rb-founder" tabIndex={0}>
              <div className="rb-founder-image" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/695e6ab65c5d3e60230ce3cd_6F48C0E8-F97B-4C36-950F-4CEDF3C8FEFD.avif"
                  alt="Anselm Jr. Okojie"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rb-founder-info">
                <span className="rb-founder-role">Co-founder &amp; CEO</span>
                <h2 className="rb-founder-name">Anselm Jr. Okojie</h2>
                <p className="rb-founder-bio">
                  Systems operator and strategist. Builds the architecture
                  that turns businesses from founder-dependent to self-running.
                </p>
                <div className="rb-founder-links">
                  <a
                    href="https://www.linkedin.com/in/anselmjrokojie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rb-founder-link"
                    aria-label="Anselm on LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="mailto:jayokojie@rosebud.global"
                    className="rb-founder-link"
                    aria-label="Email Anselm"
                  >
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </article>

            <article className="rb-founder rb-founder-2" tabIndex={0}>
              <div className="rb-founder-image" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/695e6cd4f4ae02d41a03a510_D83AC58F-AD6A-4138-9A65-E046DDCFF322.avif"
                  alt="Sajni Okojie"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rb-founder-info">
                <span className="rb-founder-role">Co-founder &amp; COO</span>
                <h2 className="rb-founder-name">Sajni Okojie</h2>
                <p className="rb-founder-bio">
                  Three years at Ralph Lauren leading a £36m hospitality
                  portfolio before Rosebud. Owns delivery, client success,
                  and the client experience end-to-end.
                </p>
                <div className="rb-founder-links">
                  <a
                    href="https://www.linkedin.com/in/sajni-okojie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rb-founder-link"
                    aria-label="Sajni on LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="mailto:sajniokojie@rosebud.global"
                    className="rb-founder-link"
                    aria-label="Email Sajni"
                  >
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
