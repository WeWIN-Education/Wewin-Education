"use client";

import React from "react";
import { motion } from "framer-motion";

interface ReusableTableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  emptyText?: string;
  getKey?: (row: T, index: number) => string | number;
  wrapTr?: boolean; // 🔹 mới
}

export default function ReusableTable<T>({
  columns = [],
  data = [],
  renderRow,
  className = "",
  headerClassName = "",
  emptyText = "No data available",
  getKey,
  wrapTr = true, // 🔹 mặc định vẫn như cũ
}: ReusableTableProps<T>) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div
      className={`overflow-x-auto bg-white rounded-2xl shadow-xl border border-blue-100 ${className}`}
    >
      <table className="w-full text-gray-800 border-collapse">
        {/* Header */}
        <thead
          className={`bg-linear-to-r from-[#0E4BA9] to-[#007BCE] text-white text-sm uppercase ${headerClassName}`}
        >
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 text-center whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-blue-100">
          {safeData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            safeData.map((item, index) => {
              const key = getKey ? getKey(item, index) : index;
              const content = renderRow(item, index);

              // 🔹 Trường hợp mặc định: bọc sẵn <tr> như trước
              if (wrapTr) {
                return (
                  <motion.tr
                    key={key}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="hover:bg-blue-50 transition cursor-pointer"
                  >
                    {content}
                  </motion.tr>
                );
              }

              // 🔹 Trường hợp đặc biệt (ClassTable): tự trả về <tr> / nhiều <tr>
              return <React.Fragment key={key}>{content}</React.Fragment>;
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
