import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-primary text-glow-sm tracking-wider">SURI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Getting started
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Components
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/40 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Getting started
            </a>
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Components
            </a>
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </a>
            <div className="flex flex-col gap-2 pt-3 border-t border-border/40">
              <Button variant="ghost" size="sm" className="w-full">
                Sign in
              </Button>
              <Button variant="default" size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(() => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 mb-8 hover:border-primary/60 transition-all animate-slide-up"
        >
          <span className="text-xs text-muted-foreground">New version of template is out!</span>
          <span className="flex items-center gap-1 text-xs text-primary font-semibold">
            Read more
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </a>

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground text-glow mb-6 leading-tight animate-slide-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Give your big idea
          <br />
          the <span className="text-primary">website</span> it deserves
        </h1>

        {/* Subheading */}
        <p
          className="text-muted-foreground text-base md:text-lg max-w-2xl mb-8 animate-slide-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Landing page kit template with React, Shadcn/ui and Tailwind that you can copy/paste into your project.
        </p>

        {/* CTA */}
        <div className="animate-slide-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <Button size="lg" className="box-glow hover:box-glow-hover hover:scale-105 transition-all">
            Get started
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Decorative panels */}
        <div
          className="grid grid-cols-2 gap-4 mt-16 w-full max-w-3xl animate-slide-up"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <div className="aspect-video rounded-xl glass gradient-border box-glow" />
          <div className="aspect-video rounded-xl glass gradient-border box-glow" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// Main Component
export default function SaaSTemplate() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <Hero />
    </div>
  );
}
