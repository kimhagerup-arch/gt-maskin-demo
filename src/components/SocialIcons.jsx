import { useRef, useState } from "react";
import { getChannel } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import SnapchatQrDialog from "./SnapchatQrDialog";
import { FacebookMark, SnapchatMark } from "./SocialLinks";

/**
 * Små ikonlenker til Facebook og Snapchat for header, mobilmeny og hero.
 * Facebook lenker ut. Snapchat lenker til snapchat.com/add/<brukernavn> når
 * channels.js har url, ellers åpner den en dialog med QR-koden.
 * Ikonene er dekor, aria-label er navnet. Ingen eksterne kall.
 */
export default function SocialIcons({ size = "md", tone = "dark", label, className }) {
  const facebook = getChannel("facebook");
  const snapchat = getChannel("snapchat");
  const [qrOpen, setQrOpen] = useState(false);
  const snapButtonRef = useRef(null);

  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? 16 : 18;
  const base = cx(
    "flex items-center justify-center border transition-colors",
    box,
    tone === "dark"
      ? "border-brand-border-dark-strong text-brand-text-inverse hover:border-brand-accent-light hover:text-brand-accent-light"
      : "border-brand-border-strong text-brand-text hover:border-brand-primary hover:text-brand-accent-deep",
  );

  return (
    <div className={cx("flex items-center gap-2", className)}>
      {label && (
        <span
          className={cx(
            "text-sm font-semibold",
            tone === "dark" ? "text-brand-muted-inverse" : "text-brand-muted",
          )}
        >
          {label}
        </span>
      )}
      <ul className="flex items-center gap-2">
        {facebook && (
          <li>
            <a
              href={facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className={base}
              aria-label={socialLinks.facebookAria}
            >
              <FacebookMark size={iconSize} />
            </a>
          </li>
        )}
        {snapchat &&
          (snapchat.url ? (
            <li>
              <a
                href={snapchat.url}
                target="_blank"
                rel="noopener noreferrer"
                className={base}
                aria-label={socialLinks.snapchatAria}
              >
                <SnapchatMark size={iconSize} />
              </a>
            </li>
          ) : (
            <li>
              <button
                ref={snapButtonRef}
                type="button"
                onClick={() => setQrOpen(true)}
                className={base}
                aria-label={socialLinks.snapchatAria}
                aria-haspopup="dialog"
                aria-expanded={qrOpen}
              >
                <SnapchatMark size={iconSize} />
              </button>
              <SnapchatQrDialog
                open={qrOpen}
                onClose={() => setQrOpen(false)}
                returnFocusRef={snapButtonRef}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
