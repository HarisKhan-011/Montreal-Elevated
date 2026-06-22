import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import type { Property } from "@/lib/data";
import { CTAButton } from "./CTAButton";

type FlowKind = null | "consult" | "valuation" | "viewing";
type Ctx = {
  openConsult: () => void;
  openValuation: () => void;
  openViewing: (p: Property) => void;
};
const FlowCtx = createContext<Ctx | null>(null);
export const useFlows = () => {
  const c = useContext(FlowCtx);
  if (!c) throw new Error("FlowProvider missing");
  return c;
};

export function FlowProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<FlowKind>(null);
  const [viewingProp, setViewingProp] = useState<Property | null>(null);
  return (
    <FlowCtx.Provider
      value={{
        openConsult: () => setKind("consult"),
        openValuation: () => setKind("valuation"),
        openViewing: (p) => { setViewingProp(p); setKind("viewing"); },
      }}
    >
      {children}
      <AnimatePresence>
        {kind && (
          <ModalShell onClose={() => setKind(null)} title={titleFor(kind)}>
            {kind === "consult" && <ConsultationFlow onClose={() => setKind(null)} />}
            {kind === "valuation" && <ValuationFlow onClose={() => setKind(null)} />}
            {kind === "viewing" && viewingProp && <ViewingFlow property={viewingProp} onClose={() => setKind(null)} />}
          </ModalShell>
        )}
      </AnimatePresence>
    </FlowCtx.Provider>
  );
}

const titleFor = (k: Exclude<FlowKind, null>) =>
  k === "consult" ? "Book a Consultation" : k === "valuation" ? "Request a Free Valuation" : "Book a Viewing";

