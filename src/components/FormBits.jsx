import { companyFacts } from "../data/companyFacts";
import { bookingForm } from "../data/siteContent";
import Button from "./Button";
import Icon from "./Icon";

/** Etikett over felt, med valgfri feilmelding under. Mørk flate. */
export function Field({ id, label, error, children, className }) {
  return (
    <div className={className ? `flex flex-col gap-1.5 ${className}` : "flex flex-col gap-1.5"}>
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-sm text-brand-accent-light" id={`${id}-feil`}>
          {error}
        </span>
      )}
    </div>
  );
}

/** Honeypot: skjult for mennesker, fylles av roboter. */
export function Honeypot({ id, value, onChange }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Nettside</label>
      <input
        id={id}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

/** Feilfelt med aria-live. */
export function FormStatus({ message }) {
  return (
    <div aria-live="assertive" className="min-h-[1.5rem] text-sm text-brand-accent-light">
      {message || ""}
    </div>
  );
}

/** Telefon og e-post ved siden av send-knappen. */
export function ContactLine() {
  return (
    <p className="text-sm text-brand-muted-inverse">
      <a
        href={companyFacts.phone.href}
        className="font-semibold text-brand-text-inverse hover:text-brand-accent-light"
      >
        {companyFacts.phone.display}
      </a>{" "}
      ·{" "}
      <a
        href={companyFacts.email.href}
        className="font-semibold text-brand-text-inverse hover:text-brand-accent-light"
      >
        {companyFacts.email.display}
      </a>
    </p>
  );
}

/** Suksess-tilstand som erstatter skjemaet. */
export function FormSuccess({ message, cta }) {
  return (
    <div className="flex flex-col gap-4" role="status" aria-live="polite">
      <span className="flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary">
        <Icon name="Check" size={26} strokeWidth={2.5} />
      </span>
      <p className="text-xl font-bold md:text-[22px]">{message}</p>
      <p className="text-[15px] text-brand-muted-inverse">
        {bookingForm.aside}{" "}
        <a href={companyFacts.phone.href} className="font-semibold text-brand-text-inverse">
          {companyFacts.phone.display}
        </a>{" "}
        ·{" "}
        <a href={companyFacts.email.href} className="font-semibold text-brand-text-inverse">
          {companyFacts.email.display}
        </a>
      </p>
      {cta && (
        <Button to={cta.to} variant="outlineDark" size="sm" className="self-start">
          {cta.label}
        </Button>
      )}
    </div>
  );
}
