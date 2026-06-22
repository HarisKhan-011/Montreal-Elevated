import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    createSeo({
      title: "Contact Nachal Realty — Montreal Real Estate",
      description:
        "Book a Montreal real estate consultation, request a complimentary property valuation, or contact Eli Lallouz directly.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const { openConsult, openValuation } = useFlows();
  return (
    <>
      <section className="bg-charcoal text-ivory pt-36 pb-24">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-8">
            <div className="eyebrow text-gold mb-4">Contact</div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
              Let's <em className="text-gold not-italic">talk.</em>
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-6">
            <p className="text-ivory/70 leading-relaxed">
              Book a 30-minute consultation, request a complimentary valuation, or send us a note.
              We respond within 24 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-90 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-5 space-y-10">
            <div>
              <div className="eyebrow text-gold mb-3">Direct</div>
              <a
                href="tel:+15145550100"
                className="flex items-center gap-4 py-4 border-b border-border hover:text-gold"
              >
                <Phone size={18} />
                <span className="font-display text-2xl">+1 (514) 555-0100</span>
              </a>
              <a
                href="mailto:hello@nachalrealty.com"
                className="flex items-center gap-4 py-4 border-b border-border hover:text-gold"
              >
                <Mail size={18} />
                <span className="font-display text-2xl">hello@nachalrealty.com</span>
              </a>
              <a
                href="https://linkedin.com/in/eli-lallouz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 py-4 border-b border-border hover:text-gold"
              >
                <Linkedin size={18} />
                <span className="font-display text-2xl">Eli Lallouz</span>
              </a>
              <div className="flex items-start gap-4 py-4">
                <MapPin size={18} className="mt-1.5" />
                <span className="font-display text-2xl leading-snug">
                  1 Place Ville Marie
                  <br />
                  Montréal, QC H3B 2A7
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <CTAButton variant="gold" onClick={openConsult}>
                Book Consultation
              </CTAButton>
              <CTAButton variant="dark" onClick={openValuation}>
                Free Valuation
              </CTAButton>
            </div>
          </SectionReveal>
          <SectionReveal className="lg:col-span-7" delay={0.1}>
            <div className="aspect-[4/3] bg-charcoal/5 border border-border overflow-hidden">
              <iframe
                title="Nachal Realty Montréal office"
                src="https://www.google.com/maps?q=1+Place+Ville+Marie,+Montreal&output=embed"
                className="size-full"
                loading="lazy"
              />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              By appointment only. Office visits arranged after initial consultation.
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
