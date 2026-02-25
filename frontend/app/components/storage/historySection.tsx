import { Calendar } from "lucide-react";

// ============= HISTORY SECTION COMPONENT =============
interface HistorySectionProps {
  children?: React.ReactNode;
  hasData: boolean;
}

export function HistorySection({ children, hasData }: HistorySectionProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-white via-orange-50/20 to-white rounded-2xl p-6 shadow-lg border border-orange-100/50">
      <div className="absolute top-0 right-0 w-56 h-56 bg-linear-to-br from-orange-200/15 to-transparent rounded-full blur-3xl" />

      <div className="relative flex items-center gap-3 mb-6">
        <div className="w-11 h-11 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <Calendar size={22} className="text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Lịch sử nhập / xuất sản phẩm
        </h3>
      </div>

      {hasData ? (
        children
      ) : (
        <div className="relative py-16 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-30 animate-pulse" />
            <Calendar
              size={64}
              className="relative mx-auto mb-4 text-gray-300"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-lg font-semibold text-gray-400">
            Chưa có lịch sử giao dịch
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Dữ liệu sẽ xuất hiện khi có giao dịch nhập/xuất
          </p>
        </div>
      )}
    </div>
  );
}

// ============= INFO CARD COMPONENT =============
interface InfoCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export function InfoCard({ label, value, highlight }: InfoCardProps) {
  return (
    <div className="group relative overflow-hidden bg-linear-to-br from-white to-orange-50/40 rounded-xl p-5 border border-orange-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-orange-200/30 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            {label}
          </p>
        </div>

        <p
          className={`text-lg font-bold ${
            highlight
              ? "bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
              : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}