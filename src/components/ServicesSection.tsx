import { useEffect, useRef, useState } from 'react';
import { Globe, Users, Zap } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Selling',
    description:
      'We build, curate, and sell high-converting websites tailored for any industry. From e-commerce stores to SaaS platforms — get a ready-to-launch digital asset.',
  },
  {
    icon: Users,
    title: 'Agent Selling',
    description:
      'Access our network of trained sales agents who represent your brand, close deals, and drive revenue. Scale your sales force without the overhead.',
  },
  {
    icon: Zap,
    title: 'Digital Solutions',
    description:
      'End-to-end digital strategy including branding, marketing funnels, and automation. We power your online presence with cutting-edge technology.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 px-4 relative">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-glow-sm">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group glass gradient-border rounded-2xl p-8 transition-all duration-700 
                         hover:box-glow hover:-translate-y-2 cursor-default
                         ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${0.2 + i * 0.2}s`,
                perspective: '1000px',
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 
                            group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-glow-sm transition-all">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Bottom glow line */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent 
                            group-hover:via-primary/80 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
