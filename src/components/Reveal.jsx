import { useReveal } from "../hooks/useReveal";
import { cx } from "../lib/format";

/** Wrapper som fader inn med litt translate når den kommer i viewport. */
export default function Reveal({ as: Tag = "div", className, delay = 0, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={cx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
