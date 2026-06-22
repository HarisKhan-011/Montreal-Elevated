import { Link } from "@tanstack/react-router";
import { Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useFlows } from "./Flows";
import { neighborhoods } from "@/lib/data";

export function Footer() {
  const { openConsult } = useFlows();
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-90 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="font-display text-3xl">
              Let's open <em className="text-gold not-italic font-display">the right door.</em>
            </div>
            <p className="mt-5 text-ivory/70 max-w-md leading-relaxed">
              Premium real estate services across Greater Montreal. Buying, selling, investing — represented with discretion and rigor.
            </p>
            <div className="mt-8"><CTAButton variant="gold" onClick={openConsult}>Book a Consultation</CTAButton></div>
          </div>
          <div className="lg:col-span-3 space-y-3">
            <div className="eyebrow text-gold">Contact</div>
            <a href="tel:+15145550100" className="flex items-center gap-3 text-sm hover:text-gold"><Phone size={14} /> +1 (514) 555-0100</a>
            <a href="mailto:hello@nachalrealty.com" className="flex items-center gap-3 text-sm hover:text-gold"><Mail size={14} /> hello@nachalrealty.com</a>
            <a href="https://linkedin.com/in/eli-lallouz" className="flex items-center gap-3 text-sm hover:text-gold" target="_blank" rel="noreferrer"><Linkedin size={14} /> Eli Lallouz</a>
            <div className="flex items-start gap-3 text-sm text-ivory/70"><MapPin size={14} className="mt-1" /> 1 Place Ville Marie, Montréal, QC</div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            <div className="eyebrow text-gold">Explore</div>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                ["/properties","Properties"],["/services","Services"],
                ["/neighborhoods","Neighborhoods"],["/about","About Eli"],
                ["/insights","Market Insights"],["/contact","Contact"],
              ].map(([to,label]) => (
                <li key={to}><Link to={to as any} className="hover:text-gold transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="eyebrow text-ivory/50 mb-4">Neighborhoods we know intimately</div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ivory/70">
          {neighborhoods.map((n) => (
            <Link key={n.slug} to="/neighborhoods" className="hover:text-gold">{n.name}</Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} Nachal Realty. All rights reserved.</div>
          <div>
            This website is powered by{" "}
            <a href="https://theinnovations.tech/" target="_blank" rel="noreferrer" className="text-gold hover:underline">The Innovations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
