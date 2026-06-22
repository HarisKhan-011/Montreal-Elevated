import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { services } from "@/lib/data";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    createSeo({
      title: "Montreal Real Estate Services — Nachal Realty",
      description:
        "Residential, luxury, commercial and multi-family representation, property valuation, advisory and pre-construction services across Montreal.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const { openConsult, openValuation } = useFlows();
  return (
    <>
      <section className="bg-charcoal text-ivory pt-36 pb-24">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">Services</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
              Full-spectrum <em className="text-gold not-italic">representation.</em>
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-6">
            <p className="text-ivory/70 leading-relaxed">
              From a first apartment to a generational estate or a commercial portfolio —
              represented with the same standard of care.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-90">
          <StaggerGroup className="grid md:grid-cols-2 gap-px bg-border">
            {services.map((s, i) => {
              const Icon = (Icons as any)[s.icon] ?? Icons.Sparkles;
              return (
                <StaggerItem key={s.title}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    className="bg-ivory p-12 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="text-gold" size={28} />
                      <span className="eyebrow text-slate-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl mt-8">{s.title}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed flex-1">{s.body}</p>
                    <button
                      onClick={openConsult}
                      className="mt-8 text-[0.7rem] tracking-[0.22em] uppercase gold-underline self-start"
                    >
                      Discuss This Service
                    </button>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-24">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-center">
          <SectionReveal className="lg:col-span-7">
            <h2 className="font-display text-5xl md:text-6xl">Not sure where to start?</h2>
            <p className="mt-5 text-ivory/70 max-w-xl">
              A 30-minute consultation will clarify the next step — buying, selling, valuing, or
              restructuring a portfolio.
            </p>
          </SectionReveal>
          <SectionReveal className="lg:col-span-5">
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <CTAButton variant="gold" onClick={openConsult}>
                Book a Consultation
              </CTAButton>
              <CTAButton
                variant="outline"
                className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
                onClick={openValuation}
              >
                Free Valuation
              </CTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
