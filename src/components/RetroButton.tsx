import Link from "next/link";
import type { ComponentProps } from "react";

type RetroLinkProps = ComponentProps<typeof Link> & {
  secondary?: boolean;
};

export function RetroButton({ secondary = false, className, ...props }: RetroLinkProps) {
  const classes = ["retro-button", secondary ? "retro-button--secondary" : null, className]
    .filter(Boolean)
    .join(" ");
  return <Link className={classes} {...props} />;
}
