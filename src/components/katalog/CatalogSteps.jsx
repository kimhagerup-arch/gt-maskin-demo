import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { categories, partCategories } from "../../data/catalog";
import { partsSection } from "../../data/siteContent";
import { decadesFor, lastYear, otherVehicle, vehicles } from "../../data/vehicles";
import { Link } from "../../i18n/LocaleLink";
import { OIL_CATEGORY, categoryPath, vehicleLabel, vehiclePath } from "../../lib/catalog";
import { cx } from "../../lib/format";
import Icon from "../Icon";
import BrandLogoButtons from "./BrandLogoButtons";
import Breadcrumbs from "./Breadcrumbs";
import { requestLink } from "./SourceRequest";

/** Stor trykkflate i den trinnvise listen på mobil. */
function StepLink({ to, children, meta, count, dim, icon }) {
  return (
    <li>
      <Link
        to={to}
        className={cx(
          "flex min-h-[52px] items-center gap-3 border-b border-brand-border bg-brand-card px-3 py-2 text-[15px] font-semibold transition-colors active:bg-brand-surface",
          dim ? "text-brand-muted" : "text-brand-text",
        )}
      >
        {icon && (
          <Icon name={icon} size={20} strokeWidth={2} className="shrink-0 text-brand-muted" />
        )}
        <span className="min-w-0 flex-1" translate="no">
          {children}
          {meta && <span className="ml-2 text-xs font-medium text-brand-muted">{meta}</span>}
        </span>
        {count !== undefined && (
          <span className="shrink-0 text-xs font-semibold tabular-nums text-brand-muted">
            {count}
          </span>
        )}
        <Icon
          name="ChevronRight"
          size={18}
          strokeWidth={2.2}
          className="shrink-0 text-brand-muted"
        />
      </Link>
    </li>
  );
}

function StepHeading({ children, headingRef, sub }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-lg font-bold outline-none focus-visible:underline md:text-[22px]"
      >
        {children}
      </h2>
      {sub && <p className="text-sm text-brand-muted">{sub}</p>}
    </div>
  );
}

function CategorySteps({ list, counts, pathFor }) {
  return (
    <ul className="border-t border-brand-border">
      {list.map((category) => {
        const n = counts.category(category);
        return (
          <StepLink
            key={category.slug}
            to={pathFor({ category })}
            count={n}
            dim={n === 0}
            icon={category.icon}
          >
            {category.name}
          </StepLink>
        );
      })}
    </ul>
  );
}

/**
 * Katalogen på mobil: ett nivå om gangen med store trykkflater, brødsmuler og
 * tilbake øverst. Fokus flyttes til overskriften når nivået skifter.
 */
