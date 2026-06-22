import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { neighborhoods } from "@/lib/data";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/site/SectionReveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/neighborhoods")({
  head: () =>
    createSeo({
      title: "Montreal Neighborhoods — Nachal Realty",
      description:
        "Explore Westmount, Outremont, Plateau, Old Montreal, Griffintown and more of Greater Montreal's most desirable neighborhoods.",
      path: "/neighborhoods",
    }),
  component: NeighborhoodsPage,
});

function NeighborhoodsPage() {
  return (
    <>
      <section className="bg-charcoal text-ivory pt-36 pb-24">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">Neighborhoods · Greater Montreal</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
              A city of <em className="text-gold not-italic">streets, not listings.</em>
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-6">
            <p className="text-ivory/70 leading-relaxed">
              Each Montreal neighborhood has its own architecture, rhythm, and price logic. Here is
              how we read them.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-90">
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {neighborhoods.map((n) => (
              <StaggerItem key={n.slug}>
                <article className="group">
                  <Link to="/properties" className="block relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={n.image}
                      alt={n.name}
                      loading="lazy"
                      className="size-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                      <div className="eyebrow text-gold mb-2">{n.range}</div>
                      <div className="font-display text-3xl">{n.name}</div>
                    </div>
                  </Link>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{n.vibe}</p>
                  <Link
                    to="/properties"
                    className="mt-4 inline-block text-[0.7rem] tracking-[0.22em] uppercase gold-underline"
                  >
                    View Properties in {n.name}
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
