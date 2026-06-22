import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import founder from "@/assets/founder.jpg";
import aerial from "@/assets/montreal-aerial.jpg";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/site/SectionReveal";
import { MetricCounter } from "@/components/site/MetricCounter";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import { Linkedin } from "lucide-react";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeo({
      title: "About Eli Lallouz — Nachal Realty Montreal",
      description:
        "Meet Eli Lallouz, President of Nachal Realty, entrepreneur, and steward of the Lallouz family's Montreal real estate legacy.",
      path: "/about",
      image: founder,
      imageAlt: "Eli Lallouz, President of Nachal Realty",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { openConsult } = useFlows();
  return (
    <>
      <section className="bg-charcoal text-ivory pt-36 pb-24 relative overflow-hidden">
        <motion.img
          src={aerial}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-20"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="container-90 grid lg:grid-cols-12 gap-12 relative">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">About · Eli Lallouz</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.8rem)] leading-[1.02]">
              A builder's mindset, applied to{" "}
              <em className="text-gold not-italic">Montreal real estate.</em>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-90 grid lg:grid-cols-12 gap-16 items-start">
          <SectionReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={founder}
                alt="Eli Lallouz, President of Nachal Realty"
                className="size-full object-cover"
              />
              <div className="absolute -bottom-px -right-px bg-gold text-charcoal px-5 py-3 eyebrow">
                President · Nachal Realty
              </div>
            </div>
            <a
              href="https://linkedin.com/in/eli-lallouz"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm gold-underline"
            >
              <Linkedin size={16} /> Connect with Eli on LinkedIn
            </a>
          </SectionReveal>

          <SectionReveal
            className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/85"
            delay={0.1}
          >
            <p>
              Eli Lallouz is the President of Nachal Realty and a Montreal-based serial
              entrepreneur. He is also Founder &amp; CEO of <strong>Vision 770 Group</strong>, the
              growing optical chain with locations across Montreal — including inside the Glen
              Hospital / MUHC.
            </p>
            <p>
              His track record building and scaling businesses across industries gives Nachal Realty
              an unusual operating edge: every mandate is approached with the same rigor,
              accountability, and long-term thinking that an entrepreneur brings to their own
              company.
            </p>
            <p>
              The Lallouz family's roots in Montreal real estate run generations deep — a quiet
              inheritance of relationships, neighborhood fluency, and a feel for the city that no
              algorithm can replicate.
            </p>
            <p>
              Eli studied at Cégep Édouard-Montpetit and is active across Montreal's professional
              community, with a 4,000+ network on LinkedIn.
            </p>
            <div className="pt-4">
              <CTAButton variant="gold" onClick={openConsult}>
                Book a Consultation with Eli
              </CTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="container-90">
          <SectionReveal className="mb-14">
            <div className="eyebrow text-gold mb-3">Mission &amp; Values</div>
            <h2 className="font-display text-5xl md:text-6xl max-w-3xl">
              Elevating the Montreal real estate experience.
            </h2>
          </SectionReveal>
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              ["Trust", "Transparent, measured, and accountable at every step."],
              ["Local Expertise", "Street-level fluency across Greater Montreal."],
              ["Innovation", "Entrepreneurial energy applied to a traditional industry."],
              ["Client-First", "Every recommendation is yours, not ours."],
            ].map(([t, b]) => (
              <StaggerItem key={t} className="bg-ivory p-10">
                <div className="font-display text-3xl text-gold">{t}</div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{b}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <StaggerItem>
              <MetricCounter to={20} suffix="+" label="Years in business" />
            </StaggerItem>
            <StaggerItem>
              <MetricCounter to={400} suffix="+" label="Transactions" />
            </StaggerItem>
            <StaggerItem>
              <MetricCounter to={13} label="Neighborhoods" />
            </StaggerItem>
            <StaggerItem>
              <MetricCounter to={4000} suffix="+" label="LinkedIn network" />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
