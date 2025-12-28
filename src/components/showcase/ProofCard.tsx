import { motion } from "framer-motion";

interface ProofCardProps {
  problem: string;
  automation: string;
  impact: string;
  delay?: number;
}

export function ProofCard({ problem, automation, impact, delay = 0 }: ProofCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg border border-gray-300 p-6 shadow hover:shadow-lg transition-shadow"
    >
      <h4 className="font-bold text-gray-900 mb-2">{problem}</h4>
      <p className="text-sm text-gray-700 mb-2">
        <span className="text-primary">→</span> {automation}
      </p>
      <p className="text-xs text-secondary font-semibold">{impact}</p>
    </motion.div>
  );
}

