import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import bg from "@/assets/hero-bg-mountain.jpg";
import mid from "@/assets/hero-mid-heritage.png";
import fg from "@/assets/hero-fg-tower.png";
import { CTAButton } from "./CTAButton";

export function MontrealHero({ onConsult }: { onConsult: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-charcoal">
      {/* Mobile static */}
      <div className="absolute inset-0 md:hidden">
        <img src={bg} alt="Montreal skyline at golden hour" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal" />
      </div>

      {/* Desktop parallax */}
      <div className="absolute inset-0 hidden md:block">
        <motion.img style={{ y: yBg, scale: 1.1 }} src={bg} alt="Montreal skyline" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,169,96,0.22),transparent_55%)]" />
        <motion.img style={{ y: yMid }} src={mid} alt="" aria-hidden className="absolute inset-x-0 bottom-[18%] w-full object-contain opacity-70 mix-blend-multiply" />
        <motion.img style={{ y: yFg }} src={fg} alt="" aria-hidden className="absolute inset-x-0 bottom-0 w-full object-contain" />
        <motion.div style={{ opacity }} className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal" />
      </div>

      <div className="container-90 relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28 text-ivory">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="eyebrow text-gold mb-6">Nachal Realty · Montréal, QC</motion.div>
          <motion.h1
            className="font-display text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.95] max-w-5xl text-balance"
          >
            {"Montreal real estate,".split(" ").map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.3em]" variants={fadeUp}>{w}</motion.span>
            ))}
            <motion.span variants={fadeUp} className="inline-block italic text-gold">elevated.</motion.span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base md:text-lg text-ivory/75 leading-relaxed">
            A premium brokerage built on deep local fluency and the Lallouz family's generational ties to the city's most desirable addresses.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <CTAButton variant="gold" onClick={onConsult}>Book a Consultation</CTAButton>
            <CTAButton variant="outline" className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal" onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}>Explore Properties</CTAButton>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10 text-ivory/60 text-[0.7rem] tracking-[0.3em] uppercase"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}
      >Scroll</motion.div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as any } },
};
