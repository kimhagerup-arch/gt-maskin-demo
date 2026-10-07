import { useId, useRef, useState } from "react";
import { bookingForm, carsSection } from "../data/siteContent";
import { useHideStickyBar } from "../hooks/useHideStickyBar";
import { cx } from "../lib/format";
import { EMAIL_RE, isBlank, submitForm } from "../lib/forms";
import Button from "./Button";
import { ContactLine, Field, FormStatus, FormSuccess, Honeypot } from "./FormBits";

/**
 * «Vi skaffer»-skjema (biljakt). UI-only: validering, honeypot, aria-live og
 * suksess-tilstand, sendt via submitForm("biljakt", payload).
 */
export default function CarWantedForm({ className }) {
  const t = carsSection.wanted;
  const uid = useId();
  const formRef = useRef(null);
  useHideStickyBar(formRef);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    budget: "",
    wishes: "",
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
    if (isBlank(values.name)) next.name = true;
    if (isBlank(values.model)) next.model = true;
    if (isBlank(values.phone) && isBlank(values.email)) {
      next.phone = true;
      next.email = true;
    }
    if (!isBlank(values.email) && !EMAIL_RE.test(values.email.trim())) {
      next.email = true;
      message = t.validationEmail;
    }
    const from = Number.parseInt(values.yearFrom, 10);
    const to = Number.parseInt(values.yearTo, 10);
    if (!Number.isNaN(from) && !Number.isNaN(to) && to < from) {
      next.yearTo = true;
      message = t.validationYears;
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
      const res = await submitForm("biljakt", { ...values, website: undefined });
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
            <Field id={fieldId("model")} label={f.model.label}>
              <input type="text" placeholder={f.model.placeholder} {...inputProps("model")} />
            </Field>
            <Field id={fieldId("yearFrom")} label={f.yearFrom.label}>
              <input
                type="number"
                inputMode="numeric"
                min="1900"
                max="2100"
                placeholder={f.yearFrom.placeholder}
                {...inputProps("yearFrom")}
              />
            </Field>
            <Field id={fieldId("yearTo")} label={f.yearTo.label}>
              <input
                type="number"
                inputMode="numeric"
                min="1900"
                max="2100"
                placeholder={f.yearTo.placeholder}
                {...inputProps("yearTo")}
              />
            </Field>
            <Field id={fieldId("budget")} label={f.budget.label} className="md:col-span-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder={f.budget.placeholder}
                {...inputProps("budget")}
              />
            </Field>
          </div>

          <Field id={fieldId("wishes")} label={f.wishes.label}>
            <textarea
              placeholder={f.wishes.placeholder}
              rows={4}
              {...inputProps("wishes")}
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
