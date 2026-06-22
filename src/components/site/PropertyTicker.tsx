import { properties, formatPrice } from "@/lib/data";

export function PropertyTicker() {
  const items = [...properties, ...properties];
  return (
    <div className="border-y border-border bg-charcoal text-ivory overflow-hidden py-4">
      <div className="marquee-track gap-12">
        {items.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[0.78rem] tracking-[0.22em] uppercase">
            <span className="text-gold">Featured</span>
            <span className="opacity-80">{p.address}, {p.neighborhood}</span>
            <span className="text-gold">·</span>
            <span>{formatPrice(p.price)}</span>
            <span className="opacity-30 mx-6">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
