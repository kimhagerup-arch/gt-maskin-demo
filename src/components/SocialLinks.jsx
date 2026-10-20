import { channels } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import { FacebookMark, SnapchatMark } from "./SocialMarks";

export { FacebookMark, SnapchatMark } from "./SocialMarks";

const ORDER = ["facebook", "messenger", "snapchat"];

/** Knappestil per kanal: merkefargene brukes alltid, uavhengig av flaten rundt. */
export const CHANNEL_BUTTON = {
  facebook: "bg-brand-facebook text-brand-on-facebook hover:brightness-110",
  messenger: "bg-brand-facebook text-brand-on-facebook hover:brightness-110",
  snapchat: "bg-brand-snapchat text-brand-on-snapchat hover:brightness-95",
};

function LinkButton({ href, platform, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex h-11 items-center gap-2.5 px-4 text-sm font-bold transition-[filter]",
        CHANNEL_BUTTON[platform],
      )}
    >
      {children}
    </a>
  );
}

/**
 * Kanalknapper: Facebook, Messenger og Snapchat i merkefargene. Ikonene er dekor,
 * teksten er lenken. qr: "desktop" viser QR fra md og lenke under md,
 * "always" QR-blokken (med lenke) i stedet for knappen, "never" aldri QR.
 */
export default function SocialLinks({ tone = "dark", include = ORDER, qr = "never", className }) {
  const dark = tone === "dark";
  const list = ORDER.filter((p) => include.includes(p))
    .map((p) => channels.find((c) => c.platform === p))
    .filter(Boolean);
  const snapchat = list.find((c) => c.platform === "snapchat");
  const showQr = Boolean(snapchat?.qrImage) && qr !== "never";

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <ul className="flex flex-wrap gap-2.5">
        {list.map((c) => {
          if (c.platform === "facebook") {
            return (
              <li key={c.platform}>
                <LinkButton href={c.url} platform="facebook">
                  <FacebookMark />
                  {socialLinks.facebook}
                </LinkButton>
              </li>
            );
          }
          if (c.platform === "messenger") {
            return (
              <li key={c.platform}>
                <LinkButton href={c.url} platform="messenger">
                  <Icon name="MessageCircle" size={18} strokeWidth={2} />
                  {socialLinks.messenger}
                </LinkButton>
              </li>
            );
          }
          if (c.platform === "snapchat" && c.url && qr !== "always") {
            return (
              <li key={c.platform} className={cx(qr === "desktop" && "md:hidden")}>
                <LinkButton href={c.url} platform="snapchat">
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
        <div className={cx("flex items-center gap-4", qr === "desktop" && "hidden md:flex")}>
          <div className="h-24 w-24 shrink-0 bg-brand-snapchat p-1">
            <Picture
              src={snapchat.qrImage}
              alt={snapchat.qrAlt}
              sizes="96px"
              imgClassName="h-full w-full object-contain"
              tone="light"
              fallbackLabel="[QR]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span
              className={cx(
                "inline-flex items-center gap-2 text-sm font-bold",
                dark ? "text-brand-text-inverse" : "text-brand-text",
              )}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center bg-brand-snapchat">
                <SnapchatMark size={16} />
              </span>
              {socialLinks.snapchat}
            </span>
            <span
              className={cx("text-[13px]", dark ? "text-brand-muted-inverse" : "text-brand-muted")}
            >
              {socialLinks.snapchatQr}
            </span>
            {snapchat.url && (
              <a
                href={snapchat.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  "inline-flex items-center gap-1.5 text-[13px] font-bold underline-offset-2 hover:underline",
                  dark ? "text-brand-text-inverse" : "text-brand-text",
                )}
              >
                {socialLinks.snapchatOpen}
                <Icon name="ExternalLink" size={13} strokeWidth={2.2} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
