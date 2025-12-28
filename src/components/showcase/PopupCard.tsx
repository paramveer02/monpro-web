import { motion } from "framer-motion";

interface PopupCardProps {
  message: string;
  icon?: "warning" | "error" | "info";
  delay?: number;
}

export function PopupCard({ message, icon = "warning", delay = 0 }: PopupCardProps) {
  const iconBg = {
    warning: "bg-yellow-400",
    error: "bg-red-500",
    info: "bg-blue-500"
  }[icon];

  const iconChar = {
    warning: "!",
    error: "×",
    info: "i"
  }[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
      className="bg-white border-2 border-gray-400 shadow-xl p-4 rounded-sm inline-block"
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 ${iconBg} border border-gray-600 flex items-center justify-center rounded-sm`}>
          <span className="text-xl font-bold">{iconChar}</span>
        </div>
        <span className="font-mono text-sm">{message}</span>
      </div>
    </motion.div>
  );
}

