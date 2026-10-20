import { cx } from "../lib/format";

/**
 * Merkene til Facebook og Snapchat som inline SVG. Alltid dekor (aria-hidden),
 * teksten ved siden av bærer meningen. Merkene farges ikke om, strekkes ikke
 * og får ingen effekter: Facebook-merket er hvitt på Facebook-blått, Snapchat-
 * spøkelset hvitt med svart kontur på Snapchat-gult (tokens i index.css).
 */

/** Facebook-«f» i currentColor. Brukes hvitt på brand-facebook. */
export function FacebookMark({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
    </svg>
  );
}

/** Snapchat-spøkelset: hvit fyll med svart kontur. Konturen tegnes utenpå fyllet. */
export function SnapchatMark({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-1.5 -1.5 27 27"
      aria-hidden="true"
      focusable="false"
      className={cx("fill-brand-on-facebook stroke-brand-on-snapchat", className)}
      strokeWidth={1.6}
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
}

/**
 * Lite rundt merke i kanalens farge, til kildeetiketter og knapper.
 * Facebook: hvit f på blått. Snapchat: spøkelse på gult. Andre kilder: ingenting.
 */
export function SourceMark({ source, size = 16, className }) {
  if (source === "facebook") {
    return (
      <span
        className={cx(
          "inline-flex shrink-0 items-center justify-center rounded-pill bg-brand-facebook text-brand-on-facebook",
          className,
        )}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <FacebookMark size={Math.round(size * 0.6)} />
      </span>
    );
  }
  if (source === "snapchat") {
    return (
      <span
        className={cx(
          "inline-flex shrink-0 items-center justify-center rounded-pill bg-brand-snapchat",
          className,
        )}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <SnapchatMark size={Math.round(size * 0.7)} />
      </span>
    );
  }
  return null;
}
