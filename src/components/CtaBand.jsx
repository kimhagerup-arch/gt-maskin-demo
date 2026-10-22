import { companyFacts } from "../data/companyFacts";
import { a11y } from "../data/siteContent";
import { cx } from "../lib/format";
import Button from "./Button";

/** Bånd med tittel, tekst og knapp. Brukes nederst på undersider. */
export default function CtaBand({ kicker, title, text, cta, tone = "light", showContact = true }) {
  const dark = tone === "dark";
  return (
    <section className={cx("section-pad", dark ? "bg-brand-primary" : "bg-brand-bg")}>
      <div className="container-site">
        <div
          className={cx(
            "cta-texture flex flex-col gap-6 border p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-12",
            dark
              ? "border-brand-border-dark bg-brand-primary-light"
              : "border-brand-border bg-brand-card",
          )}
        >
          <div className="flex flex-col gap-3">
            {kicker && (
              <p
                className={cx(
                  "kicker",
                  dark ? "text-brand-accent-light" : "text-brand-accent-deep",
                )}
              >
                {kicker}
              </p>
            )}
            <h2
              className={cx(
                "font-display text-4xl tracking-wide md:text-5xl",
                dark ? "text-brand-text-inverse" : "text-brand-text",
              )}
            >
              {title}
            </h2>
            {text && (
              <p className={cx("max-w-xl", dark ? "text-brand-muted-inverse" : "text-brand-muted")}>
                {text}
              </p>
            )}
            {showContact && (
              <p className={cx("text-sm", dark ? "text-brand-muted-inverse" : "text-brand-muted")}>
                {a11y.callPrefix}{" "}
                <a
                  href={companyFacts.phone.href}
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  {companyFacts.phone.display}
                </a>
                , {a11y.emailPrefix}{" "}
                <a
                  href={companyFacts.email.href}
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  {companyFacts.email.display}
                </a>
                .
              </p>
            )}
          </div>
          {cta && (
            <Button
              to={cta.to}
              href={cta.href}
              external={Boolean(cta.href)}
              arrow
              className="shrink-0"
            >
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
