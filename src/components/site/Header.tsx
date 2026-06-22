import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useFlows } from "./Flows";

const nav = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { openConsult } = useFlows();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);

  const solid = scrolled || !isHome;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid ? "bg-charcoal/90 backdrop-blur-md text-ivory border-b border-white/10" : "bg-transparent text-ivory"
      }`}
    >
      <div className="container-90 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="size-8 grid place-items-center border border-gold text-gold font-display text-lg leading-none">N</span>
          <span className="font-display text-xl tracking-wide">Nachal <span className="text-gold italic">Realty</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to} to={n.to}
              className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline data-[status=active]:text-gold"
              activeProps={{ "data-status": "active" } as any}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CTAButton variant="gold" onClick={openConsult}>Book a Consultation</CTAButton>
        </div>
        <button className="lg:hidden p-2" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={22} /></button>
      </div>

      {open && (
        <motion.div
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-charcoal text-ivory p-8 flex flex-col"
        >
          <div className="flex justify-end"><button aria-label="Close" onClick={() => setOpen(false)}><X size={24} /></button></div>
          <nav className="flex-1 flex flex-col justify-center gap-5">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="font-display text-4xl">{n.label}</Link>
            ))}
          </nav>
          <CTAButton variant="gold" onClick={openConsult}>Book a Consultation</CTAButton>
        </motion.div>
      )}
    </motion.header>
  );
}
