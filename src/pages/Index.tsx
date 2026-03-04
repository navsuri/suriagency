import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />

      {/* Footer */}
      <footer className="py-10 text-center border-t border-border/30">
        <p className="text-muted-foreground text-sm">
          © 2026 <span className="text-primary font-semibold">ADN Marketer Agency</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
