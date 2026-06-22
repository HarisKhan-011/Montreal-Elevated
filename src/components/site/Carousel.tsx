import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function Carousel({
  children, className = "", slideClass = "",
}: { children: ReactNode[]; className?: string; slideClass?: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  return (
    <div className={`relative ${className}`}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {children.map((c, i) => (
            <div key={i} className={`shrink-0 ${slideClass}`}>{c}</div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end gap-2">
        <button
          aria-label="Previous"
          onClick={() => embla?.scrollPrev()}
          className="size-11 grid place-items-center border border-border bg-card hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors"
        ><ChevronLeft size={18} /></button>
        <button
          aria-label="Next"
          onClick={() => embla?.scrollNext()}
          className="size-11 grid place-items-center border border-border bg-card hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors"
        ><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
