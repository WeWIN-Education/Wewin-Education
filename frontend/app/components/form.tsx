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
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            {title}
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ===== Form ===== */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-5 text-black"
        >
          {children}

          {/* ===== Footer ===== */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Hủy
            </button>

            <button
              type="submit"
              className={`px-5 py-2 rounded-lg font-semibold hover:scale-[1.02] transition
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
