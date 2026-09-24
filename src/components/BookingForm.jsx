import { useEffect, useId, useRef, useState } from "react";
import { companyFacts } from "../data/companyFacts";
import { bookingForm } from "../data/siteContent";
import { cx } from "../lib/format";
import { EMAIL_RE, isBlank, submitForm } from "../lib/forms";
import Button from "./Button";
import Icon from "./Icon";
import { BOOKING_VISIBLE_EVENT } from "./StickyMobileBar";

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
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

/**
 * Bestillings- og kontaktskjema. UI-only: validering, honeypot, aria-live,
 * suksess-tilstand. variant "booking" har feltet for ønsket dato, "contact" ikke.
 * Sender event til StickyMobileBar når skjemaet er i viewport.
 */
export default function BookingForm({
  variant = "booking",
  title = bookingForm.title,
  lead = bookingForm.lead,
  initialMessage = "",
  id = "bestillingsskjema",
  className,
}) {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    date: "",
    message: initialMessage,
    website: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (initialMessage) setValues((v) => ({ ...v, message: initialMessage }));
  }, [initialMessage]);

  // Skjul sticky mobil-CTA når skjemaet er synlig.
  useEffect(() => {
    const el = formRef.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent(BOOKING_VISIBLE_EVENT, { detail: entry.isIntersecting }),
        );
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.dispatchEvent(new CustomEvent(BOOKING_VISIBLE_EVENT, { detail: false }));
    };
  }, []);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const fieldId = (key) => `${uid}-${key}`;

  const validate = () => {
    const next = {};
    if (isBlank(values.name)) next.name = true;
    if (isBlank(values.message)) next.message = true;
    if (isBlank(values.phone) && isBlank(values.email)) {
      next.phone = true;
      next.email = true;
    }
    if (!isBlank(values.email) && !EMAIL_RE.test(values.email.trim())) {
      next.email = bookingForm.validationEmail;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setFormError(
        next.email === bookingForm.validationEmail
          ? bookingForm.validationEmail
          : bookingForm.validation,
      );
      return false;
    }
    setFormError("");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // honeypot
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await submitForm(variant, { ...values, website: undefined });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const f = bookingForm.fields;
  const inputProps = (key) => ({
    id: fieldId(key),
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    className: cx("input-dark", errors[key] && "border-brand-accent-light"),
  });

  return (
    <div
      id={id}
      ref={formRef}
      className={cx(
        "border border-brand-border-dark bg-brand-primary-light p-6 md:p-10",
        className,
      )}
    >
      {status === "success" ? (
        <div className="flex flex-col gap-4" role="status" aria-live="polite">
          <span className="flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary">
            <Icon name="Check" size={26} strokeWidth={2.5} />
          </span>
          <p className="text-xl font-bold md:text-[22px]">{bookingForm.success}</p>
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
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold md:text-[22px]">{title}</h2>
            <p className="text-[15px] text-brand-muted-inverse">{lead}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field id={fieldId("name")} label={f.name.label}>
              <input
                type="text"
                autoComplete="name"
                placeholder={f.name.placeholder}
                {...inputProps("name")}
              />
            </Field>
            <Field id={fieldId("phone")} label={f.phone.label}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder={f.phone.placeholder}
                {...inputProps("phone")}
              />
            </Field>
            <Field id={fieldId("email")} label={f.email.label}>
              <input
                type="email"
                autoComplete="email"
                placeholder={f.email.placeholder}
                {...inputProps("email")}
              />
            </Field>
            <Field id={fieldId("car")} label={f.car.label}>
              <input type="text" placeholder={f.car.placeholder} {...inputProps("car")} />
            </Field>
            {variant === "booking" && (
              <Field id={fieldId("date")} label={f.date.label}>
                <input type="text" placeholder={f.date.placeholder} {...inputProps("date")} />
              </Field>
            )}
          </div>

          <Field id={fieldId("message")} label={f.message.label}>
            <textarea
              placeholder={f.message.placeholder}
              rows={5}
              {...inputProps("message")}
              className={cx("textarea-dark", errors.message && "border-brand-accent-light")}
            />
          </Field>

          {/* Honeypot: skjult for mennesker, fylles av roboter */}
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={fieldId("website")}>Nettside</label>
            <input
              id={fieldId("website")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={set("website")}
            />
          </div>

          <div aria-live="assertive" className="min-h-[1.5rem] text-sm text-brand-accent-light">
            {formError || (status === "error" ? bookingForm.error : "")}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" arrow disabled={status === "sending"}>
              {status === "sending" ? bookingForm.sending : bookingForm.submit}
            </Button>
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
          </div>
        </form>
      )}
    </div>
  );
}
