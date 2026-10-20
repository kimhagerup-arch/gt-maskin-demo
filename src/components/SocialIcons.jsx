import { useRef, useState } from "react";
import { getChannel } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import SnapchatQrDialog from "./SnapchatQrDialog";
import { FacebookMark, SnapchatMark } from "./SocialMarks";

/**
 * Runde ikonknapper (44 px) til Facebook og Snapchat for header, mobilmeny og
 * hero, alltid i merkefargene: blå sirkel med hvit f, gul sirkel med hvitt
 * spøkelse i svart kontur. Facebook lenker ut. Snapchat lenker direkte under md
 * og åpner QR-dialogen (med lenke) fra md. Ikonene er dekor, aria-label er navnet.
 * `stack`: etikett over knappene under 640 px, så raden ikke brekker ulikt før og
 * etter at fonten er lastet (ga layout-skift i hero).
 */
export default function SocialIcons({ label, tone = "dark", stack = false, className }) {
  const facebook = getChannel("facebook");
  const snapchat = getChannel("snapchat");
  const [qrOpen, setQrOpen] = useState(false);
  const snapButtonRef = useRef(null);

  const base = "flex h-11 w-11 items-center justify-center rounded-pill transition-[filter]";
  const facebookClass = cx(base, "bg-brand-facebook text-brand-on-facebook hover:brightness-110");
  const snapchatClass = cx(base, "bg-brand-snapchat hover:brightness-95");

  return (
    <div
      className={cx(
        "flex gap-2",
        stack ? "flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-2" : "items-center",
        className,
      )}
    >
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
              <FacebookMark size={20} />
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
              <SnapchatMark size={22} />
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
              <SnapchatMark size={22} />
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
