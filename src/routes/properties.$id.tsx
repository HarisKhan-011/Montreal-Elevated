import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  Car,
  Layers as LayersIcon,
} from "lucide-react";
import { properties, formatPrice } from "@/lib/data";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionReveal } from "@/components/site/SectionReveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData }) =>
    loaderData
      ? createSeo({
          title: `${loaderData.property.title} in ${loaderData.property.neighborhood} — Nachal Realty`,
          description: loaderData.property.description.slice(0, 155),
          path: `/properties/${loaderData.property.id}`,
          image: loaderData.property.image,
          imageAlt: `${loaderData.property.title} in ${loaderData.property.neighborhood}, Montreal`,
        })
      : {},
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const { openViewing, openConsult } = useFlows();
  const [idx, setIdx] = useState(0);
  const similar = properties
    .filter((x) => x.id !== p.id && (x.type === p.type || x.neighborhood === p.neighborhood))
    .slice(0, 3);

  return (
    <>
      {/* Gallery */}
      <section className="bg-charcoal pt-28">
        <div className="container-90 pt-10 pb-6 flex items-center justify-between text-ivory">
          <Link
            to="/properties"
            className="text-[0.7rem] tracking-[0.22em] uppercase gold-underline"
          >
            ← All Properties
          </Link>
          <div className="eyebrow text-gold">{p.type}</div>
        </div>
        <div className="container-90 relative aspect-[16/9] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={p.gallery[idx]}
              alt={`${p.title} photo ${idx + 1}`}
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              aria-label="Previous photo"
              onClick={() => setIdx((i) => (i - 1 + p.gallery.length) % p.gallery.length)}
              className="size-12 m-4 grid place-items-center bg-charcoal/60 text-ivory hover:bg-gold hover:text-charcoal"
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              aria-label="Next photo"
              onClick={() => setIdx((i) => (i + 1) % p.gallery.length)}
              className="size-12 m-4 grid place-items-center bg-charcoal/60 text-ivory hover:bg-gold hover:text-charcoal"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {p.gallery.map((_: string, i: number) => (
              <button
                key={i}
                aria-label={`Photo ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1 w-8 ${i === idx ? "bg-gold" : "bg-ivory/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-ivory py-20">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-7">
            <div className="eyebrow text-gold">{p.neighborhood}</div>
            <h1 className="font-display text-5xl md:text-6xl mt-3 leading-[1.05]">{p.title}</h1>
            <p className="mt-3 text-muted-foreground">{p.address}, Montréal</p>
            <p className="mt-8 text-lg leading-relaxed text-foreground/85 max-w-2xl">
              {p.description}
            </p>

            <div className="hairline my-12" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
              {[
                ["Beds", p.beds || "—", BedDouble],
                ["Baths", p.baths, Bath],
                ["Interior", `${p.sqft.toLocaleString()} sqft`, Maximize],
                ["Year built", p.yearBuilt, Calendar],
                ["Parking", p.parking, Car],
                ["Floors", p.floors, LayersIcon],
              ].map(([label, val, Icon]: any) => (
                <div key={label}>
                  <div className="flex items-center gap-2 eyebrow text-slate-muted">
                    <Icon size={12} /> {label}
                  </div>
                  <div className="mt-2 font-display text-2xl">{val}</div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <div className="eyebrow text-gold mb-4">Highlights</div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {p.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 size-1.5 bg-gold" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 bg-linen p-8 border-t-2 border-gold">
              <div className="eyebrow text-slate-muted">Asking</div>
              <div className="font-display text-5xl text-charcoal mt-2">{formatPrice(p.price)}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                {p.address}, {p.neighborhood}
              </div>
              <div className="hairline my-6" />
              <div className="flex flex-col gap-3">
                <CTAButton variant="gold" onClick={() => openViewing(p)}>
                  Book a Viewing
                </CTAButton>
                <CTAButton variant="dark" onClick={openConsult}>
                  Request Information
                </CTAButton>
              </div>
              <div className="mt-8 aspect-[4/3] bg-charcoal/5 border border-border overflow-hidden">
                <iframe
                  title="Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(p.address + ", Montréal")}&output=embed`}
                  className="size-full"
                  loading="lazy"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="bg-linen py-20">
          <div className="container-90">
            <SectionReveal className="mb-10">
              <div className="eyebrow text-gold mb-3">Similar Properties</div>
              <h2 className="font-display text-4xl md:text-5xl">You may also like.</h2>
            </SectionReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similar.map((s) => (
                <PropertyCard key={s.id} p={s} onViewing={openViewing} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
