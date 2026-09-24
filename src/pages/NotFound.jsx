import Button from "../components/Button";
import { notFoundPage, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function NotFound() {
  useSeoMeta(seo.notFound);

  return (
    <section className="section-pad flex min-h-[60vh] items-center bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-6">
        <p className="kicker text-brand-accent-light">{notFoundPage.kicker}</p>
        <h1 className="h1-hero">{notFoundPage.title}</h1>
        <p className="max-w-lg text-lg text-brand-muted-inverse">{notFoundPage.text}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={notFoundPage.home.to} arrow>
            {notFoundPage.home.label}
          </Button>
          <Button to={notFoundPage.contact.to} variant="outlineDark">
            {notFoundPage.contact.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
