import { Link } from "react-router-dom";
import { companyFacts } from "../data/companyFacts";
import { footer } from "../data/siteContent";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import ReviewBadges from "./ReviewBadges";

const LOGO_KEY = "/images/logo/gt-maskin-logo";

function FooterLink({ link }) {
  const classes =
    "text-sm text-brand-muted-inverse transition-colors hover:text-brand-text-inverse";
  if (link.href) {
    return (
      <a href={link.href} className={classes} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.to} className={classes}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  const logo = getImage(LOGO_KEY);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border-dark bg-brand-primary-dark text-brand-muted-inverse">
      <div className="container-site flex flex-col gap-10 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Firma */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <div className="flex items-center gap-3 text-brand-text-inverse">
              <span className="flex h-14 w-14 items-center justify-center border border-brand-border-dark bg-brand-primary-light p-1.5">
                {logo ? (
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${LOGO_KEY}-128.webp 1x, ${LOGO_KEY}-256.webp 2x`}
                    />
                    <img
                      src={`${LOGO_KEY}-128.png`}
                      srcSet={`${LOGO_KEY}-128.png 1x, ${LOGO_KEY}-256.png 2x`}
                      width={logo.sizes[0].w}
                      height={logo.sizes[0].h}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                ) : (
                  <span className="font-display text-2xl text-brand-accent-light">GT</span>
                )}
              </span>
              <span className="font-display text-[26px] tracking-[0.08em]">
                {companyFacts.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              {companyFacts.descriptor} · {companyFacts.address.full}
              <br />
              {footer.orgPrefix} {companyFacts.orgNr} · {footer.phonePrefix}{" "}
              <a href={companyFacts.phone.href} className="hover:text-brand-text-inverse">
                {companyFacts.phone.display}
              </a>{" "}
              ·{" "}
              <a href={companyFacts.email.href} className="hover:text-brand-text-inverse">
                {companyFacts.email.display}
              </a>
              <br />
              {companyFacts.hours.weekdays}
            </p>
            <a
              href={companyFacts.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-inverse transition-colors hover:text-brand-accent-light"
            >
              <Icon name="Facebook" size={18} strokeWidth={2} />
              facebook.com/GtMaskinas
            </a>
            <ReviewBadges className="mt-2" />
          </div>

          {/* Lenkekolonner */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5">
            {footer.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-inverse">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <FooterLink key={link.label} link={link} />
                ))}
              </div>
            ))}
          </div>

          {/* Snapchat */}
          <div className="flex items-center gap-4 md:col-span-2 md:flex-col md:items-start">
            <div className="h-20 w-20 shrink-0 overflow-hidden bg-brand-bg p-1">
              <Picture
                src={footer.snapchatImage}
                alt={footer.snapchatAlt}
                sizes="80px"
                imgClassName="h-full w-full object-contain"
                fallbackLabel="[QR]"
                tone="light"
              />
            </div>
            <p className="text-sm font-semibold text-brand-text-inverse">{footer.snapchat}</p>
          </div>
        </div>

        {/* Bunnlinje */}
        <div className="flex flex-col gap-3 border-t border-brand-border-dark pt-6 text-[13px] text-brand-footer md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {companyFacts.name}. {footer.copyright}
          </p>
          <p className="flex items-center gap-3">
            <Link
              to={footer.privacy.to}
              className="transition-colors hover:text-brand-text-inverse"
            >
              {footer.privacy.label}
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href={companyFacts.links.kovision}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              <span className="text-brand-muted-inverse transition-colors">
                {footer.credit.prefix} {footer.credit.name}
              </span>
              <span
                className="bg-clip-text-webkit pointer-events-none absolute inset-0 bg-gradient-to-r from-kovision-cyan to-kovision-gold text-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                {footer.credit.prefix} {footer.credit.name}
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
