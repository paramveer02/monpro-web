import { motion } from "framer-motion";

interface ReviewCardProps {
  name: string;
  region: string;
  platform: "Shopify" | "Etsy" | "Amazon" | "WooCommerce";
  stars: number;
  quote: string;
  delay?: number;
}

export function ReviewCard({ name, region, platform, stars, quote, delay = 0 }: ReviewCardProps) {
  const platformColors = {
    Shopify: "bg-green-600",
    Etsy: "bg-orange-600",
    Amazon: "bg-yellow-600",
    WooCommerce: "bg-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg border border-gray-300 p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Header with name and platform */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{region}</p>
        </div>
        <span className={`${platformColors[platform]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {platform}
        </span>
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < stars ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-700 italic">"{quote}"</p>
    </motion.div>
  );
}

