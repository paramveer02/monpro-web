"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlueprintTransition from "@/components/showcase/BlueprintTransition";
import TriptychHero from "@/components/showcase/TriptychHero";
import NavigationBar from "@/components/showcase/NavigationBar";
import AutomationTransition from "@/components/showcase/AutomationTransition";
import Footer from "@/components/showcase/Footer";

export default function Home() {
  const router = useRouter();
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const handleTransition = () => {
      setShowTransition(true);
    };

    window.addEventListener('startAutomationTransition', handleTransition);

    return () => {
      window.removeEventListener('startAutomationTransition', handleTransition);
    };
  }, []);

  const handleTransitionComplete = () => {
    router.push('/diagnostic');
  };

  return (
    <>
      <BlueprintTransition>
        {/* Navigation Bar - changes color when The Audit (pillar 3) is expanded */}
        <NavigationBar isAuditExpanded={expandedPillar === 3} />

        {/* HERO — Glitch-Power Triptych (Full Page) */}
        <TriptychHero onExpandedChange={setExpandedPillar} />

        {/* Footer */}
        <Footer />
      </BlueprintTransition>

      {/* Automation Transition Overlay */}
      <AutomationTransition
        isActive={showTransition}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
