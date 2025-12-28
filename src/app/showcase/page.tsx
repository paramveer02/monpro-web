"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import BlueprintTransition from "@/components/showcase/BlueprintTransition";
import SystemPulse from "@/components/showcase/SystemPulse";
import ScaleAuditBento from "@/components/showcase/ScaleAuditBento";
import DigitalFactoryHero from "@/components/showcase/DigitalFactoryHero";

/* ---------------------------- SCROLLY WRAPPER ---------------------------- */

type ThemeKey = "blueprint" | "dawn" | "signal" | "warm" | "daylight";

function ScrollySection({
  id,
  children,
  height = "140vh",
  theme = "blueprint",
}: {
  id: string;
  children: React.ReactNode;
  height?: string;
  theme?: ThemeKey;
}) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0.5] }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const themeMap: Record<
    ThemeKey,
    { border: string; bg: string; title: string; label: string; soft: string }
  > = {
    blueprint: {
      border: "border-cyan-400/20",
      bg: "bg-black/20",
      title: "text-white",
      label: "text-cyan-200/70",
      soft: "bg-cyan-400/5",
    },
    dawn: {
      border: "border-indigo-400/20",
      bg: "bg-black/18",
      title: "text-white",
      label: "text-indigo-200/70",
      soft: "bg-indigo-400/5",
    },
    signal: {
      border: "border-emerald-400/20",
      bg: "bg-black/16",
      title: "text-white",
      label: "text-emerald-200/70",
      soft: "bg-emerald-400/5",
    },
    warm: {
      border: "border-amber-400/25",
      bg: "bg-black/14",
      title: "text-white",
      label: "text-amber-200/80",
      soft: "bg-amber-400/5",
    },
    daylight: {
      border: "border-slate-300/70",
      bg: "bg-white/55",
      title: "text-slate-900",
      label: "text-slate-600",
      soft: "bg-slate-900/5",
    },
  };

  const t = themeMap[theme];

  return (
    <div ref={ref} id={id} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0.22, scale: isActive ? 1 : 0.985 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full px-6"
        >
          <div
            className={`rounded-3xl border ${t.border} ${t.bg} backdrop-blur-xl p-8 md:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.22)]`}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------- PAGE -------------------------------- */

export default function ShowcasePage() {
  useEffect(() => {
    const exposedFlag = sessionStorage.getItem("monpro_showcase_exposed");
    if (exposedFlag) {
      sessionStorage.removeItem("monpro_showcase_exposed");
      setTimeout(() => {
        document.getElementById("self-driving-brand")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <BlueprintTransition>
      {/* 1) HERO — Digital Factory with large circular diagram */}
      <DigitalFactoryHero />

      {/* 2) FRICTION BLUEPRINT — relatable, not “stats-y” */}
      <ScrollySection id="friction-blueprint" theme="blueprint">
        <div className="space-y-8">
          <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-200/70 uppercase">
            Step 01 — Where time disappears
          </p>

          <h2 className="text-4xl md:text-6xl font-black font-mono text-white">
            The Friction Blueprint
          </h2>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl">
            Your store can be doing fine and still feel exhausting. The problem isn’t “your effort”.
            It’s the invisible manual steps between systems.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/5">
              <p className="font-mono text-[10px] tracking-widest text-cyan-200/70 uppercase">
                ORDER_HANDOFFS
              </p>
              <p className="mt-2 text-xl font-bold text-white">Copy-paste is a hidden tax.</p>
              <p className="mt-3 text-white/70 leading-relaxed">
                Shopify → Sheets → courier → customer updates. Each handoff adds delay, mistakes, and stress.
                We turn it into one flow.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-pink-400/15 bg-pink-400/5">
              <p className="font-mono text-[10px] tracking-widest text-pink-200/70 uppercase">
                SUPPORT_PRESSURE
              </p>
              <p className="mt-2 text-xl font-bold text-white">Most support tickets are avoidable.</p>
              <p className="mt-3 text-white/70 leading-relaxed">
                "Where is my order?" becomes rare when tracking + proactive updates exist across Email/<span style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp</span>/DMs.
              </p>
            </div>
          </div>

          <p className="font-mono text-[11px] text-white/55">
            Output: a simple “what to automate first” blueprint based on your store, not generic advice.
          </p>
        </div>
      </ScrollySection>

      {/* 3) CONVERSION BRIDGE — speed + trust */}
      <ScrollySection id="conversion-bridge" theme="dawn">
        <div className="space-y-8">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: '#94A3B8' }}>
            Step 02 — Faster replies win
          </p>

          <h2 className="text-4xl md:text-6xl font-black" style={{ color: '#0F172A' }}>
            The Conversion Bridge
          </h2>

          <p className="text-lg md:text-xl max-w-3xl" style={{ color: '#F8FAFC', fontWeight: 500 }}>
            Customers don't <span style={{ color: '#FCA5A5', fontWeight: 600 }}>"ghost"</span> — they get distracted. The store that responds <span style={{ color: '#86EFAC', fontWeight: 700 }}>fast</span> (and clearly) usually wins.
            I build systems that reply quickly without sounding robotic.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border-2 p-6 shadow-xl cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                borderColor: 'rgba(148, 163, 184, 0.2)'
              }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#94A3B8', fontWeight: 600 }}>DM_TO_LEAD</p>
              <p className="mt-3 font-semibold text-lg" style={{ color: '#F8FAFC', fontWeight: 600 }}>Instagram/<span style={{ color: '#25D366', fontWeight: 700 }}>WhatsApp</span> → <span style={{ color: '#E2E8F0' }}>structured lead</span> → follow-up</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border-2 p-6 shadow-xl cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, #334155, #1E293B)',
                borderColor: 'rgba(148, 163, 184, 0.2)'
              }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#94A3B8', fontWeight: 600 }}>ABANDONMENT</p>
              <p className="mt-3 font-semibold text-lg" style={{ color: '#F8FAFC', fontWeight: 600 }}>Cart nudges that feel <span style={{ color: '#E2E8F0' }}>helpful</span>, not spammy</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border-2 p-6 shadow-xl cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                borderColor: 'rgba(148, 163, 184, 0.2)'
              }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#94A3B8', fontWeight: 600 }}>POST_PURCHASE</p>
              <p className="mt-3 font-semibold text-lg" style={{ color: '#F8FAFC', fontWeight: 600 }}>Status updates that <span style={{ color: '#E2E8F0' }}>reduce tickets</span> + refunds</p>
            </motion.div>
          </div>

          <SystemPulse />
        </div>
      </ScrollySection>

      {/* 4) READY FOR SCALE — your actual services */}
      <ScrollySection id="self-driving-brand" theme="signal">
        <div className="space-y-8">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: '#64748B' }}>
            Step 03 — The self-driving ops stack
          </p>
      
          <h2 className="text-4xl md:text-6xl font-black" style={{ 
            background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ready for <span style={{ color: '#DC2626' }}>Scale</span>
          </h2>
      
          <p className="text-lg md:text-xl max-w-3xl" style={{ color: '#334155', fontWeight: 600 }}>
            Scale isn't <span style={{ color: '#DC2626', fontWeight: 700 }}>"more orders."</span> Scale is the same workload handling <span style={{ color: '#059669', fontWeight: 800 }}>3× volume</span> without you working 3× harder.
            This is Shopify + integrations + workflows + AI assistants as one system.
          </p>
      
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02, borderColor: '#10B981' }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-3xl border-2 shadow-lg cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))',
                borderColor: 'rgba(16, 185, 129, 0.3)'
              }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#059669', fontWeight: 700 }}>SHOPIFY_FOUNDATION</p>
              <p className="mt-2 text-2xl font-black" style={{ color: '#0F172A' }}>
                Clean data → <span style={{ color: '#10B981' }}>reliable automations</span>.
              </p>
              <p className="mt-3 leading-relaxed" style={{ color: '#475569', fontWeight: 500 }}>
                Products, tags, collections, shipping rules, emails, analytics — set up so everything downstream <span style={{ color: '#059669', fontWeight: 700 }}>works</span>.
              </p>
            </motion.div>
      
            <motion.div 
              whileHover={{ scale: 1.02, borderColor: '#3B82F6' }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-3xl border-2 shadow-lg cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.05))',
                borderColor: 'rgba(59, 130, 246, 0.3)'
              }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#2563EB', fontWeight: 700 }}>WORKFLOWS + AI</p>
              <p className="mt-2 text-2xl font-black" style={{ color: '#0F172A' }}>
                Automations that run <span style={{ color: '#3B82F6' }}>while you sleep</span>.
              </p>
              <p className="mt-3 leading-relaxed" style={{ color: '#475569', fontWeight: 500 }}>
                Orders, support, reports, inventory sync, lead routing — plus <span style={{ color: '#2563EB', fontWeight: 700 }}>AI help</span> where it actually makes sense.
              </p>
            </motion.div>
          </div>
      
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: '#F59E0B' }}
            transition={{ duration: 0.2 }}
            className="p-7 border-2 rounded-3xl shadow-xl cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(245, 158, 11, 0.08))',
              borderColor: 'rgba(245, 158, 11, 0.4)'
            }}
          >
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#D97706', fontWeight: 700 }}>REVENUE_RECOVERY</p>
            <p className="mt-2 text-3xl font-black" style={{ color: '#0F172A' }}>
              Recover <span style={{ color: '#DC2626', fontWeight: 900 }}>abandoned sales</span> with smart follow-ups.
            </p>
            <p className="mt-3" style={{ color: '#475569', fontWeight: 500 }}>
              Email + <span style={{ color: '#25D366', fontWeight: 700 }}>WhatsApp</span> + retargeting triggers based on <span style={{ color: '#D97706', fontWeight: 700 }}>behavior</span> — not random blasts.
            </p>
          </motion.div>
        </div>
      </ScrollySection>

      {/* 5) PROOF — let the “daylight” start showing */}
      <ScrollySection id="scale-audit" theme="warm">
        <div className="space-y-8">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: '#78716C' }}>
              Step 04 — Proof, not promises
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide" style={{ 
              background: 'linear-gradient(90deg, #F59E0B, #EF4444, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Scale Audit Reports
            </h2>
            <p className="mt-4 max-w-3xl mx-auto" style={{ color: '#44403C', fontWeight: 500 }}>
              After the diagnostic, you get a clear report: what's manual, what to automate first, <span style={{ color: '#DC2626', fontWeight: 700 }}>expected impact</span>,
              and a realistic implementation range. These are example report modules.
            </p>
          </div>

          <ScaleAuditBento />
        </div>
      </ScrollySection>
      
      {/* Customer Reviews Rail */}
      <section className="relative w-full py-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #FEF3C7 100%)' }}>
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black" style={{ color: '#0F172A' }}>Trusted by Growing Brands</h3>
          <p className="text-slate-600 mt-2">Real results from real businesses</p>
        </div>
      
        {/* Infinite scrolling reviews */}
        <div className="relative">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6"
          >
            {/* First set of reviews */}
            {[
              {
                name: "Sarah M.",
                role: "E-commerce Director",
                company: "Fashion Boutique",
                review: "Scaled from 50 to 2,000 orders/day with zero additional staff. The automation logic just works.",
                rating: 5
              },
              {
                name: "James K.",
                role: "Founder",
                company: "Home Goods Store",
                review: "Cut our support tickets by 60% in the first month. Customers get instant updates, we get our time back.",
                rating: 5
              },
              {
                name: "Priya S.",
                role: "Operations Manager",
                company: "Beauty & Wellness",
                review: "Finally stopped copy-pasting between systems. Everything syncs automatically. Game changer.",
                rating: 5
              },
              {
                name: "Michael R.",
                role: "CEO",
                company: "Tech Accessories",
                review: "Recovered 20% of abandoned carts with WhatsApp flows. That alone paid for the system 10x over.",
                rating: 5
              },
              {
                name: "Lisa T.",
                role: "Marketing Lead",
                company: "Organic Foods",
                review: "Instagram DMs now convert to leads automatically. Our response time went from hours to seconds.",
                rating: 5
              },
              {
                name: "David W.",
                role: "Store Owner",
                company: "Sports Equipment",
                review: "No more manual order updates. No more spreadsheets. Just clean, automated workflows that scale.",
                rating: 5
              },
            ].map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 p-6 rounded-2xl shadow-lg border"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <span key={starIndex} style={{ color: '#F59E0B', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontStyle: 'italic' }}>
                  "{review.review}"
                </p>
                <div className="border-t pt-3" style={{ borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                  <p className="font-bold text-sm" style={{ color: '#0F172A' }}>{review.name}</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>{review.role}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{review.company}</p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {[
              {
                name: "Sarah M.",
                role: "E-commerce Director",
                company: "Fashion Boutique",
                review: "Scaled from 50 to 2,000 orders/day with zero additional staff. The automation logic just works.",
                rating: 5
              },
              {
                name: "James K.",
                role: "Founder",
                company: "Home Goods Store",
                review: "Cut our support tickets by 60% in the first month. Customers get instant updates, we get our time back.",
                rating: 5
              },
              {
                name: "Priya S.",
                role: "Operations Manager",
                company: "Beauty & Wellness",
                review: "Finally stopped copy-pasting between systems. Everything syncs automatically. Game changer.",
                rating: 5
              },
              {
                name: "Michael R.",
                role: "CEO",
                company: "Tech Accessories",
                review: "Recovered 20% of abandoned carts with WhatsApp flows. That alone paid for the system 10x over.",
                rating: 5
              },
              {
                name: "Lisa T.",
                role: "Marketing Lead",
                company: "Organic Foods",
                review: "Instagram DMs now convert to leads automatically. Our response time went from hours to seconds.",
                rating: 5
              },
              {
                name: "David W.",
                role: "Store Owner",
                company: "Sports Equipment",
                review: "No more manual order updates. No more spreadsheets. Just clean, automated workflows that scale.",
                rating: 5
              },
            ].map((review, i) => (
              <div
                key={`duplicate-${i}`}
                className="flex-shrink-0 w-80 p-6 rounded-2xl shadow-lg border"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <span key={starIndex} style={{ color: '#F59E0B', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontStyle: 'italic' }}>
                  "{review.review}"
                </p>
                <div className="border-t pt-3" style={{ borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                  <p className="font-bold text-sm" style={{ color: '#0F172A' }}>{review.name}</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>{review.role}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{review.company}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 6) CTA — keep your strong ending, but "daylight" theme */}
      <ScrollySection id="cta" height="100vh" theme="daylight">
        <div className="text-center space-y-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900">
            Build your system?
          </h2>

          <p className="text-slate-700 max-w-2xl mx-auto text-lg">
            If your store is growing, this makes growth feel lighter. If your store is struggling, this removes the chaos
            that’s blocking you.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/4917643835327"
              className="px-10 py-5 font-bold rounded-full shadow-xl transition-all"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              Message on WhatsApp
            </motion.a>
            <a
              href="#"
              className="px-10 py-5 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all"
            >
              Book 15-min Logic Call
            </a>
          </div>

          <p className="text-xs opacity-60 font-mono italic text-slate-600">
            Personally reviewed by Paramvir Marwah.
          </p>
        </div>
      </ScrollySection>
    </BlueprintTransition>
  );
}
