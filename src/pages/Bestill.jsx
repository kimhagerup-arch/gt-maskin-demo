import BookingForm from "../components/BookingForm";
import ContactCard from "../components/ContactCard";
import { bookingForm, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Bestill() {
  useSeoMeta(seo.bestill);
  const t = bookingForm.page;

  return (
    <section className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="kicker text-brand-accent-light">{t.kicker}</p>
          <h1 className="h1-page">{t.title}</h1>
          <p className="max-w-xl text-lg text-brand-muted-inverse md:text-xl">{t.lead}</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <BookingForm
            className="lg:col-span-7"
            title={bookingForm.title}
            lead={bookingForm.lead}
          />
          <ContactCard className="lg:col-span-4 lg:col-start-9" />
        </div>
      </div>
    </section>
  );
}
