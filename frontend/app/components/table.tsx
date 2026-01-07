"use client";

import React from "react";
import { Eye, Pencil, Ban } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ================= ACTIONS ================= */
export interface TableActions<T> {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDisable?: (row: T) => void;
}

/* ================= PROPS ================= */
interface ReusableTableProps<T> {
  data: T[];
  columns: string[];

  /* Desktop */
  renderRow: (row: T) => React.ReactNode;

  /* Mobile */
  renderMobileCard: (row: T) => React.ReactNode;

  actions?: TableActions<T>;
  getKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  className?: string;
  headerClassName?: string;
}

/* ================= COMPONENT ================= */
export default function ReusableTable<T>({
  data,
  columns,
  renderRow,
  renderMobileCard,
  actions,
  getKey,
  emptyText = "No data available",
  className = "",
  headerClassName = "",
  onRowClick,
}: ReusableTableProps<T>) {
  const hasActions = Boolean(
    actions?.onView || actions?.onEdit || actions?.onDisable
  );

  /* ================= DESKTOP ACTION BUTTONS ================= */
  const ActionButtons = ({ row }: { row: T }) => (
    <div
      className="flex justify-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {actions?.onView && (
        <button
          title="Xem"
          onClick={() => actions.onView?.(row)}
          className="h-9 w-9 rounded-full bg-blue-500 text-white
                   flex items-center justify-center
                   hover:bg-blue-600 transition"
        >
          <Eye size={18} />
        </button>
      )}

      {actions?.onEdit && (
        <button
          title="Sửa"
          onClick={() => actions.onEdit?.(row)}
          className="h-9 w-9 rounded-full bg-yellow-500 text-white
                   flex items-center justify-center
                   hover:bg-yellow-600 transition"
        >
          <Pencil size={18} />
        </button>
      )}

      {actions?.onDisable && (
        <button
          title="Ngưng"
          onClick={() => actions.onDisable?.(row)}
          className="h-9 w-9 rounded-full bg-red-500 text-white
                   flex items-center justify-center
                   hover:bg-red-600 transition"
        >
          <Ban size={18} />
        </button>
      )}
    </div>
  );

  /* ================= MOBILE BOTTOM ACTION BAR ================= */
  const MobileActionBar = ({ row }: { row: T }) => (
    <div
      className="grid grid-cols-3 divide-x border-t border-blue-100"
      onClick={(e) => e.stopPropagation()}
    >
      {actions?.onView && (
        <button
          onClick={() => actions.onView?.(row)}
          className="py-3 flex flex-col items-center gap-1
                   text-blue-600 hover:bg-blue-50 transition"
        >
          <Eye size={18} />
          <span className="text-xs font-medium">Xem</span>
        </button>
      )}

      {actions?.onEdit && (
        <button
          onClick={() => actions.onEdit?.(row)}
          className="py-3 flex flex-col items-center gap-1
                   text-yellow-600 hover:bg-yellow-50 transition"
        >
          <Pencil size={18} />
          <span className="text-xs font-medium">Sửa</span>
        </button>
      )}

      {actions?.onDisable && (
        <button
          onClick={() => actions.onDisable?.(row)}
          className="py-3 flex flex-col items-center gap-1
                   text-red-600 hover:bg-red-50 transition"
        >
          <Ban size={18} />
          <span className="text-xs font-medium">Ngưng</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div
        className={`hidden md:block bg-white rounded-2xl shadow-xl border border-blue-100 overflow-x-auto ${className}`}
      >
        <table className="w-full border-collapse text-gray-800">
          <thead
            className={`bg-linear-to-r from-[#0E4BA9] to-[#007BCE] text-white uppercase text-sm ${headerClassName}`}
          >
            <tr>
              {columns.map((h) => (
                <th key={h} className="px-6 py-3 text-center">
                  {h}
                </th>
              ))}
              {hasActions && (
                <th className="px-6 py-3 text-center">Hành động</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="py-6 text-center text-gray-400"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <motion.tr
                  key={getKey(row)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    transition
                    ${onRowClick ? "cursor-pointer hover:bg-blue-50 active:bg-blue-100" : ""}
                  `}
                >
                  {renderRow(row)}

                  {hasActions && (
                    <td className="px-6 py-4">
                      <ActionButtons row={row} />
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden space-y-4 mt-4">
        <AnimatePresence>
          {data.map((row) => (
            <motion.div
              key={getKey(row)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white text-black rounded-2xl shadow-md border border-blue-100 overflow-hidden"
            >
              {/* CONTENT */}
              <div className="p-4">{renderMobileCard(row)}</div>

              {/* ✅ BOTTOM ACTION BAR */}
              {hasActions && <MobileActionBar row={row} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