function ModalShell({ children, onClose, title }: { children: ReactNode; onClose: () => void; title: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center bg-charcoal/70 backdrop-blur-sm p-0 md:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog" aria-modal aria-label={title}
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full md:max-w-2xl bg-ivory text-foreground max-h-[100svh] md:max-h-[90svh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ivory px-6 md:px-10 py-5">
          <div>
            <div className="eyebrow text-gold">Nachal Realty</div>
            <div className="font-display text-xl mt-1">{title}</div>
          </div>
          <button aria-label="Close" onClick={onClose} className="size-10 grid place-items-center hover:bg-muted">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 md:px-10 py-8 md:py-10">{children}</div>
      </motion.div>
    </motion.div>
  );
}

const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="eyebrow text-slate-muted">{label}</span>
    <input
      {...rest}
      className="mt-2 block w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base"
    />
  </label>
);
const Area = ({ label, ...rest }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <label className="block">
    <span className="eyebrow text-slate-muted">{label}</span>
    <textarea
      {...rest} rows={4}
      className="mt-2 block w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base resize-none"
    />
  </label>
);
const Chip = ({ active, children, ...rest }: { active: boolean; children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button" {...rest}
    className={`px-4 py-2.5 border text-xs tracking-[0.18em] uppercase transition-colors ${
      active ? "bg-charcoal text-ivory border-charcoal" : "bg-transparent text-foreground border-border hover:border-charcoal"
    }`}
  >{children}</button>
);

function StepHeader({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="eyebrow text-gold">Step {step} / {total}</div>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function Confirmation({ title, lines, onClose }: { title: string; lines: string[]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
      <div className="mx-auto size-14 rounded-full bg-gold/15 text-gold grid place-items-center mb-6">
        <Check size={26} />
      </div>
      <h3 className="font-display text-3xl">{title}</h3>
      <div className="hairline my-6 max-w-xs mx-auto" />
      <div className="space-y-2 text-sm text-muted-foreground">
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <CTAButton variant="gold" onClick={() => alert("Calendar invite generated (demo)")}>
          <Calendar size={14} /> Add to Calendar
        </CTAButton>
        <CTAButton variant="ghost" onClick={onClose}>Close</CTAButton>
      </div>
    </motion.div>
  );
}

/* ---------------- Consultation ---------------- */
function ConsultationFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    intent: "", propertyType: "", budget: "", neighborhoods: [] as string[],
    date: "", time: "", name: "", email: "", phone: "", message: "",
  });
  const set = (k: keyof typeof data, v: any) => setData((d) => ({ ...d, [k]: v }));
  const toggleN = (n: string) =>
    set("neighborhoods", data.neighborhoods.includes(n) ? data.neighborhoods.filter((x) => x !== n) : [...data.neighborhoods, n]);

  if (step === 5) {
    return (
      <Confirmation
        title="Thank you — we'll be in touch within 24 hours."
        lines={[
          `${data.intent} · ${data.propertyType || "—"}`,
          data.neighborhoods.length ? data.neighborhoods.join(" · ") : "",
          `${data.date} ${data.time}`,
          `${data.name} · ${data.email}`,
        ].filter(Boolean)}
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <StepHeader step={step} total={4} />
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl mb-6">What are you looking for?</h3>
              <div className="flex flex-wrap gap-2">
                {["Buying", "Selling", "Investing", "Property Valuation", "General Inquiry"].map((x) => (
                  <Chip key={x} active={data.intent === x} onClick={() => set("intent", x)}>{x}</Chip>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl mb-4">Property type</h3>
                <div className="flex flex-wrap gap-2">
                  {["Residential", "Commercial", "Multi-Family", "Land", "Luxury"].map((x) => (
                    <Chip key={x} active={data.propertyType === x} onClick={() => set("propertyType", x)}>{x}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-4">Budget range</h3>
                <div className="flex flex-wrap gap-2">
                  {["< $750K", "$750K – $1.5M", "$1.5M – $3M", "$3M – $6M", "$6M+"].map((x) => (
                    <Chip key={x} active={data.budget === x} onClick={() => set("budget", x)}>{x}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-4">Preferred neighborhoods</h3>
                <div className="flex flex-wrap gap-2">
                  {["Westmount","Outremont","Downtown","Old Montreal","Griffintown","Plateau","NDG","Hampstead","CSL","West Island","South Shore"].map((x) => (
                    <Chip key={x} active={data.neighborhoods.includes(x)} onClick={() => toggleN(x)}>{x}</Chip>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl">Preferred meeting time</h3>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Date" type="date" value={data.date} onChange={(e) => set("date", e.target.value)} />
                <div>
                  <span className="eyebrow text-slate-muted">Time</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Morning", "Afternoon", "Evening"].map((x) => (
                      <Chip key={x} active={data.time === x} onClick={() => set("time", x)}>{x}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl">Your details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Full name" value={data.name} onChange={(e) => set("name", e.target.value)} />
                <Field label="Email" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
                <Field label="Phone" type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <Area label="Message (optional)" value={data.message} onChange={(e) => set("message", e.target.value)} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-10 flex items-center justify-between">
        <button
          disabled={step === 1} onClick={() => setStep(step - 1)}
          className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.22em] uppercase disabled:opacity-30"
        ><ArrowLeft size={14} /> Back</button>
        <CTAButton variant="gold" onClick={() => setStep(step + 1)}>
          {step === 4 ? "Submit" : "Continue"} <ArrowRight size={14} />
        </CTAButton>
      </div>
    </>
  );
}

/* ---------------- Valuation ---------------- */
function ValuationFlow({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ address: "", type: "", size: "", year: "", condition: "", name: "", email: "", phone: "" });
  const set = (k: keyof typeof data, v: any) => setData((d) => ({ ...d, [k]: v }));
  if (done) return <Confirmation title="We'll prepare your valuation report." lines={[
    "Expect a comparative market analysis within 48 hours.",
    `${data.address || "Address pending"}`,
    `${data.name} · ${data.email}`,
  ]} onClose={onClose} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
      <Field label="Property address" required value={data.address} onChange={(e) => set("address", e.target.value)} />
      <div>
        <span className="eyebrow text-slate-muted">Property type</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Condo","House","Plex","Commercial","Land","Luxury"].map((x) => (
            <Chip key={x} active={data.type === x} onClick={() => set("type", x)}>{x}</Chip>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Approx. size (sqft)" value={data.size} onChange={(e) => set("size", e.target.value)} />
        <Field label="Year built" value={data.year} onChange={(e) => set("year", e.target.value)} />
        <div>
          <span className="eyebrow text-slate-muted">Condition</span>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Excellent","Good","Fair","To renovate"].map((x) => (
              <Chip key={x} active={data.condition === x} onClick={() => set("condition", x)}>{x}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Name" required value={data.name} onChange={(e) => set("name", e.target.value)} />
        <Field label="Email" type="email" required value={data.email} onChange={(e) => set("email", e.target.value)} />
        <Field label="Phone" type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <div className="pt-2"><CTAButton type="submit" variant="gold">Request Valuation <ArrowRight size={14} /></CTAButton></div>
    </form>
  );
}

/* ---------------- Viewing ---------------- */
function ViewingFlow({ property, onClose }: { property: Property; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "", date: "", time: "Afternoon" });
  const set = (k: keyof typeof data, v: any) => setData((d) => ({ ...d, [k]: v }));
  if (done) return <Confirmation title="Your viewing is requested." lines={[
    `${property.title} · ${property.address}`,
    `${data.date} · ${data.time}`,
    `We'll confirm by phone within 24 hours.`,
  ]} onClose={onClose} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
      <div className="border border-border bg-muted/40 p-4 flex items-center gap-4">
        <img src={property.image} alt="" className="size-16 object-cover" />
        <div>
          <div className="font-display text-lg leading-tight">{property.title}</div>
          <div className="text-xs text-muted-foreground">{property.address}, {property.neighborhood}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Name" required value={data.name} onChange={(e) => set("name", e.target.value)} />
        <Field label="Email" type="email" required value={data.email} onChange={(e) => set("email", e.target.value)} />
        <Field label="Phone" type="tel" required value={data.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Preferred date" type="date" value={data.date} onChange={(e) => set("date", e.target.value)} />
        <div>
          <span className="eyebrow text-slate-muted">Time</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Morning","Afternoon","Evening"].map((x) => (
              <Chip key={x} active={data.time === x} onClick={() => set("time", x)}>{x}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2"><CTAButton type="submit" variant="gold">Request Viewing <ArrowRight size={14} /></CTAButton></div>
    </form>
  );
}
