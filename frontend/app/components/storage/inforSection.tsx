import { FileText } from "lucide-react";

// ============= INFO SECTION COMPONENT =============
interface InfoSectionProps {
  children: React.ReactNode;
}

export function InfoSection({ children }: InfoSectionProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-white to-blue-50/20 rounded-2xl p-6 shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-blue-200/15 to-transparent rounded-full blur-2xl" />

      <div className="relative flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <FileText size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Thông tin cơ bản</h3>
      </div>

      {children}
    </div>
  );
}