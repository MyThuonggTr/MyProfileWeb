// Anchor styled with the base.css button classes. Without `variant` it is a plain link.
import type { ComponentPropsWithoutRef } from "react";
import { Icon, type IconName } from "./icon";

export type ButtonVariant = "solid" | "line" | "text";

export type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: ButtonVariant;
  /** Icon shown before the label (decorative). */
  icon?: IconName;
};

export function ButtonLink({ variant, icon, className, children, ...rest }: ButtonLinkProps) {
  const classes = [variant && `btn btn--${variant}`, className].filter(Boolean).join(" ") || undefined;
  return (
    <a className={classes} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </a>
  );
}