export default function CatalogSteps({ mode, sel, counts, crumbs, backTo, myCar }) {
  const c = partsSection.catalog;
  const location = useLocation();
  const headingRef = useRef(null);
  const firstPath = useRef(location.pathname);

  // Flytt fokus til overskriften på nytt nivå, men ikke ved første visning av siden.
  useEffect(() => {
    if (location.pathname === firstPath.current) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  const top = (
    <div className="flex flex-col gap-2">
      {backTo && (
        <Link
          to={backTo}
          className="inline-flex h-10 items-center gap-1 self-start text-sm font-bold text-brand-muted hover:text-brand-text"
        >
          <Icon name="ChevronLeft" size={18} strokeWidth={2.2} />
          {c.back}
        </Link>
      )}
      <Breadcrumbs crumbs={crumbs} />
    </div>
  );

  let body = null;

  if (mode === "kategori") {
    if (!sel.category) {
      body = (
        <>
          <StepHeading headingRef={headingRef}>{c.chooseCategory}</StepHeading>
          <CategorySteps list={categories} counts={counts} pathFor={categoryPath} />
        </>
      );
    } else if (!sel.type) {
      body = (
        <>
          <StepHeading headingRef={headingRef}>{sel.category.name}</StepHeading>
          <ul className="border-t border-brand-border">
            {sel.category.types.map((type) => {
              const n = counts.type(sel.category, type);
              return (
                <StepLink
                  key={type.slug}
                  to={categoryPath({ category: sel.category, type })}
                  count={n}
                  dim={n === 0}
                >
                  {type.name}
                </StepLink>
              );
            })}
          </ul>
        </>
      );
    } else {
      body = <StepHeading headingRef={headingRef}>{sel.type.name}</StepHeading>;
    }
  } else if (!sel.brand) {
    const sorted = [...vehicles].sort((a, b) => a.name.localeCompare(b.name, "nb"));
    body = (
      <>
        <StepHeading headingRef={headingRef} sub={myCar ? null : c.myCar.hint}>
          {c.chooseBrand}
        </StepHeading>
        <BrandLogoButtons items={vehicles.filter((b) => b.logo)} activeSlug={null} />
        <p className="pt-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
          {c.allBrands}
        </p>
        <ul className="border-t border-brand-border">
          {sorted.map((brand) => (
            <StepLink key={brand.slug} to={vehiclePath({ brand })}>
              {brand.name}
            </StepLink>
          ))}
          <StepLink to={requestLink({})} icon="CircleHelp" dim>
            {otherVehicle.name}
          </StepLink>
        </ul>
      </>
    );
  } else if (!sel.model) {
    body = (
      <>
        <StepHeading headingRef={headingRef} sub={sel.brand.name}>
          {c.chooseModel}
        </StepHeading>
        <ul className="border-t border-brand-border">
          {sel.brand.models.map((model) => (
            <StepLink
              key={model.slug}
              to={vehiclePath({ brand: sel.brand, model })}
              meta={`${model.from}-${lastYear(model)}`}
            >
              {model.name}
            </StepLink>
          ))}
          <StepLink to={requestLink({ vehicle: sel.brand.name })} icon="CircleHelp" dim>
            {otherVehicle.name}
          </StepLink>
        </ul>
      </>
    );
  } else if (!sel.year) {
    body = (
      <>
        <StepHeading headingRef={headingRef} sub={vehicleLabel(sel)}>
          {c.chooseYear}
        </StepHeading>
        <div className="flex flex-col gap-4">
          {decadesFor(sel.model).map((d) => (
            <div key={d.decade} className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">
                {d.label}
              </p>
              <ul className="grid grid-cols-4 gap-1.5 xs:grid-cols-5">
                {d.years.map((y) => (
                  <li key={y}>
                    <Link
                      to={vehiclePath({ brand: sel.brand, model: sel.model, year: y })}
                      className="flex h-11 items-center justify-center border border-brand-border-strong bg-brand-card text-[15px] font-semibold tabular-nums text-brand-text active:bg-brand-surface"
                    >
                      {y}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  } else if (!sel.category) {
    const pathFor = (over) => vehiclePath({ ...sel, ...over });
    body = (
      <>
        <StepHeading headingRef={headingRef} sub={vehicleLabel(sel)}>
          {c.chooseCategory}
        </StepHeading>
        <CategorySteps list={partCategories} counts={counts} pathFor={pathFor} />
        <p className="pt-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
          {c.fitsAllGroup}
        </p>
        <CategorySteps
          list={categories.filter((cat) => cat.slug === OIL_CATEGORY)}
          counts={counts}
          pathFor={pathFor}
        />
      </>
    );
  } else if (!sel.type) {
    body = (
      <>
        <StepHeading headingRef={headingRef} sub={vehicleLabel(sel)}>
          {sel.category.name}
        </StepHeading>
        <ul className="border-t border-brand-border">
          {sel.category.types.map((type) => {
            const n = counts.type(sel.category, type);
            return (
              <StepLink key={type.slug} to={vehiclePath({ ...sel, type })} count={n} dim={n === 0}>
                {type.name}
              </StepLink>
            );
          })}
        </ul>
      </>
    );
  } else {
    body = (
      <StepHeading headingRef={headingRef} sub={vehicleLabel(sel)}>
        {sel.type.name}
      </StepHeading>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {top}
      {body}
    </div>
  );
}
