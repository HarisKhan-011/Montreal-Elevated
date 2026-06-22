import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const v: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
};

export function SectionReveal({
  children, className = "", delay = 0, as: As = "div",
}: { children: ReactNode; className?: string; delay?: number; as?: any }) {
  const MotionAs = motion(As as any);
  return (
    <MotionAs
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={v}
      transition={{ delay }}
    >
      {children}
    </MotionAs>
  );
}

export function StaggerGroup({ children, className = "", stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={v}>
      {children}
    </motion.div>
  );
}
