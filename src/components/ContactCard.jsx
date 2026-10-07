import { companyFacts } from "../data/companyFacts";
import { contactPage } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import SocialLinks from "./SocialLinks";

function Row({ icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand-border-dark bg-brand-primary-light text-brand-accent-light">
        <Icon name={icon} size={22} strokeWidth={1.8} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-brand-muted-inverse">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

/**
 * Adressekort med åpningstider, telefon, e-post og bilde av fasaden.
 * Kart som lenke til Google Maps, aldri embed. Med `showChannels` vises
 * Messenger, Facebook og Snapchat rett under telefon og e-post, slik at
 * «Ring», «E-post» og «Messenger» står samlet som de tre raske veiene inn.
 * QR vises på desktop, på mobil vises lenken «Åpne i Snapchat» i stedet.
 */
export default function ContactCard({ showImage = true, showChannels = false, className }) {
  return (
    <div className={cx("flex flex-col gap-6", className)}>
      <Row icon="MapPin" label={contactPage.addressLabel}>
        <span className="text-lg font-semibold">{companyFacts.address.full}</span>
        <span className="text-[15px] text-brand-muted-inverse">{companyFacts.address.area}</span>
      </Row>
      <Row icon="Clock" label={contactPage.hoursLabel}>
        <span className="text-lg font-semibold">{companyFacts.hours.weekdays}</span>
        <span className="text-[15px] text-brand-muted-inverse">{companyFacts.hours.weekend}</span>
      </Row>
      <Row icon="Phone" label={contactPage.phoneLabel}>
        <a
          href={companyFacts.phone.href}
          className="text-lg font-semibold hover:text-brand-accent-light"
        >
          {companyFacts.phone.display}
        </a>
      </Row>
      <Row icon="Mail" label={contactPage.emailLabel}>
        <a
          href={companyFacts.email.href}
          className="break-all text-lg font-semibold hover:text-brand-accent-light"
        >
          {companyFacts.email.display}
        </a>
      </Row>

      {showChannels && (
        <Row icon="MessageCircle" label={contactPage.channelsLabel}>
          <SocialLinks tone="dark" qr="desktop" className="mt-2" />
        </Row>
      )}

      {showImage && (
        <a
          href={companyFacts.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[16/9] overflow-hidden border border-brand-border-dark"
        >
          <Picture
            src={contactPage.heroImage}
            alt={contactPage.heroAlt}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-brand-primary/95 to-transparent px-5 pb-4 pt-10">
            <span className="text-sm font-semibold text-brand-text-inverse">
              {companyFacts.address.full}
            </span>
            <span className="inline-flex h-10 items-center gap-2 bg-brand-accent px-3.5 text-[13px] font-bold text-brand-primary">
              {contactPage.mapsCta}
              <Icon name="ExternalLink" size={15} strokeWidth={2.2} />
            </span>
          </span>
        </a>
      )}
    </div>
  );
}
