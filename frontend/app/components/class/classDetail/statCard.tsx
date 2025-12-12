import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: React.ReactNode;          // cho phép nhiều dòng
  subtitle?: React.ReactNode | null; // ✅ cho phép null
  gradient: string;
  iconBg: string;
  border: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  iconBg,
  border,
}: StatCardProps) {
  return (
    <div className={`${gradient} rounded-xl p-6 border ${border}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
      </div>

      {/* Value (KHÔNG ÉP KIỂU) */}
      <div className="mb-6 text-lg md:text-2xl font-bold text-[#0E4BA9]">{value}</div>

      {/* Subtitle (render khi != null) */}
      {subtitle != null && (
        <div className="text-sm text-gray-600">{subtitle}</div>
      )}
    </div>
  );
}
