import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '150+', label: 'Websites Sold' },
  { value: '80+', label: 'Active Agents' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Who We Are</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-glow-sm mb-6">
            About <span className="text-primary">Suri Agency</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Suri Agency is a cutting-edge digital agency specializing in 
            <strong className="text-foreground"> website selling</strong> and 
            <strong className="text-foreground"> agent-based sales solutions</strong>. 
            We connect businesses with premium digital assets and skilled sales agents 
            to accelerate growth in the modern marketplace.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass gradient-border rounded-xl p-6 text-center transition-all duration-700 
                         hover:box-glow hover:scale-105 cursor-default
                         ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary text-glow-sm mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
