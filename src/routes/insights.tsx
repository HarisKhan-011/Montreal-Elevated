import { createFileRoute } from "@tanstack/react-router";
import { insights } from "@/lib/data";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import aerial from "@/assets/montreal-aerial.jpg";
import { ArrowUpRight } from "lucide-react";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  head: () =>
    createSeo({
      title: "Montreal Real Estate Market Insights — Nachal Realty",
      description:
        "Read Montreal real estate trends, investment outlooks and neighborhood spotlights from the Nachal Realty desk.",
      path: "/insights",
      image: aerial,
      imageAlt: "Aerial view of Montreal",
    }),
  component: Insights,
});

function Insights() {
  const { openConsult } = useFlows();
  return (
    <>
      <section className="bg-charcoal text-ivory pt-36 pb-24">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">Market Insights</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
              The Montreal market, <em className="text-gold not-italic">read closely.</em>
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-6">
            <p className="text-ivory/70 leading-relaxed">
              A quarterly perspective from the Nachal Realty desk — pricing, inventory, and where
              the smart capital is moving.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-90">
          <SectionReveal className="mb-12">
            <article className="relative grid lg:grid-cols-12 gap-10 items-center bg-linen p-10 md:p-16">
              <img src={aerial} alt="" className="lg:col-span-6 aspect-[4/3] object-cover w-full" />
              <div className="lg:col-span-6">
                <div className="eyebrow text-gold">Featured · Q4 2026</div>
                <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">
                  The Montreal Real Estate Letter — Year in Review
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Twelve months of pricing, ten neighborhoods at the center of the story, and a
                  candid forecast for the year ahead.
                </p>
                <button
                  onClick={openConsult}
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
                >
                  Request the Letter <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          </SectionReveal>

          <StaggerGroup className="grid md:grid-cols-2 gap-8 mt-8">
            {insights.map((it) => (
              <StaggerItem key={it.title}>
                <article className="bg-card border border-border p-10 h-full hover:shadow-card transition-shadow">
                  <div className="eyebrow text-gold">{it.tag}</div>
                  <h3 className="font-display text-2xl mt-4 leading-snug">{it.title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{it.excerpt}</p>
                  <button
                    onClick={openConsult}
                    className="mt-6 text-[0.7rem] tracking-[0.22em] uppercase gold-underline inline-flex items-center gap-1"
                  >
                    Read Brief <ArrowUpRight size={12} />
                  </button>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-24">
        <div className="container-90 text-center max-w-3xl mx-auto">
          <SectionReveal>
            <div className="eyebrow text-gold mb-4">Stay close to the market</div>
            <h2 className="font-display text-5xl">Get our quarterly briefing.</h2>
            <p className="mt-5 text-ivory/70">
              Pricing, inventory, and what we're watching — delivered four times a year.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton variant="gold" onClick={openConsult}>
                Subscribe via Consultation
              </CTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
