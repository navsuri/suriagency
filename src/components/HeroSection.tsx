import { lazy, Suspense } from 'react';
const HeroSphere = lazy(() => import('./HeroSphere'));

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
          <a href="https://wa.me/918427989180"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/60 text-primary font-semibold 
                        text-sm tracking-wider uppercase transition-all duration-300 
                        hover:bg-primary/10 hover:box-glow-hover hover:scale-105 glass">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Call Now
          </a>
        </div>
      </div>

      {/* 3D Sphere */}
      <div className="relative z-10 w-full max-w-2xl mx-auto -mt-4">
        <Suspense fallback={<div className="w-full h-[500px] md:h-[600px]" />}>
          <HeroSphere />
        </Suspense>
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
