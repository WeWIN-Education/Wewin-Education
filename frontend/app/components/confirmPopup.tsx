"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmPopupProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmPopup({
  visible,
  onConfirm,
  onCancel,
  title = "Xác nhận hành động",
  description = "Hành động này không thể hoàn tác.",
}: ConfirmPopupProps) {
  if (!visible) return null;

  return (
    <div
      className="
        fixed inset-0 z-9999
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        px-4
      "
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full
          max-w-[92%]
          sm:max-w-md
          lg:max-w-lg
          rounded-3xl
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          p-6 sm:p-8 lg:p-9
          text-center
        "
      >
        {/* ===== ICON ===== */}
        <div className="flex justify-center mb-4">
          <div
            className="
              w-14 h-14
              rounded-full
              bg-red-100
              flex items-center justify-center
            "
          >
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
        </div>

        {/* ===== TITLE ===== */}
        <h3
          className="
            text-xl sm:text-2xl
            font-bold
            text-gray-900
            mb-2
          "
        >
          {title}
        </h3>

        {/* ===== DESCRIPTION ===== */}
        <p
          className="
            text-sm sm:text-base
            text-gray-600
            mb-6
          "
        >
          {description}
        </p>

        {/* ===== DIVIDER ===== */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* ===== ACTIONS ===== */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="
              px-6 py-3
              rounded-xl
              border border-gray-300
              text-gray-700
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              px-6 py-3
              rounded-xl
              bg-linear-to-r from-red-500 to-red-600
              text-white
              font-semibold
              shadow-lg
              hover:from-red-600 hover:to-red-700
              hover:shadow-xl
              transition
            "
          >
            Xác nhận
          </button>
        </div>
      </motion.div>
    </div>
  );
}
