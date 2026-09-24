import { Link } from "react-router-dom";
import { services } from "../data/services";
import { servicesSection } from "../data/siteContent";
import Icon from "./Icon";
import Picture from "./Picture";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function ServiceCards({ id = "tjenester" }) {
  return (
    <section
      id={id}
      className="section-pad border-t border-brand-border bg-brand-bg text-brand-text"
    >
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <SectionHeader
          tone="light"
          kicker={servicesSection.kicker}
          title={servicesSection.title}
          lead={servicesSection.lead}
        />
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 60}>
              <Link
                to={service.to}
                className="group flex h-full flex-col border border-brand-border bg-brand-card transition-colors hover:border-brand-accent focus-visible:border-brand-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Picture
                    src={service.image}
                    alt={service.imageAlt}
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    tone="light"
                  />
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary md:left-8">
                    <Icon name={service.icon} size={24} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-10 md:px-8 md:pb-8">
                  <h3 className="text-lg font-bold md:text-[22px]">{service.title}</h3>
                  <p className="text-base leading-relaxed text-brand-muted">{service.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-brand-accent-deep">
                    {servicesSection.readMore}
                    <Icon
                      name="ArrowRight"
                      size={16}
                      strokeWidth={2.2}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
