"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import BlueprintTransition from "@/components/showcase/BlueprintTransition";
import TriptychHero from "@/components/showcase/TriptychHero";
import NavigationBar from "@/components/showcase/NavigationBar";

export default function ShowcasePage() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <BlueprintTransition>
      {/* Navigation Bar - changes color when The Audit (pillar 3) is expanded */}
      <NavigationBar isAuditExpanded={expandedPillar === 3} />

      {/* HERO — Glitch-Power Triptych (Full Page) */}
      <TriptychHero onExpandedChange={setExpandedPillar} />
    </BlueprintTransition>
  );
}
