"use client";

import { motion } from "framer-motion";
import { Package, AlertTriangle, XCircle, Layers } from "lucide-react";

export type StatTone = "neutral" | "positive" | "warning" | "negative";

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  subtitle?: string;
  tone?: StatTone;
}

const TONE_CONFIG: Record<
  StatTone,
  {
    color: string;
    bg: string;
    icon: React.ElementType;
  }
> = {
  neutral: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: Layers,
  },
  positive: {
    color: "text-green-600",
    bg: "bg-green-50",
    icon: Package,
  },
  warning: {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    icon: AlertTriangle,
  },
  negative: {
    color: "text-red-600",
    bg: "bg-red-50",
    icon: XCircle,
  },
};

export default function StatCard({
  title,
  value,
  unit,
  subtitle,
  tone = "neutral",
}: StatCardProps) {
  const cfg = TONE_CONFIG[tone];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.015,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`
        relative flex items-center gap-4
        rounded-2xl p-5
        ${cfg.bg}
        shadow-md
        border border-gray-100
        will-change-transform
      `}
    >
      {/* Accent strip */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${cfg.color}`}
      />

      {/* Icon */}
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow ${cfg.color}`}
      >
        <Icon size={22} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500"></p>
        <p className="text-sm font-semibold text-gray-500">{title}</p>

        <div className="flex items-end gap-1">
          <span
            className={`text-3xl font-extrabold tracking-tight ${cfg.color}`}
          >
            {value}
          </span>
          {unit && (
            <span className="px-1 py-1 text-sm text-gray-500">{unit}</span>
          )}
        </div>

        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
