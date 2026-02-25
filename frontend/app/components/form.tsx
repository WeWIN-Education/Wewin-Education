"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface BaseEntityFormModalProps {
  mode: "add" | "edit";
  title: React.ReactNode;
  submitText: string;

  onSubmit: () => void;
  onCancel: () => void;

  children: React.ReactNode;
}

export default function BaseEntityFormModal({
  mode,
  title,
  submitText,
  onSubmit,
  onCancel,
  children,
}: BaseEntityFormModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-xl w-[85%] sm:w-[90%] max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900">
            {title}
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* ===== Form ===== */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4 sm:space-y-5 text-black text-sm sm:text-base"
        >
          {children}

          {/* ===== Footer ===== */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-5 sm:mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm sm:text-base font-medium"
            >
              Hủy
            </button>

            <button
              type="submit"
              className={`w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-lg font-semibold hover:scale-[1.02] transition text-sm sm:text-base
                ${
                  mode === "add"
                    ? "bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                    : "bg-linear-to-r from-[#0E4BA9] to-[#00A6FB] text-white hover:from-[#0C3E8C] hover:to-[#0090E0]"
                }
              `}
            >
              {submitText}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}