import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";

export function MetricCounter({ to, suffix = "", prefix = "", label }: { to: number; suffix?: string; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="space-y-2">
      <motion.div className="font-display text-5xl md:text-6xl text-foreground leading-none">
        {prefix}{n.toLocaleString()}{suffix}
      </motion.div>
      <div className="eyebrow text-slate-muted">{label}</div>
    </div>
  );
}
