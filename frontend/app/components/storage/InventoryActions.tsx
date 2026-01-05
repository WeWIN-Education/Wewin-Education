"use client";

import { CirclePlus, MinusCircleIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import BaseEntityFormModal from "../form";
import ImportInventoryForm from "../../(management)/storage/[id]/components/importInventoryForm";
import ExportInventoryForm from "../../(management)/storage/[id]/components/exportInventoryForm";

export default function InventoryActions({ productId }: { productId: string }) {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* ===== NHẬP KHO ===== */}
        <button
          onClick={() => setOpenImport(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                     bg-green-600 hover:bg-green-700
                     text-white font-semibold shadow-sm"
        >
          <PlusCircle size={18} />
          Gửi yêu cầu Nhập kho
        </button>

        {/* ===== XUẤT KHO ===== */}
        <button
          onClick={() => setOpenExport(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                     bg-blue-600 hover:bg-blue-700
                     text-white font-semibold shadow-sm"
        >
          <MinusCircleIcon size={18} />
          Gửi yêu cầu Xuất kho
        </button>
      </div>

      {openImport && (
        <BaseEntityFormModal
          mode="add"
          title={
            <div className="flex items-center gap-2 text-green-700">
              <CirclePlus className="w-6 h-6" />
              <span>Thêm số lượng</span>
            </div>
          }
          submitText="Xác nhận thêm"
          onCancel={() => setOpenImport(false)}
          onSubmit={() => {}}
        >
          <ImportInventoryForm
            productId={productId}
            onSuccess={() => setOpenImport(false)}
          />
        </BaseEntityFormModal>
      )}

      {openExport && (
        <BaseEntityFormModal
          mode="edit"
          title={
            <div className="flex items-center gap-2 text-[#0E4BA9]">
              <MinusCircleIcon className="w-6 h-6" />
              <span>Xuất kho</span>
            </div>
          }
          submitText="Xác nhận xuất"
          onCancel={() => setOpenExport(false)}
          onSubmit={() => {}}
        >
          <ExportInventoryForm
            productId={productId}
            onSuccess={() => setOpenExport(false)}
          />
        </BaseEntityFormModal>
      )}
    </>
  );
}
