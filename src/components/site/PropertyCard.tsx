import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BedDouble, Bath, Maximize } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { CTAButton } from "./CTAButton";

export function PropertyCard({ p, onViewing }: { p: Property; onViewing: (p: Property) => void }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="group bg-card border border-border overflow-hidden hover:shadow-card transition-shadow"
    >
      <Link to="/properties/$id" params={{ id: p.id }} className="block relative aspect-[4/3] overflow-hidden bg-muted">
        <motion.img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="size-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <span className="absolute top-4 left-4 bg-charcoal/85 text-ivory text-[0.65rem] tracking-[0.22em] uppercase px-3 py-1.5">
          {p.type}
        </span>
        <span className="absolute top-4 right-4 bg-gold text-charcoal text-[0.7rem] tracking-[0.18em] uppercase font-medium px-3 py-1.5">
          {formatPrice(p.price)}
        </span>
      </Link>
      <div className="p-6">
        <div className="eyebrow text-slate-muted">{p.neighborhood}</div>
        <Link to="/properties/$id" params={{ id: p.id }} className="block mt-2">
          <h3 className="font-display text-2xl text-foreground leading-tight">{p.title}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{p.address}</p>
        <div className="mt-5 flex items-center gap-5 text-xs text-slate-muted tracking-wider">
          {p.beds > 0 && <span className="inline-flex items-center gap-1.5"><BedDouble size={14} />{p.beds} bd</span>}
          <span className="inline-flex items-center gap-1.5"><Bath size={14} />{p.baths} ba</span>
          <span className="inline-flex items-center gap-1.5"><Maximize size={14} />{p.sqft.toLocaleString()} sqft</span>
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <Link to="/properties/$id" params={{ id: p.id }} className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline">View Details</Link>
          <CTAButton variant="dark" className="ml-auto px-4 py-2 text-[0.68rem]" onClick={() => onViewing(p)}>Book Viewing</CTAButton>
        </div>
      </div>
    </motion.article>
  );
}
