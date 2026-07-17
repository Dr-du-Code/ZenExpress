import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NoiseOverlay = () => (
  <div 
    className="noise-overlay" 
    style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
  />
);

const Navbar = () => {
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <nav 
      ref={navRef}
      className={cn(
        "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-500 w-[95%] md:w-[90%] max-w-5xl",
        "bg-transparent text-[#F0EFF4] border border-transparent",
        "[&.nav-scrolled]:bg-[#0A0A14]/60 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-[#F0EFF4]/10 [&.nav-scrolled]:shadow-2xl"
      )}
    >
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1 text-[#F0EFF4] hover:text-[#7B61FF] transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="font-heading font-bold text-lg md:text-xl tracking-tight">ZenExpress</div>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#features" className="interactive-link hover:text-[#7B61FF]">Fonctionnalités</a>
        <a href="#protocol" className="interactive-link hover:text-[#7B61FF]">Protocole</a>
        <a href="#about" className="interactive-link hover:text-[#7B61FF]">Philosophie</a>
      </div>
      <button 
        onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
        className="magnetic-btn bg-[#7B61FF] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 group"
      >
        <span className="relative z-10 hidden sm:inline">Demander un dévis</span>
        <span className="relative z-10 sm:hidden">Dévis</span>
      </button>
    </nav>
    <div className={cn(
      "fixed inset-0 z-40 bg-[#0A0A14]/98 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500 md:hidden",
      mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7B61FF]/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col gap-8 text-center relative z-10 w-full px-8">
        <a 
          href="#features" 
          onClick={() => setMobileMenuOpen(false)} 
          className={cn(
            "font-heading font-bold text-4xl text-[#F0EFF4] transition-all duration-500 delay-100 hover:text-[#7B61FF]",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          Fonctionnalités
        </a>
        <a 
          href="#protocol" 
          onClick={() => setMobileMenuOpen(false)} 
          className={cn(
            "font-heading font-bold text-4xl text-[#F0EFF4] transition-all duration-500 delay-200 hover:text-[#7B61FF]",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          Protocole
        </a>
        <a 
          href="#about" 
          onClick={() => setMobileMenuOpen(false)} 
          className={cn(
            "font-heading font-bold text-4xl text-[#F0EFF4] transition-all duration-500 delay-300 hover:text-[#7B61FF]",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          Philosophie
        </a>
      </div>
      
      <div className={cn(
        "absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 transition-all duration-500 delay-500",
        mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        <p className="text-[#F0EFF4]/40 font-mono text-xs tracking-[0.3em] uppercase">ZenExpress • Dakar</p>
      </div>
    </div>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero_bg.webp" 
          alt="Equipe de livraison" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-elem font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F0EFF4]">
            ZenExpress <span className="whitespace-nowrap">au-delà</span> de
          </span>
          <span className="hero-elem font-dramatic italic text-7xl md:text-[8rem] lg:text-[10rem] leading-none text-[#7B61FF] pr-4">
            l'attente.
          </span>
        </h1>
        <p className="hero-elem mt-6 text-xl text-[#F0EFF4]/70 max-w-xl font-mono">
          Livraison rapide de colis en 2 heures à Dakar.
        </p>
        <div className="hero-elem mt-10">
          <button 
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn bg-[#7B61FF] text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 group overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">Demander un dévis</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 md:px-16 bg-[#0A0A14]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <MelangeurCard />
        <MachineAEcrireCard />
        <PlanificateurCard />
      </div>
    </section>
  );
};

const CardWrapper = ({ children, title, desc }) => (
  <div className="bg-[#18181B] border border-[#F0EFF4]/10 rounded-[2rem] p-8 shadow-2xl flex flex-col h-[400px]">
    <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-xl bg-[#0A0A14]/50 mb-6 border border-[#F0EFF4]/5">
      {children}
    </div>
    <div>
      <h3 className="font-heading font-semibold text-xl text-[#F0EFF4] mb-2">{title}</h3>
      <p className="text-[#F0EFF4]/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MelangeurCard = () => {
  const [items, setItems] = useState(['Expédition immédiate', 'Trajet optimisé', 'Remise en main propre']);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop());
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardWrapper title="Livraison rapide" desc="Une chorégraphie logistique pour vos colis, assurant une livraison en 2 heures.">
      <div className="relative w-full h-full flex items-center justify-center">
        {items.map((item, i) => (
          <div 
            key={item}
            className="absolute bg-[#18181B] border border-[#7B61FF]/30 text-[#7B61FF] px-6 py-3 rounded-full font-mono text-[11px] transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap shadow-lg"
            style={{
              transform: `translateY(${(i - 1) * 60}px) scale(${1 - Math.abs(i - 1) * 0.15})`,
              opacity: 1 - Math.abs(i - 1) * 0.4,
              zIndex: 10 - Math.abs(i - 1)
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};

const MachineAEcrireCard = () => {
  const textToType = "INITIALISATION DU SUIVI...\nCOLIS LOCALISÉ: DAKAR\nSTATUS: EN TRANSIT\nARRIVÉE: < 2H\nSERVICE PRO. ACTIF.";
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(textToType.slice(0, i));
      i++;
      if (i > textToType.length + 20) i = 0;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardWrapper title="Service professionnel" desc="Suivi en temps réel de votre colis avec une précision télémétrique absolue.">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#7B61FF] animate-[pulse_2s_infinite]" />
        <span className="text-[9px] uppercase font-mono text-[#7B61FF]">Flux en direct</span>
      </div>
      <div className="w-full p-6 text-left mt-4">
        <pre className="font-mono text-[11px] text-[#F0EFF4]/80 whitespace-pre-wrap leading-loose">
          {displayedText}
          <span className="inline-block w-2 h-3.5 bg-[#7B61FF] ml-1 animate-pulse align-middle" />
        </pre>
      </div>
    </CardWrapper>
  );
};

const PlanificateurCard = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set('.cursor-svg', { x: 0, y: 0, scale: 1 });
      tl.set('.cell-active', { backgroundColor: 'transparent', borderColor: 'rgba(240, 239, 244, 0.1)' });
      tl.set('.save-btn', { backgroundColor: 'transparent', color: '#7B61FF' });
      
      tl.to('.cursor-svg', { x: 70, y: 35, duration: 1, ease: 'power2.inOut' });
      tl.to('.cursor-svg', { scale: 0.8, duration: 0.1 });
      tl.to('.cell-active', { backgroundColor: '#7B61FF', borderColor: '#7B61FF', duration: 0.1 });
      tl.to('.cursor-svg', { scale: 1, duration: 0.1 });
      
      tl.to('.cursor-svg', { x: 120, y: 110, duration: 1, ease: 'power2.inOut', delay: 0.3 });
      tl.to('.cursor-svg', { scale: 0.8, duration: 0.1 });
      tl.to('.save-btn', { backgroundColor: '#7B61FF', color: '#fff', duration: 0.1 });
      tl.to('.cursor-svg', { scale: 1, duration: 0.1 });
      
      tl.to('.cursor-svg', { opacity: 0, duration: 0.3, delay: 0.5 });
      tl.to('.cell-active', { backgroundColor: 'transparent', borderColor: 'rgba(240, 239, 244, 0.1)', duration: 0.3 }, "<");
      tl.to('.cursor-svg', { opacity: 1, duration: 0.1, x: 0, y: 0 });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <CardWrapper title="Service client 24/7" desc="Notre équipe est disponible à tout moment pour vous assister.">
      <div ref={svgRef} className="relative w-full h-full flex flex-col items-center justify-center p-6">
        <div className="grid grid-cols-7 gap-1.5 mb-8 relative">
          {days.map((d, i) => (
            <div key={i} className={cn(
              "w-7 h-7 rounded border border-[#F0EFF4]/10 flex items-center justify-center text-[9px] font-mono text-[#F0EFF4]/40 transition-colors",
              i === 3 ? "cell-active" : ""
            )}>
              {d}
            </div>
          ))}
          <svg className="cursor-svg absolute top-0 left-0 w-5 h-5 text-[#F0EFF4] drop-shadow-xl z-10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor"/>
          </svg>
        </div>
        <div className="save-btn px-5 py-2 rounded-full border border-[#7B61FF] text-[#7B61FF] text-[10px] font-mono transition-colors">
          CONFIRMER
        </div>
      </div>
    </CardWrapper>
  );
};

const Philosophie = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-word', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      });
      gsap.from('.phil-massive', {
        scrollTrigger: {
          trigger: '.phil-massive',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  const part1 = "La plupart des services de livraison se concentrent sur : un transit imprévisible.".split(" ");

  return (
    <section id="about" className="relative w-full py-48 px-6 md:px-16 bg-[#0A0A14] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Texture organique" className="w-full h-full object-cover" />
      </div>
      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="text-xl md:text-2xl text-[#F0EFF4]/60 font-heading mb-12 leading-relaxed max-w-3xl mx-auto">
          {part1.map((word, i) => (
            <span key={i} className="phil-word inline-block mr-2">{word}</span>
          ))}
        </p>
        <h2 className="phil-massive font-dramatic italic text-5xl md:text-7xl lg:text-8xl text-[#F0EFF4] leading-tight">
          Nous nous concentrons sur : <br className="hidden md:block"/>
          <span className="text-[#7B61FF]">la vitesse absolue.</span>
        </h2>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 10%',
            end: 'bottom 10%',
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
          scale: 0.85,
          y: -30,
          opacity: 0.2,
          filter: 'blur(16px)',
          ease: 'none'
        });
      });
      
      ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: 'top 10%',
        end: '+=50%',
        pin: true,
        pinSpacing: true
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Réception', desc: 'Prise en charge instantanée de la requête.', Visual: PVisual1 },
    { num: '02', title: 'Transit', desc: 'Acheminement ultra-rapide par notre réseau.', Visual: PVisual2 },
    { num: '03', title: 'Livraison', desc: 'Confirmation de remise sécurisée.', Visual: PVisual3 },
  ];

  return (
    <section id="protocol" ref={containerRef} className="bg-[#0A0A14] py-10">
      {steps.map((step, i) => (
        <div key={i} className="protocol-card w-full h-[90vh] md:h-[100vh] flex items-start justify-center px-6 md:px-16 pt-[5vh] md:pt-[10vh]">
          <div className="w-full max-w-5xl h-[70vh] max-h-[600px] bg-[#18181B] rounded-[3rem] border border-[#F0EFF4]/10 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
            <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center relative z-10 border-b md:border-b-0 md:border-r border-[#F0EFF4]/5">
              <span className="font-mono text-[#7B61FF] text-lg md:text-xl mb-4 md:mb-6">{step.num}</span>
              <h3 className="font-heading font-bold text-3xl md:text-5xl text-[#F0EFF4] mb-3 md:mb-4">{step.title}</h3>
              <p className="text-[#F0EFF4]/60 text-base md:text-lg leading-relaxed">{step.desc}</p>
            </div>
            <div className="w-full md:w-1/2 bg-[#0A0A14]/80 flex items-center justify-center relative overflow-hidden py-10 md:py-0">
               <step.Visual />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const PVisual1 = () => (
  <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center">
    <div className="absolute inset-0 border-[1px] border-[#7B61FF]/20 rounded-full animate-[spin_12s_linear_infinite]" />
    <div className="absolute inset-4 md:inset-8 border-[1px] border-[#7B61FF]/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
    <div className="absolute inset-8 md:inset-16 border-[1px] border-[#7B61FF]/60 rounded-full animate-[spin_4s_linear_infinite]" />
    <div className="absolute inset-0 bg-gradient-to-tr from-[#7B61FF]/5 to-transparent rounded-full mix-blend-overlay" />
  </div>
);

const PVisual2 = () => (
  <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16">
    <div className="w-full h-16 md:h-24 flex gap-2 md:gap-3 relative overflow-hidden bg-[#18181B]/50 p-3 md:p-4 rounded-xl border border-[#F0EFF4]/5">
       {Array.from({length: 12}).map((_, i) => (
         <div key={i} className="flex-1 bg-[#F0EFF4]/10 rounded-sm" />
       ))}
       <div className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-[#7B61FF]/50 to-transparent blur-sm animate-[scan_2.5s_ease-in-out_infinite_alternate]" />
       <style>{`@keyframes scan { 0% { left: -10%; } 100% { left: 110%; transform: translateX(-100%); } }`}</style>
    </div>
  </div>
);

const PVisual3 = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 100" className="w-full px-8 md:px-16 stroke-[#7B61FF] stroke-[2] fill-none drop-shadow-[0_0_15px_rgba(123,97,255,0.6)]">
      <path 
        d="M 0 50 L 60 50 L 70 20 L 90 90 L 110 10 L 130 70 L 140 50 L 200 50" 
        strokeDasharray="400"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[dash_3s_linear_infinite]"
      />
    </svg>
    <style>{`@keyframes dash { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }`}</style>
  </div>
);

const CtaForm = ({ setShowForm, setSubmitted }) => {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-elem', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ctx = gsap.context(() => {
      gsap.to('.form-elem', {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => setSubmitted(true)
      });
    }, formRef);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="text-center mb-4 form-elem">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F0EFF4] mb-2">Initialisation du dévis</h2>
        <p className="text-[#F0EFF4]/60 font-mono text-sm">Veuillez renseigner les coordonnées de la livraison.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 form-elem">
          <label className="text-[#F0EFF4]/80 text-sm font-medium">Prénom et Nom</label>
          <input required type="text" placeholder="Ex: Jean Ndiaye" className="bg-[#0A0A14] border border-[#F0EFF4]/10 rounded-xl px-4 py-3 text-[#F0EFF4] focus:outline-none focus:border-[#7B61FF] transition-all hover:border-[#7B61FF]/50" />
        </div>
        <div className="flex flex-col gap-2 form-elem">
          <label className="text-[#F0EFF4]/80 text-sm font-medium">Téléphone</label>
          <input required type="tel" placeholder="Ex: +221 77 123 45 67" className="bg-[#0A0A14] border border-[#F0EFF4]/10 rounded-xl px-4 py-3 text-[#F0EFF4] focus:outline-none focus:border-[#7B61FF] transition-all hover:border-[#7B61FF]/50" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 form-elem">
          <label className="text-[#F0EFF4]/80 text-sm font-medium">Lieu de livraison</label>
          <input required type="text" placeholder="Ex: Plateau, Dakar" className="bg-[#0A0A14] border border-[#F0EFF4]/10 rounded-xl px-4 py-3 text-[#F0EFF4] focus:outline-none focus:border-[#7B61FF] transition-all hover:border-[#7B61FF]/50" />
        </div>
        <div className="flex flex-col gap-2 form-elem">
          <label className="text-[#F0EFF4]/80 text-sm font-medium">Budget estimé (FCFA)</label>
          <input required type="number" placeholder="Ex: 5000" className="bg-[#0A0A14] border border-[#F0EFF4]/10 rounded-xl px-4 py-3 text-[#F0EFF4] focus:outline-none focus:border-[#7B61FF] transition-all hover:border-[#7B61FF]/50" />
        </div>
      </div>

      <div className="flex flex-col gap-2 form-elem">
        <label className="text-[#F0EFF4]/80 text-sm font-medium">Que voulez-vous livrer ?</label>
        <input required type="text" placeholder="Ex: Documents confidentiels, Colis fragile..." className="bg-[#0A0A14] border border-[#F0EFF4]/10 rounded-xl px-4 py-3 text-[#F0EFF4] focus:outline-none focus:border-[#7B61FF] transition-all hover:border-[#7B61FF]/50" />
      </div>
      
      <div className="mt-2 flex gap-4 form-elem">
        <button 
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 py-3 md:py-4 rounded-xl text-[#F0EFF4]/60 hover:text-[#F0EFF4] hover:bg-[#F0EFF4]/5 transition-colors font-semibold"
        >
          Annuler
        </button>
        <button 
          type="submit"
          className="flex-[2] bg-[#7B61FF] text-white py-3 md:py-4 rounded-xl font-semibold shadow-lg shadow-[#7B61FF]/20 hover:shadow-[#7B61FF]/40 transition-all transform hover:scale-[1.02]"
        >
          Confirmer la demande
        </button>
      </div>
    </form>
  );
};

const CtaSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cta" className="py-20 md:py-40 px-6 bg-[#0A0A14] flex justify-center items-center min-h-[80vh]">
      <div className="bg-[#18181B] border border-[#F0EFF4]/10 rounded-[3rem] p-8 md:p-20 w-full max-w-4xl relative overflow-hidden shadow-[0_0_50px_rgba(123,97,255,0.05)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-transparent opacity-80 pointer-events-none" />
        
        {!showForm ? (
          <div className="text-center">
            <h2 className="relative z-10 font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EFF4] mb-8 tracking-tight">
              Prêt à accélérer ?
            </h2>
            <button 
              onClick={() => setShowForm(true)}
              className="magnetic-btn relative z-10 bg-[#7B61FF] text-white px-10 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-3 group mx-auto"
            >
              <span>Demander un dévis</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : submitted ? (
          <div className="text-center relative z-10" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="w-20 h-20 bg-[#7B61FF]/20 text-[#7B61FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F0EFF4] mb-4">
              Demande envoyée !
            </h2>
            <p className="text-[#F0EFF4]/60 text-lg">
              Notre équipe vous contactera dans les plus brefs délais.
            </p>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          </div>
        ) : (
          <CtaForm setShowForm={setShowForm} setSubmitted={setSubmitted} />
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#0A0A14] pt-10">
    <div className="bg-[#18181B] rounded-t-[4rem] px-8 md:px-20 py-16 md:py-24 border-t border-[#F0EFF4]/5">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8">
        
        <div className="md:col-span-2 order-last md:order-first">
          <div className="font-heading font-bold text-3xl tracking-tight text-[#F0EFF4] mb-4">ZenExpress</div>
          <p className="text-[#F0EFF4]/50 font-mono text-sm max-w-xs mb-8 leading-relaxed">
            Livraison rapide de colis en 2 heures à Dakar.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#0A0A14] px-4 py-2.5 rounded-full border border-[#F0EFF4]/10">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="font-mono text-xs text-[#F0EFF4]/70 tracking-widest">SYSTÈME OPÉRATIONNEL</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 order-first md:order-none">
          <h4 className="font-heading font-semibold text-[#F0EFF4] mb-3">Navigation</h4>
          <a href="#features" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">Fonctionnalités</a>
          <a href="#protocol" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">Protocole</a>
          <a href="#about" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">Philosophie</a>
        </div>

        <div className="flex flex-col gap-4 order-2 md:order-none">
          <h4 className="font-heading font-semibold text-[#F0EFF4] mb-3">Légal</h4>
          <a href="#" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">Mentions Légales</a>
          <a href="#" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">Confidentialité</a>
          <a href="#" className="text-[#F0EFF4]/60 hover:text-[#7B61FF] transition-colors text-sm">CGV</a>
        </div>
        
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="bg-[#0A0A14] text-[#F0EFF4] min-h-screen selection:bg-[#7B61FF]/30">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Philosophie />
      <Protocol />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default App;
