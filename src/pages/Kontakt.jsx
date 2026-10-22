import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ContactCard from "../components/ContactCard";
import PageHero from "../components/PageHero";
import { findCar } from "../data/cars";
import { getProduct } from "../data/products";
import { contactPage, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Kontakt() {
  useSeoMeta(seo.kontakt);
  const [params] = useSearchParams();

  // ?vare= er en vare-slug eller fritekst (deltype, søk), ?bil= en bil til salgs
  // (slug) eller bilen fra butikken som tekst («Chevrolet Camaro 1969»).
  const lines = [];
  const vare = params.get("vare");
  const bil = params.get("bil");
  if (vare) {
    const product = getProduct(vare);
    const brand =
      product?.brand && !product.brand.startsWith("[") && product.brand !== product.title
        ? ` (${product.brand})`
        : "";
    lines.push(
      `${contactPage.productRequestPrefix} ${product ? `${product.title}${brand}` : vare}`,
    );
  }
  if (bil) {
    const car = findCar(bil);
    lines.push(
      car
        ? `${contactPage.carRequestPrefix} ${car.title} ${car.year}`
        : `${contactPage.vehiclePrefix} ${bil}`,
    );
  }
  const initialMessage = lines.length ? `${lines.join("\n")}\n\n` : "";

  return (
    <>
      <PageHero
        kicker={contactPage.kicker}
        title={contactPage.title}
        lead={contactPage.lead}
        image={contactPage.heroImage}
        imageAlt={contactPage.heroAlt}
        imagePosition="50% 40%"
        compact
      />
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-6">
          <ContactCard className="lg:col-span-5" showChannels />
          <BookingForm
            variant="contact"
            id="kontaktskjema"
            title={contactPage.formTitle}
            lead={contactPage.formLead}
            initialMessage={initialMessage}
            className="lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>
    </>
  );
}
