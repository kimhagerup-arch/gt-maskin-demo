import { privacyPage, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Personvern() {
  useSeoMeta(seo.personvern);

  return (
    <section className="section-pad bg-brand-bg text-brand-text">
      <div className="container-site flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="kicker text-brand-accent-deep">{privacyPage.kicker}</p>
          <h1 className="h1-page">{privacyPage.title}</h1>
          <p className="text-sm text-brand-muted">{privacyPage.updated}</p>
        </div>
        <div className="flex flex-col gap-6">
          {privacyPage.sections.map((s) => (
            <section key={s.title} className="flex flex-col gap-2">
              <h2 className="text-lg font-bold md:text-[22px]">{s.title}</h2>
              <p className="leading-relaxed text-brand-muted">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
