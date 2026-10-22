import { useEffect } from "react";
import { companyFacts } from "../data/companyFacts";
import { structuredData } from "../data/siteContent";
import { useLocale } from "../i18n/LocaleContext";
import { withLocale } from "../i18n/locale";
import { CLOSES_MINUTES, OPENS_MINUTES } from "../lib/openingHours";

const ID = "gtm-jsonld";

function hhmm(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/**
 * JSON-LD for verkstedet (AutoRepair) og butikken (AutoPartsStore) på begge
 * språk: navn, adresse, telefon, e-post, åpningstider og lenker fra FAKTA
 * (companyFacts). Ingen anmeldelsestall. Legges i <head> ved rutebytte og
 * språkbytte. Indeksering er fortsatt av (noindex); dette er klart til go-live.
 */
export default function StructuredData() {
  const { locale } = useLocale();

  useEffect(() => {
    const origin = window.location.origin;
    const url = (path) => `${origin}${withLocale(path, locale)}`;
    const address = {
      "@type": "PostalAddress",
      streetAddress: companyFacts.address.street,
      postalCode: companyFacts.address.postalCode,
      addressLocality: companyFacts.address.city,
      addressCountry: "NO",
    };
    const hours = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: hhmm(OPENS_MINUTES),
      closes: hhmm(CLOSES_MINUTES),
    };
    const shared = {
      telephone: companyFacts.phone.display.replace(/\s/g, ""),
      email: companyFacts.email.display,
      address,
      openingHoursSpecification: [hours],
      sameAs: [companyFacts.links.facebook, companyFacts.links.website],
      inLanguage: locale === "en" ? "en" : "nb",
    };
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutoRepair",
          "@id": `${origin}/#verksted`,
          name: structuredData.workshopName,
          description: structuredData.workshopDescription,
          url: url("/verksted"),
          image: `${origin}/og-image.jpg`,
          ...shared,
        },
        {
          "@type": "AutoPartsStore",
          "@id": `${origin}/#butikk`,
          name: structuredData.storeName,
          description: structuredData.storeDescription,
          url: url("/deler"),
          image: `${origin}/og-image.jpg`,
          ...shared,
        },
      ],
    };
    let el = document.getElementById(ID);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, [locale]);

  return null;
}
