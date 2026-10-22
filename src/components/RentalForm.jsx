import { useId, useRef, useState } from "react";
import { rentalTypes } from "../data/rental";
import { bookingForm, rentalSection } from "../data/siteContent";
import { useHideStickyBar } from "../hooks/useHideStickyBar";
import { cx } from "../lib/format";
import { EMAIL_RE, isBlank, submitForm } from "../lib/forms";
import Button from "./Button";
import { ContactLine, Field, FormStatus, FormSuccess, Honeypot } from "./FormBits";

/**
 * Utleieforespørsel. UI-only: validering (til-dato ikke før fra-dato), honeypot,
 * aria-live og suksess-tilstand, sendt via submitForm("utleie", payload).
 */
export default function RentalForm({ className, initialType = "" }) {
  const t = rentalSection.request;
  const uid = useId();
  const formRef = useRef(null);
  useHideStickyBar(formRef);

  const [values, setValues] = useState({
    type: initialType,
    from: "",
    to: "",
    count: "1",
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const fieldId = (key) => `${uid}-${key}`;

  const validate = () => {
    const next = {};
    let message = t.validation;
    if (isBlank(values.type)) next.type = true;
    if (isBlank(values.from)) next.from = true;
    if (isBlank(values.to)) next.to = true;
    if (isBlank(values.name)) next.name = true;
    if (isBlank(values.phone) && isBlank(values.email)) {
      next.phone = true;
      next.email = true;
    }
    if (!isBlank(values.email) && !EMAIL_RE.test(values.email.trim())) {
      next.email = true;
      message = t.validationEmail;
    }
    if (!isBlank(values.from) && !isBlank(values.to) && values.to < values.from) {
      next.to = true;
      message = t.validationDates;
    }
    setErrors(next);
    setFormError(Object.keys(next).length ? message : "");
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return;
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await submitForm("utleie", { ...values, website: undefined });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputProps = (key) => ({
    id: fieldId(key),
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    className: cx("input-dark", errors[key] && "border-brand-accent-light"),
  });

  const f = t.fields;

  return (
    <div
      id={t.id}
      ref={formRef}
      className={cx(
        "scroll-mt-24 border border-brand-border-dark bg-brand-primary-light p-6 md:p-10",
        status === "success" && "self-start",
        className,
      )}
    >
      {status === "success" ? (
        <FormSuccess message={t.success} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold md:text-[22px]">{t.title}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field id={fieldId("type")} label={f.type.label} className="md:col-span-2">
              <select {...inputProps("type")}>
                <option value="">{f.type.placeholder}</option>
                {rentalTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={fieldId("from")} label={f.from.label}>
              <input type="date" {...inputProps("from")} />
            </Field>
            <Field id={fieldId("to")} label={f.to.label}>
              <input type="date" min={values.from || undefined} {...inputProps("to")} />
            </Field>
            <Field id={fieldId("count")} label={f.count.label}>
              <input type="number" inputMode="numeric" min="1" max="20" {...inputProps("count")} />
            </Field>
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
          </div>

          <Field id={fieldId("message")} label={f.message.label}>
            <textarea
              placeholder={f.message.placeholder}
              rows={4}
              {...inputProps("message")}
              className="textarea-dark"
            />
          </Field>

          <Honeypot id={fieldId("website")} value={values.website} onChange={set("website")} />

          <FormStatus message={formError || (status === "error" ? bookingForm.error : "")} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" arrow disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.submit}
            </Button>
            <ContactLine />
          </div>
        </form>
      )}
    </div>
  );
}
