import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyTicker } from "@/components/site/PropertyTicker";
import { SectionReveal } from "@/components/site/SectionReveal";
import { useFlows } from "@/components/site/Flows";
import { properties, type PropertyType } from "@/lib/data";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/properties/")({
  head: () =>
    createSeo({
      title: "Montreal Properties for Sale — Nachal Realty",
      description:
        "Browse a curated selection of luxury, residential, commercial and investment properties for sale across Greater Montreal.",
      path: "/properties",
    }),
  component: PropertiesPage,
});

const TYPES: ("All" | PropertyType)[] = [
  "All",
  "Luxury",
  "Condo",
  "House",
  "Multi-Family",
  "Commercial",
];

function PropertiesPage() {
  const { openViewing } = useFlows();
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [nbhd, setNbhd] = useState("All");
  const [max, setMax] = useState(15_000_000);
  const [beds, setBeds] = useState(0);

  const nbhdOptions = ["All", ...Array.from(new Set(properties.map((p) => p.neighborhood)))];

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          (type === "All" || p.type === type) &&
          (nbhd === "All" || p.neighborhood === nbhd) &&
          p.price <= max &&
          p.beds >= beds,
      ),
    [type, nbhd, max, beds],
  );

  return (
    <>
      {/* hero */}
      <section className="bg-charcoal text-ivory pt-36 pb-20">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">Properties · Greater Montreal</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
              The current <em className="text-gold not-italic">collection.</em>
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-6">
            <p className="text-ivory/70 leading-relaxed">
              From canal-front condos to heritage estates and trophy commercial assets. Filter by
              type, neighborhood and budget.
            </p>
          </SectionReveal>
        </div>
      </section>

      <PropertyTicker />

      {/* filter bar */}
      <section className="bg-linen sticky top-20 z-30 border-b border-border">
        <div className="container-90 py-6 grid gap-5 lg:grid-cols-12 items-end">
          <div className="lg:col-span-4">
            <div className="eyebrow text-slate-muted mb-2">Type</div>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 text-[0.65rem] tracking-[0.18em] uppercase border ${type === t ? "bg-charcoal text-ivory border-charcoal" : "border-border hover:border-charcoal"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="eyebrow text-slate-muted mb-2">Neighborhood</div>
            <select
              value={nbhd}
              onChange={(e) => setNbhd(e.target.value)}
              className="w-full bg-transparent border border-border px-3 py-2.5 text-sm"
            >
              {nbhdOptions.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-3">
            <div className="eyebrow text-slate-muted mb-2">
              Max price · ${(max / 1_000_000).toFixed(1)}M
            </div>
            <input
              type="range"
              min={500000}
              max={15000000}
              step={250000}
              value={max}
              onChange={(e) => setMax(+e.target.value)}
              className="w-full accent-[var(--gold)]"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="eyebrow text-slate-muted mb-2">Beds</div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((b) => (
                <button
                  key={b}
                  onClick={() => setBeds(b)}
                  className={`flex-1 py-2 text-xs border ${beds === b ? "bg-charcoal text-ivory border-charcoal" : "border-border"}`}
                >
                  {b === 0 ? "Any" : `${b}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-90">
          <div className="mb-10 flex items-center justify-between">
            <div className="eyebrow text-slate-muted">
              {filtered.length} {filtered.length === 1 ? "property" : "properties"}
            </div>
          </div>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PropertyCard p={p} onViewing={openViewing} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              No properties match these filters.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
