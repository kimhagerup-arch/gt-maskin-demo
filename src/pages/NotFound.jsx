import Button from "../components/Button";
import { notFoundPage, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

/**
 * 404 som amerikansk veiskilt i neon: et grønt skilt på stolpe med «404» og
 * «Feil avkjøring» («Wrong turn») i neon, som flimrer én gang og står stille
 * ved prefers-reduced-motion (index.css, .road-sign). Lenker til forsiden,
 * butikken og kontakt. Skiltet er egen SVG, teksten er ekte tekst.
 */
export default function NotFound() {
  useSeoMeta(seo.notFound);
  const t = notFoundPage;

  return (
    <section className="section-pad flex min-h-[70vh] items-center bg-brand-primary text-brand-text-inverse">
      <div className="container-site grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-6">
          <p className="kicker text-brand-accent-light">{t.kicker}</p>
          <h1 className="h1-hero">{t.title}</h1>
          <p className="max-w-lg text-lg text-brand-muted-inverse">{t.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to={t.home.to} arrow>
              {t.home.label}
            </Button>
            <Button to={t.shop.to} variant="outlineDark">
              {t.shop.label}
            </Button>
            <Button to={t.contact.to} variant="outlineDark">
              {t.contact.label}
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
          <div className="road-sign relative w-full max-w-[420px]" aria-hidden="true">
            <svg
              viewBox="0 0 420 420"
              className="block h-auto w-full"
              aria-hidden="true"
              focusable="false"
            >
              {/* Stolpe */}
              <rect x="200" y="250" width="20" height="170" className="fill-chrome-dark" />
              <rect
                x="206"
                y="250"
                width="5"
                height="170"
                className="fill-chrome-light"
                opacity="0.5"
              />
              {/* Skiltet */}
              <rect
                x="30"
                y="60"
                width="360"
                height="200"
                rx="14"
                className="fill-brand-primary-light stroke-brand-outline"
                strokeWidth="2"
              />
              <rect
                x="40"
                y="70"
                width="340"
                height="180"
                rx="10"
                fill="none"
                className="road-sign-neon stroke-neon"
                strokeWidth="3"
              />
              {/* Festeskruer */}
              {[
                [52, 82],
                [368, 82],
                [52, 238],
                [368, 238],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-chrome" />
              ))}
              {/* Pil */}
              <path
                d="M300 150 l 40 0 m -14 -14 l 14 14 l -14 14"
                fill="none"
                className="road-sign-neon stroke-neon"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="70"
                y="150"
                className="road-sign-neon fill-neon font-display"
                fontSize="78"
                letterSpacing="4"
              >
                {t.kicker}
              </text>
              <text
                x="70"
                y="200"
                className="road-sign-neon fill-neon font-display"
                fontSize="30"
                letterSpacing="3"
              >
                {t.signTop.toUpperCase()} {t.signBottom.toUpperCase()}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
