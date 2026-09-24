import { useId, useState } from "react";
import { useCart } from "../context/CartContext";
import { companyFacts } from "../data/companyFacts";
import { bookingForm, checkoutPage, partsSection } from "../data/siteContent";
import { cx } from "../lib/format";
import { EMAIL_RE, isBlank, submitForm } from "../lib/forms";
import Button from "./Button";
import Icon from "./Icon";

/** Kasse-skjema (mock). Sender bestillingsforespørsel, ingen betaling. */
export default function CheckoutForm({ onSuccess }) {
  const uid = useId();
  const cart = useCart();
  const t = partsSection.checkout;
  const f = checkoutPage.fields;
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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
    if (isBlank(values.name)) next.name = true;
    if (isBlank(values.phone) && isBlank(values.email)) {
      next.phone = true;
      next.email = true;
    }
    if (!isBlank(values.email) && !EMAIL_RE.test(values.email.trim())) next.email = true;
    setErrors(next);
    setFormError(Object.keys(next).length ? t.validation : "");
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return;
    if (!validate()) return;
    setStatus("sending");
    const res = await submitForm("checkout", {
      ...values,
      website: undefined,
      items: cart.items.map((i) => ({ slug: i.slug, title: i.title, qty: i.qty, price: i.price })),
    });
    if (res.ok) {
      setStatus("success");
      cart.clear();
      onSuccess?.();
    } else {
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

  if (status === "success") {
    return (
      <div
        className="flex flex-col gap-4 border border-brand-border-dark bg-brand-primary-light p-6 md:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary">
          <Icon name="Check" size={26} strokeWidth={2.5} />
        </span>
        <p className="text-xl font-bold md:text-[22px]">{t.success}</p>
        <p className="text-[15px] text-brand-muted-inverse">
          <a href={companyFacts.phone.href} className="font-semibold text-brand-text-inverse">
            {companyFacts.phone.display}
          </a>{" "}
          ·{" "}
          <a href={companyFacts.email.href} className="font-semibold text-brand-text-inverse">
            {companyFacts.email.display}
          </a>
        </p>
        <Button to="/deler" variant="outlineDark" size="sm" className="self-start">
          {partsSection.cart.continue}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 border border-brand-border-dark bg-brand-primary-light p-6 md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={fieldId("name")}
            className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
          >
            {f.name.label}
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder={f.name.placeholder}
            {...inputProps("name")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={fieldId("phone")}
            className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
          >
            {f.phone.label}
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={f.phone.placeholder}
            {...inputProps("phone")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={fieldId("email")}
            className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
          >
            {f.email.label}
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder={f.email.placeholder}
            {...inputProps("email")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={fieldId("address")}
            className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
          >
            {f.address.label}
          </label>
          <input
            type="text"
            autoComplete="street-address"
            placeholder={f.address.placeholder}
            {...inputProps("address")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId("message")}
          className="text-xs font-bold uppercase tracking-wider text-brand-muted-inverse"
        >
          {f.message.label}
        </label>
        <textarea
          rows={4}
          placeholder={f.message.placeholder}
          {...inputProps("message")}
          className="textarea-dark"
        />
      </div>

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
        <Button type="submit" arrow disabled={status === "sending" || cart.items.length === 0}>
          {status === "sending" ? bookingForm.sending : t.submit}
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
  );
}
