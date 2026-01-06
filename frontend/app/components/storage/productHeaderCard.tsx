"use client";

import { Package, TrendingUp, Activity, Sparkles } from "lucide-react";

// ============= STOCK HEADER COMPONENT =============
interface ProductInfoCardProps {
  name: string;
  code: string;
  category?: string;
  quantity: number;
  unit: string;
  statusLabel: string;
  statusColor: string;
}

export function ProductInfoCard({
  name,
  code,
  category,
  quantity,
  unit,
  statusLabel,
  statusColor,
}: ProductInfoCardProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all">
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-100/40 rounded-full blur-3xl" />

      {/* TOP: NAME */}
      <div className="relative flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <Package size={26} className="text-white" strokeWidth={2.5} />
        </div>

        <div className="flex-1">
          {/* ROW 1: NAME + CATEGORY */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {name}
            </h2>

            {category && (
              <span
                className="
                  inline-flex items-center gap-1.5
                  px-3 py-1
                  text-xs font-semibold
                  rounded-full
                  bg-orange-50 text-orange-700
                  border border-orange-200
                  shadow-sm
                  whitespace-nowrap
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {category}
              </span>
            )}
          </div>

          {/* ROW 2: CODE */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Mã:</span>
            <code className="px-2 py-0.5 text-xs font-mono bg-orange-50 text-orange-700 rounded border border-orange-200">
              {code}
            </code>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-dashed border-gray-200 my-4" />

      {/* BOTTOM: STOCK */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">Tồn kho hiện tại</div>
          <div className="text-3xl font-extrabold text-gray-900">
            {quantity.toLocaleString()}
            <span className="ml-1 text-base font-semibold text-gray-500">
              {unit}
            </span>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm ${statusColor}`}
        >
          <span className="opacity-80 font-semibold">Tình trạng:</span>
          <span>{statusLabel}</span>
        </span>
      </div>
    </div>
  );
}

// ============= STAT CARD COMPONENT =============
interface StatCardProps {
  value: number;
  label: string;
  color: "green" | "blue" | "orange";
}

export function StatCard({ value, label, color }: StatCardProps) {
  const colorMap = {
    green: {
      gradient: "from-green-50 to-emerald-50",
      text: "text-green-600",
      border: "border-green-200",
      accent: "bg-green-500",
      icon: TrendingUp,
    },
    blue: {
      gradient: "from-blue-50 to-sky-50",
      text: "text-blue-600",
      border: "border-blue-200",
      accent: "bg-blue-500",
      icon: Activity,
    },
    orange: {
      gradient: "from-orange-50 to-amber-50",
      text: "text-orange-600",
      border: "border-orange-200",
      accent: "bg-orange-500",
      icon: Sparkles,
    },
  };

  const config = colorMap[color];
  const Icon = config.icon;

  return (
    <div
      className={`group relative overflow-hidden bg-linear-to-br ${config.gradient} rounded-xl p-5 border ${config.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 ${config.accent} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
      />

      <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity">
        <Icon size={32} className={config.text} />
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className={`text-4xl font-black ${config.text} group-hover:scale-105 transition-transform duration-200 inline-block`}
          >
            {value.toLocaleString()}
          </span>
        </div>

        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">
          {label}
        </p>
      </div>

      <div
        className={`absolute bottom-0 right-0 w-16 h-0.5 ${config.accent} opacity-50`}
      />
    </div>
  );
}
