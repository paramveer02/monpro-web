"use client";

import { motion } from "framer-motion";

const AUDIT_REPORTS = [
  {
    id: "01",
    title: "Scale Audit Report #01",
    metric: "Scaled from 50 to 2,000 orders/day with 0 additional staff.",
    category: "ARCHITECTURE",
    size: "large",
    theme: "slate"
  },
  {
    id: "02",
    title: "Scale Audit Report #02",
    metric: "Cut fulfillment time per order from 18 minutes to under 3.",
    category: "LOGIC",
    size: "medium",
    theme: "light"
  },
  {
    id: "03",
    title: "Scale Audit Report #03",
    metric: "Recovered ~20% of abandoned carts via <span style='color: #25D366; font-weight: 700;'>WhatsApp</span> flows.",
    category: "SYNC",
    size: "medium",
    theme: "light"
  },
  {
    id: "04",
    title: "Scale Audit Report #04",
    metric: "9x higher conversion on leads contacted within 5 minutes.",
    category: "CALIBRATE",
    size: "small",
    theme: "slate"
  },
  {
    id: "05",
    title: "Scale Audit Report #05",
    metric: "Eliminated inventory mismatches across 3 sales channels.",
    category: "SYNC",
    size: "small",
    theme: "light"
  }
];

export default function ScaleAuditBento() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop Bento Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[180px]">
        {AUDIT_REPORTS.map((report, index) => {
          const isLarge = report.size === "large";
          const isMedium = report.size === "medium";
          const isSlate = report.theme === "slate";

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`
                ${isLarge ? "col-span-2 row-span-2" : isMedium ? "col-span-2 row-span-1" : "col-span-1 row-span-1"}
                ${isSlate 
                  ? "text-white" 
                  : "text-[#0F172A]"
                }
                border rounded-2xl p-6 relative overflow-hidden shadow-md
                hover:shadow-xl transition-shadow duration-300
              `}
              style={{
                background: isSlate 
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))'
                  : 'rgba(255, 255, 255, 0.8)',
                borderColor: isSlate ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 213, 225, 0.4)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Category Label */}
              <div className={`
                absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider
                ${isSlate ? "text-slate-300" : "text-slate-600"}
              `}
              style={{
                background: isSlate ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.15)'
              }}
              >
                {report.category}
              </div>

              {/* Content */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className={`text-xs font-mono mb-2 ${isSlate ? "text-slate-400" : "text-slate-500"}`}>
                    {report.title}
                  </p>
                </div>
                
                <div>
                  <p className={`
                    font-bold leading-tight
                    ${isLarge ? "text-2xl md:text-3xl" : isMedium ? "text-lg md:text-xl" : "text-base"}
                  `}>
                    {report.metric}
                  </p>
                </div>
              </div>

              {/* Subtle grid accent for slate cards */}
              {isSlate && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px"
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden space-y-4">
        {AUDIT_REPORTS.map((report, index) => {
          const isSlate = report.theme === "slate";

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`
                ${isSlate 
                  ? "text-white" 
                  : "text-[#0F172A]"
                }
                border rounded-2xl p-6 relative overflow-hidden shadow-md
              `}
              style={{
                background: isSlate 
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))'
                  : 'rgba(255, 255, 255, 0.8)',
                borderColor: isSlate ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 213, 225, 0.4)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Category Label */}
              <div className={`
                absolute top-4 right-4 px-2 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider
                ${isSlate ? "text-slate-300" : "text-slate-600"}
              `}
              style={{
                background: isSlate ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.15)'
              }}
              >
                {report.category}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className={`text-[10px] font-mono ${isSlate ? "text-slate-400" : "text-slate-500"}`}>
                  {report.title}
                </p>
                
                <p className="text-lg font-bold leading-tight">
                  {report.metric}
                </p>
              </div>

              {/* Subtle grid accent for slate cards */}
              {isSlate && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px"
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
