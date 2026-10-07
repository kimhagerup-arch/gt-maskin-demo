import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ContactCard from "../components/ContactCard";
import PageHero from "../components/PageHero";
import { findCar } from "../data/cars";
import { products } from "../data/products";
import { contactPage, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Kontakt() {
  useSeoMeta(seo.kontakt);
  const [params] = useSearchParams();

  let initialMessage = "";
  const vare = params.get("vare");
  const bil = params.get("bil");
  if (vare) {
    const product = products.find((p) => p.slug === vare);
    initialMessage = `${contactPage.productRequestPrefix} ${product ? `${product.title} (${product.brand})` : vare}\n\n`;
  } else if (bil) {
    const car = findCar(bil);
    initialMessage = `${contactPage.carRequestPrefix} ${car ? `${car.title} ${car.year}` : bil}\n\n`;
  }

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
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
          <ContactCard className="lg:col-span-5" showSnapchat />
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
