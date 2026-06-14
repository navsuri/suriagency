import React from "react";
import { ArrowRight, ArrowDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Scoped theme — applied only to this page so it doesn't affect the rest of the app
const ThemeScope: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="saas-template min-h-screen bg-[hsl(var(--st-bg))] text-[hsl(var(--st-fg))] overflow-x-hidden"
    style={
      {
        // Scoped CSS vars (HSL)
        ["--st-bg" as any]: "150 30% 4%",
        ["--st-fg" as any]: "0 0% 100%",
        ["--st-muted" as any]: "150 8% 65%",
        ["--st-border" as any]: "150 15% 14%",
        ["--st-glow" as any]: "152 76% 50%",
        ["--st-glow-soft" as any]: "152 76% 40%",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      } as React.CSSProperties
    }
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

      .saas-template * { font-family: 'Inter', system-ui, sans-serif; }

      .saas-template .st-glass {
        background: hsl(var(--st-bg) / 0.6);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid hsl(var(--st-border) / 0.8);
      }

      .saas-template .st-green-glow {
        background:
          radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--st-glow) / 0.55), transparent 70%),
          radial-gradient(ellipse 60% 40% at 50% 90%, hsl(var(--st-glow) / 0.35), transparent 70%);
      }

      .saas-template .st-cta {
        background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 60%, #d1d5db 100%);
        color: #000;
        box-shadow: 0 8px 24px hsl(var(--st-glow) / 0.25), 0 0 0 1px rgba(255,255,255,0.1);
      }
      .saas-template .st-cta:hover { transform: translateY(-1px) scale(1.02); }

      .saas-template .st-cta-green {
        background: linear-gradient(180deg, hsl(var(--st-glow)) 0%, hsl(var(--st-glow-soft)) 100%);
        color: #052e1a;
        box-shadow: 0 10px 30px hsl(var(--st-glow) / 0.45);
      }

      @keyframes st-fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes st-fade-down {
        from { opacity: 0; transform: translateY(-12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes st-pulse-glow {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.04); }
      }
      .saas-template .st-anim-up { animation: st-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
      .saas-template .st-anim-down { animation: st-fade-down 0.6s ease-out both; }
      .saas-template .st-anim-pulse { animation: st-pulse-glow 6s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .saas-template .st-anim-up,
        .saas-template .st-anim-down,
        .saas-template .st-anim-pulse { animation: none !important; }
      }
    `}</style>
    {children}
  </div>
);

// Navigation
const Navigation = React.memo(() => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl st-glass rounded-full st-anim-down">
      <div className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[hsl(var(--st-glow))] flex items-center justify-center text-[hsl(var(--st-bg))] font-black text-sm">
            S
          </div>
          <span className="text-sm font-bold tracking-wide">SURI</span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          <a href="#" className="text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] transition-colors">
            Find talent
          </a>
          <a href="#" className="text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] transition-colors">
            About
          </a>
          <a href="#" className="text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] transition-colors">
            Customers
          </a>
          <a href="#" className="text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] transition-colors">
            Pricing
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] transition-colors px-3 py-1.5">
            Log in →
          </button>
          <button className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            Get started
          </button>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[hsl(var(--st-border))] px-5 py-4 space-y-3 st-anim-down">
          {["Find talent", "About", "Customers", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm text-[hsl(var(--st-muted))] hover:text-[hsl(var(--st-fg))] py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-[hsl(var(--st-border))]">
            <Button variant="ghost" size="sm" className="w-full justify-center text-[hsl(var(--st-fg))] hover:bg-white/10">
              Log in
            </Button>
            <button className="w-full text-sm font-medium px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
});
Navigation.displayName = "Navigation";

// Hero
const Hero = React.memo(() => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
      {/* Green gradient glow at bottom (Topflow style) */}
      <div className="absolute inset-x-0 bottom-0 h-[70vh] st-green-glow st-anim-pulse pointer-events-none" />

      {/* Subtle vertical bars effect */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh] opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 38px, hsl(var(--st-bg) / 0.6) 38px, hsl(var(--st-bg) / 0.6) 40px)",
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-6 st-anim-up"
          style={{ animationDelay: "0.1s" }}
        >
          Hire the top 1% of
          <br />
          Webflow freelancers
        </h1>

        <p
          className="text-base md:text-lg text-[hsl(var(--st-muted))] max-w-md mb-10 st-anim-up"
          style={{ animationDelay: "0.3s" }}
        >
          Tell us your requirement and we'll match you with a vetted Webflow expert in less than{" "}
          <span className="text-[hsl(var(--st-fg))] font-semibold">48 hours.</span>
        </p>

        <div
          className="flex items-center gap-6 st-anim-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button className="st-cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all">
            <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <ArrowRight size={12} className="text-white" />
            </span>
            Find talent
          </button>
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--st-fg))] hover:text-[hsl(var(--st-glow))] transition-colors">
            Learn more
            <ArrowDown size={14} />
          </button>
        </div>

        {/* Trust strip */}
        <div
          className="mt-24 flex flex-col items-center gap-5 st-anim-up"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-xs text-[hsl(var(--st-muted))]">
            Trusted by <span className="text-[hsl(var(--st-fg))] font-semibold">400+ companies</span>
          </p>
          <div className="flex items-center gap-8 md:gap-12 opacity-70 flex-wrap justify-center">
            {["zapier", "Webflow", "slack", "HubSpot", "fiverr."].map((logo) => (
              <span key={logo} className="text-sm md:text-base font-bold text-[hsl(var(--st-fg))]">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

export default function SaaSTemplate() {
  return (
    <ThemeScope>
      <Navigation />
      <Hero />
    </ThemeScope>
  );
}
