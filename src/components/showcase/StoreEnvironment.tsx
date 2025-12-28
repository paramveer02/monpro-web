"use client";

import { motion } from "framer-motion";

export function StoreEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Architectural Elements */}
      <div className="absolute inset-0">
        {/* Soft vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]" />
        
        {/* Premium display cases - left side */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-32 opacity-[0.08]">
          <div className="h-full border-l border-r border-gray-300 bg-gradient-to-r from-gray-100 to-transparent" />
          {/* Shelf lines */}
          <div className="absolute w-full h-px bg-gray-300 top-0" />
          <div className="absolute w-full h-px bg-gray-300 top-1/3" />
          <div className="absolute w-full h-px bg-gray-300 top-2/3" />
        </div>
        
        {/* Premium display cases - right side */}
        <div className="absolute right-0 top-1/4 bottom-1/4 w-32 opacity-[0.08]">
          <div className="h-full border-l border-r border-gray-300 bg-gradient-to-l from-gray-100 to-transparent" />
          {/* Shelf lines */}
          <div className="absolute w-full h-px bg-gray-300 top-0" />
          <div className="absolute w-full h-px bg-gray-300 top-1/3" />
          <div className="absolute w-full h-px bg-gray-300 top-2/3" />
        </div>
        
        {/* Floor shadow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900/[0.02] to-transparent" />
      </div>

      {/* Product displays - subtle shadows */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[20, 35, 50, 65, 80].map((left, i) => (
          <div
            key={`product-${i}`}
            className="absolute w-16 h-20 rounded-lg blur-sm"
            style={{ 
              top: '15%', 
              left: `${left}%`,
              background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)'
            }}
          />
        ))}
      </div>

      {/* Ceiling track lighting */}
      <div className="absolute top-0 left-0 right-0 h-2 opacity-[0.05]">
        <div className="h-full bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      {/* Floor reflections with tile lines */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-[0.04]">
        <div className="h-full bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
        {/* Subtle tile lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px)',
          backgroundSize: '200px 100%'
        }} />
      </div>

      {/* Ambient Lighting Simulation */}
      <div className="absolute inset-0">
        {/* Ceiling lights simulation */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-200/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-2/4 w-64 h-64 bg-yellow-200/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-3/4 w-64 h-64 bg-amber-200/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid Pattern (Display Shelving) */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f2937 1px, transparent 1px),
            linear-gradient(to bottom, #1f2937 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}
      />

      {/* Platform Icons - Decorative */}
      <div className="absolute inset-0 opacity-[0.04]">
        {/* Shopify - top left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-20 left-[5%]"
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M14.6 5.9c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-1.2-.1-1.2-.1s-.9-.9-1-1c-.1-.1-.3-.1-.4 0-.1 0-.2.1-.3.1-.1 0-.6.2-.6.2-1.1-3.3-4.3-3.1-4.4-3.1C6.1 1.6 6 1.7 6 1.8c0 0-.2.6-.5 1.4-.6-.2-1.1-.3-1.5-.3-1.8 0-2.7 1.1-2.9 2.2-.2 1.1.5 2 1.4 2.5 0 0 .8.6 1.8 1.3.5-.7 1.1-1.3 1.8-1.9.1-.1.3 0 .2.2-.8 1.3-1.2 2.7-1.2 3.8 0 1.5.5 2.7 1.4 3.6.7.7 1.6 1.1 2.6 1.1 1.3 0 2.3-.6 2.9-1.6.6-1 .9-2.3.9-3.6 0-.8-.1-1.5-.3-2.2l.4.3c.1 0 .2.1.3.1.1 0 .2 0 .2-.1 0 0 1.5-1.1 1.5-2.7z"/>
          </svg>
        </motion.div>

        {/* Etsy - top right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-32 right-[8%]"
        >
          <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M21.013 4.331c-.088-.177-.264-.331-.529-.331H3.516c-.265 0-.44.154-.529.331L.034 11.153c-.088.177-.034.419.132.53l9.834 6.55c.11.074.265.074.374 0l9.834-6.55c.166-.111.22-.353.132-.53l-2.953-6.822zM11.5 16.609l-8.53-5.684 2.62-6.042h11.82l2.62 6.042-8.53 5.684z"/>
          </svg>
        </motion.div>

        {/* WooCommerce - bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-40 left-[10%]"
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M23.5 9.5c-.3-1.2-1.5-2-2.8-2h-1.2c-.1-2.1-1.8-3.8-3.9-3.9h-7c-2.2.1-3.9 1.9-3.9 4v.9c-1.3 0-2.5.8-2.8 2C1.6 11.7 2 13 3 14l2.5 2.5c.3.3.5.7.5 1.1v1.9c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1.9c0-.4.2-.8.5-1.1L21 14c1-1 1.4-2.3 1-3.5-.3.3-.6.5-1 .7v-.2c0-.6.2-1.2.5-1.5zM16 19.5H8v-1.9c0-.9-.4-1.8-1.1-2.5l-2.5-2.5c-.4-.4-.6-1-.4-1.6.2-.5.7-.9 1.3-.9h1.2v-.1c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v.1h1.2c.6 0 1.1.4 1.3.9.2.6 0 1.2-.4 1.6l-2.5 2.5c-.7.7-1.1 1.6-1.1 2.5v1.9z"/>
          </svg>
        </motion.div>

        {/* Amazon - bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-48 right-[12%]"
        >
          <svg width="75" height="75" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M14.86 16.74c-3.56 2.64-8.73 4.05-13.18 4.05-6.24 0-11.85-2.31-16.1-6.15-.34-.3-.04-.72.37-.48 4.67 2.72 10.44 4.35 16.4 4.35 4.02 0 8.44-.83 12.51-2.56.61-.27 1.13.4.53.79zm1.82-2.08c-.46-.59-3.03-.28-4.18-.14-.35.04-.4-.26-.09-.48 2.05-1.44 5.41-1.02 5.8-.54.4.49-.1 3.87-2.04 5.48-.3.25-.58.12-.45-.21.43-1.08 1.41-3.52.96-4.11z"/>
          </svg>
        </motion.div>

        {/* Make.com - center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute top-[45%] left-[15%]"
        >
          <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9.82 12 5.98-1.26 9.82-6.45 9.82-12V7l-10-5zm0 1.88l8.82 4.41v8.71c0 4.78-3.26 9.25-8.82 10.37-5.56-1.12-8.82-5.59-8.82-10.37V8.29L12 3.88zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

