import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MontrealHero } from "@/components/site/MontrealHero";
import { PropertyTicker } from "@/components/site/PropertyTicker";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/site/SectionReveal";
import { Carousel } from "@/components/site/Carousel";
import { PropertyCard } from "@/components/site/PropertyCard";
import { MetricCounter } from "@/components/site/MetricCounter";
import { CTAButton } from "@/components/site/CTAButton";
import { useFlows } from "@/components/site/Flows";
import { properties, neighborhoods, services, testimonials } from "@/lib/data";
import { createSeo } from "@/lib/seo";
import aerial from "@/assets/montreal-aerial.jpg";
import founder from "@/assets/founder.jpg";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    createSeo({
      title: "Nachal Realty — Montreal Real Estate, Elevated",
      description:
        "A premium Montreal brokerage. Luxury, residential, commercial and investment real estate represented with discretion.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const { openConsult, openValuation, openViewing } = useFlows();
  const featured = properties.slice(0, 6);

  return (
    <>
      <MontrealHero onConsult={openConsult} />
      <PropertyTicker />

      {/* Trust strip */}
      <section className="bg-ivory">
        <div className="container-90 py-10 md:py-14 grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-8 items-center">
          {["Local Expertise", "Residential", "Commercial", "Investment", "Luxury"].map((t, i) => (
            <SectionReveal key={t} delay={i * 0.05} className="text-center eyebrow text-charcoal">
              {t}
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-linen">
        <div className="container-90 py-28 grid lg:grid-cols-12 gap-12">
          <SectionReveal className="lg:col-span-4">
            <div className="eyebrow text-gold">Our Philosophy</div>
          </SectionReveal>
          <SectionReveal className="lg:col-span-8" delay={0.1}>
            <p className="font-display text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.15] text-balance">
              Montreal is a city of <em className="text-gold not-italic">streets, not listings</em>{" "}
              — of stone, of light, of generations. We represent it the way it deserves to be
              represented: with depth, discretion, and an unhurried sense of craft.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Featured properties */}
      <section id="featured" className="bg-ivory py-28">
        <div className="container-90">
          <div className="flex items-end justify-between mb-12">
            <SectionReveal>
              <div className="eyebrow text-gold mb-3">Featured Properties</div>
              <h2 className="font-display text-5xl md:text-6xl">A curated selection.</h2>
            </SectionReveal>
            <SectionReveal className="hidden md:block">
              <Link
                to="/properties"
                className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
              >
                View All Properties
              </Link>
            </SectionReveal>
          </div>
          <Carousel slideClass="w-[88%] sm:w-[60%] lg:w-[32%]">
            {featured.map((p) => (
              <PropertyCard key={p.id} p={p} onViewing={openViewing} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Why pillars */}
      <section className="bg-charcoal text-ivory py-28 relative overflow-hidden">
        <motion.img
          src={aerial}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-15"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
        <div className="container-90 relative">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <SectionReveal className="lg:col-span-6">
              <div className="eyebrow text-gold mb-3">Why Nachal Realty</div>
              <h2 className="font-display text-5xl md:text-6xl">Four pillars. One standard.</h2>
            </SectionReveal>
            <SectionReveal className="lg:col-span-6 lg:pt-6" delay={0.1}>
              <p className="text-ivory/70 leading-relaxed text-lg">
                Real estate is a trust business. Our practice is built on local fluency, an
                entrepreneur's appetite for problem-solving, and a family legacy that runs deep in
                Montreal real estate.
              </p>
            </SectionReveal>
          </div>
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10">
            {[
              [
                "01",
                "Deep Local Knowledge",
                "Street by street, building by building — we know what you can't Google.",
              ],
              [
                "02",
                "Entrepreneurial Approach",
                "Eli's track record building Vision 770 brings operator-level rigor to every deal.",
              ],
              [
                "03",
                "Lallouz Real Estate Heritage",
                "Generations of Montreal real estate experience anchor every recommendation.",
              ],
              [
                "04",
                "End-to-End Service",
                "From first viewing to closing — and well after — represented with full continuity.",
              ],
            ].map(([n, t, b]) => (
              <StaggerItem key={n} className="bg-charcoal p-10">
                <div className="font-display text-gold text-3xl">{n}</div>
                <div className="font-display text-2xl mt-6">{t}</div>
                <p className="mt-4 text-sm text-ivory/65 leading-relaxed">{b}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              [400, "+", "Transactions Closed"],
              [1.2, "B", "Total Volume", "$"],
              [13, "", "Neighborhoods Covered"],
              [98, "%", "Client Satisfaction"],
            ].map((row, i) => (
              <StaggerItem key={i}>
                <MetricCounter
                  to={row[0] as number}
                  suffix={row[1] as string}
                  prefix={(row[3] as string) ?? ""}
                  label={row[2] as string}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ivory py-28">
        <div className="container-90">
          <div className="flex items-end justify-between mb-12">
            <SectionReveal>
              <div className="eyebrow text-gold mb-3">Services</div>
              <h2 className="font-display text-5xl md:text-6xl">Full-spectrum representation.</h2>
            </SectionReveal>
            <SectionReveal className="hidden md:block">
              <Link
                to="/services"
                className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
              >
                All Services
              </Link>
            </SectionReveal>
          </div>
          <Carousel slideClass="w-[88%] sm:w-[55%] lg:w-[32%]">
            {services.map((s, i) => (
              <article key={s.title} className="bg-linen p-10 h-full min-h-[280px] flex flex-col">
                <div className="font-display text-gold text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-2xl mt-6">{s.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.body}
                </p>
                <Link
                  to="/services"
                  className="mt-6 text-[0.7rem] tracking-[0.22em] uppercase gold-underline self-start"
                >
                  Learn More
                </Link>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-linen py-28">
        <div className="container-90">
          <div className="flex items-end justify-between mb-12">
            <SectionReveal>
              <div className="eyebrow text-gold mb-3">Neighborhoods</div>
              <h2 className="font-display text-5xl md:text-6xl">Where you live, matters.</h2>
            </SectionReveal>
            <SectionReveal className="hidden md:block">
              <Link
                to="/neighborhoods"
                className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
              >
                All Neighborhoods
              </Link>
            </SectionReveal>
          </div>
          <Carousel slideClass="w-[80%] sm:w-[48%] lg:w-[30%]">
            {neighborhoods.slice(0, 8).map((n) => (
              <Link key={n.slug} to="/neighborhoods" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={n.image}
                    alt={n.name}
                    loading="lazy"
                    className="size-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                    <div className="eyebrow text-gold mb-2">{n.range}</div>
                    <div className="font-display text-3xl">{n.name}</div>
                    <p className="mt-2 text-sm text-ivory/80 leading-snug">{n.vibe}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-ivory py-28">
        <div className="container-90 grid lg:grid-cols-12 gap-12 items-center">
          <SectionReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={founder}
                alt="Eli Lallouz"
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute -bottom-px -right-px bg-gold text-charcoal px-5 py-3 eyebrow">
                President
              </div>
            </div>
          </SectionReveal>
          <SectionReveal className="lg:col-span-7" delay={0.1}>
            <div className="eyebrow text-gold mb-4">Meet Eli Lallouz</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
              A builder's mindset, applied to real estate.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Founder &amp; CEO of Vision 770 Group, the growing optical chain with locations across
              Montreal including at Glen Hospital / MUHC, Eli brings an operator's rigor and an
              entrepreneur's instinct to every Nachal Realty mandate. The Lallouz family's roots in
              Montreal real estate run generations deep.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
              >
                Read his story
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-linen py-28">
        <div className="container-90">
          <SectionReveal className="mb-12">
            <div className="eyebrow text-gold mb-3">Testimonials</div>
            <h2 className="font-display text-5xl md:text-6xl max-w-3xl">What our clients say.</h2>
          </SectionReveal>
          <Carousel slideClass="w-[90%] sm:w-[60%] lg:w-[48%]">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="bg-ivory p-10 border-t-2 border-gold h-full">
                <Quote className="text-gold" size={28} />
                <p className="mt-6 font-display text-2xl leading-snug">"{t.quote}"</p>
                <footer className="mt-8 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </footer>
              </blockquote>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Free Valuation CTA */}
      <section className="bg-charcoal text-ivory py-28">
        <div className="container-90 grid lg:grid-cols-12 gap-12 items-center">
          <SectionReveal className="lg:col-span-7">
            <div className="eyebrow text-gold mb-4">Complimentary</div>
            <h2 className="font-display text-5xl md:text-6xl">
              What is your property worth, today?
            </h2>
            <p className="mt-6 text-ivory/70 max-w-xl">
              A no-obligation, comparative market analysis from a broker who actually walks the
              streets your home is on.
            </p>
          </SectionReveal>
          <SectionReveal className="lg:col-span-5" delay={0.1}>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <CTAButton variant="gold" onClick={openValuation}>
                Request Free Valuation
              </CTAButton>
              <CTAButton
                variant="outline"
                className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
                onClick={openConsult}
              >
                Book a Consultation
              </CTAButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
