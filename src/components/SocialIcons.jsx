import { useRef, useState } from "react";
import { getChannel } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import SnapchatQrDialog from "./SnapchatQrDialog";
import { FacebookMark, SnapchatMark } from "./SocialMarks";

/**
 * Små ikonknapper til Facebook og Snapchat for header, mobilmeny og hero,
 * alltid i merkefargene. Facebook lenker ut. Snapchat lenker direkte under md
 * og åpner QR-dialogen (med lenke) fra md, der en telefon ikke er for hånden.
 * Ikonene er dekor, aria-label er navnet. Ingen eksterne kall.
 */
export default function SocialIcons({ size = "md", label, tone = "dark", className }) {
  const facebook = getChannel("facebook");
  const snapchat = getChannel("snapchat");
  const [qrOpen, setQrOpen] = useState(false);
  const snapButtonRef = useRef(null);

  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? 16 : 18;
  const base = cx("flex items-center justify-center transition-[filter]", box);
  const facebookClass = cx(base, "bg-brand-facebook text-brand-on-facebook hover:brightness-110");
  const snapchatClass = cx(base, "bg-brand-snapchat hover:brightness-95");

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
              className={facebookClass}
              aria-label={socialLinks.facebookAria}
            >
              <FacebookMark size={iconSize} />
            </a>
          </li>
        )}
        {snapchat?.url && (
          <li className="md:hidden">
            <a
              href={snapchat.url}
              target="_blank"
              rel="noopener noreferrer"
              className={snapchatClass}
              aria-label={socialLinks.snapchatAria}
            >
              <SnapchatMark size={iconSize} />
            </a>
          </li>
        )}
        {snapchat?.qrImage && (
          <li className={cx(snapchat.url && "hidden md:block")}>
            <button
              ref={snapButtonRef}
              type="button"
              onClick={() => setQrOpen(true)}
              className={snapchatClass}
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
        )}
      </ul>
    </div>
  );
}
