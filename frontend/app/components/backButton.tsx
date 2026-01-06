import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string; // thêm prop này
}

export function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2 mb-4 sm:mb-6
        text-[#0E4BA9] hover:text-blue-700
        transition-all duration-200 hover:-translate-x-1
      "
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium text-xs sm:text-lg cursor-pointer">
        {label}
      </span>
    </button>
  );
}