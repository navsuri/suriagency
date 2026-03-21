import HeroSphere from './HeroSphere';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Floating particles CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-12">
        <p className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-slide-up font-medium">
          Welcome to the Future
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground text-glow mb-4 animate-slide-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}>
          Suri
          <br />
          <span className="text-primary">Agency</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8 animate-slide-up"
           style={{ animationDelay: '0.4s', opacity: 0 }}>
          Premium Website Selling & Agent Solutions — Powering Your Digital Growth
        </p>
        <div className="animate-slide-up flex flex-col sm:flex-row items-center gap-4 justify-center" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <a href="#services"
             className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold 
                        text-sm tracking-wider uppercase transition-all duration-300 
                        hover:box-glow-hover hover:scale-105 box-glow">
            Explore Services
          </a>
          <a href="tel:+918427989180"
             className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/60 text-primary font-semibold 
                        text-sm tracking-wider uppercase transition-all duration-300 
                        hover:bg-primary/10 hover:box-glow-hover hover:scale-105 glass">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Now
          </a>
        </div>
      </div>

      {/* 3D Sphere */}
      <div className="relative z-10 w-full max-w-2xl mx-auto -mt-4">
        <HeroSphere />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-glow">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
