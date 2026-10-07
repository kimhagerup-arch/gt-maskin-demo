import { channels } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";

/** Facebook-merket som inline SVG i currentColor. Dekor, teksten står ved siden av. */
function FacebookMark({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
    </svg>
  );
}

/** Snapchat-spøkelset som inline SVG i currentColor. Dekor. */
function SnapchatMark({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
}

const ORDER = ["facebook", "messenger", "snapchat"];

function LinkButton({ href, tone, children }) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex h-11 items-center gap-2.5 border px-4 text-sm font-bold transition-colors",
        dark
          ? "border-brand-outline text-brand-text-inverse hover:border-brand-accent-light hover:text-brand-accent-light"
          : "border-brand-border-strong text-brand-text hover:border-brand-primary hover:text-brand-accent-deep",
      )}
    >
      {children}
    </a>
  );
}

/**
 * Kanalknapper: Facebook, Messenger og Snapchat. Ikonene er dekor, teksten er lenken.
 * Snapchat uten brukernavn (url null) vises som QR-kode uten lenke.
 * qr: "desktop" viser QR fra md og lenke under md, "always" alltid QR, "never" aldri.
 */
export default function SocialLinks({ tone = "dark", include = ORDER, qr = "never", className }) {
  const dark = tone === "dark";
  const list = ORDER.filter((p) => include.includes(p))
    .map((p) => channels.find((c) => c.platform === p))
    .filter(Boolean);
  const snapchat = list.find((c) => c.platform === "snapchat");
  const showQr = snapchat?.qrImage && (qr !== "never" || !snapchat.url);

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <ul className="flex flex-wrap gap-2.5">
        {list.map((c) => {
          if (c.platform === "facebook") {
            return (
              <li key={c.platform}>
                <LinkButton href={c.url} tone={tone}>
                  <FacebookMark />
                  {socialLinks.facebook}
                </LinkButton>
              </li>
            );
          }
          if (c.platform === "messenger") {
            return (
              <li key={c.platform}>
                <LinkButton href={c.url} tone={tone}>
                  <Icon name="MessageCircle" size={18} strokeWidth={2} />
                  {socialLinks.messenger}
                </LinkButton>
              </li>
            );
          }
          if (c.platform === "snapchat" && c.url) {
            return (
              <li key={c.platform} className={cx(qr === "desktop" && "md:hidden")}>
                <LinkButton href={c.url} tone={tone}>
                  <SnapchatMark />
                  {qr === "desktop" ? socialLinks.snapchatOpen : socialLinks.snapchat}
                </LinkButton>
              </li>
            );
          }
          return null;
        })}
      </ul>

      {showQr && (
        <div
          className={cx(
            "flex items-center gap-4",
            qr === "desktop" && snapchat.url && "hidden md:flex",
          )}
        >
          <div
            className={cx(
              "h-24 w-24 shrink-0 p-1",
              dark ? "bg-brand-bg" : "border border-brand-border bg-brand-card",
            )}
          >
            <Picture
              src={snapchat.qrImage}
              alt={snapchat.qrAlt}
              sizes="96px"
              imgClassName="h-full w-full object-contain"
              tone="light"
              fallbackLabel="[QR]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span
              className={cx(
                "inline-flex items-center gap-2 text-sm font-bold",
                dark ? "text-brand-text-inverse" : "text-brand-text",
              )}
            >
              <SnapchatMark />
              {socialLinks.snapchat}
            </span>
            <span
              className={cx("text-[13px]", dark ? "text-brand-muted-inverse" : "text-brand-muted")}
            >
              {snapchat.url ? socialLinks.snapchatQr : socialLinks.snapchatPending}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
