import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "dark" | "ghost" | "outline";
  children: ReactNode;
};

export const CTAButton = forwardRef<HTMLButtonElement, Props>(function CTAButton(
  { variant = "gold", className, children, ...rest },
  ref,
) {
  const base =
    "magnetic-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.78rem] font-medium tracking-[0.18em] uppercase rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  const styles =
    variant === "gold"
      ? "bg-gold text-charcoal hover:bg-gold-soft"
      : variant === "dark"
      ? "bg-charcoal text-ivory hover:bg-foreground"
      : variant === "outline"
      ? "border border-gold text-gold hover:bg-gold hover:text-charcoal"
      : "text-foreground hover:text-gold";
  return (
    <button ref={ref} className={cn(base, styles, className)} {...rest}>
      {children}
    </button>
  );
});
