"use client";

import { useState } from "react";

/* ===== COMPONENTS ===== */
import InventoryStats from "@/app/components/storage/inventoryStat";
import ReusableTable from "@/app/components/table";
import InventoryForm, {
  InventoryFormData,
} from "@/app/components/storage/inventoryForm";

/* ===== ICONS ===== */
import { CirclePlus } from "lucide-react";

/* ===== DATA ===== */
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MIN_QTY_BY_PRODUCT_ID,
} from "@/app/constants/inventory";
import type { Product, Category } from "@/types/inventory";
import PageToolbar from "@/app/components/toolBar";
import ConfirmPopup from "@/app/components/confirmPopup";

/* =======================================================
   PAGE
======================================================= */
export default function StoragePage() {
  /* ================= FORM STATE ================= */
  const [openForm, setOpenForm] = useState<{
    mode: "add" | "edit";
    data?: Partial<InventoryFormData>;
  } | null>(null);

  const [disableTarget, setDisableTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [search, setSearch] = useState("");

  /* ================= SOURCE DATA ================= */
  const products: Product[] = MOCK_PRODUCTS;
  const categories: Category[] = MOCK_CATEGORIES;

  /* ================= MAP FOR UI ================= */
  const tableData = products.map((p) => {
    const category = categories.find((c) => c.id === p.categoryId);

    return {
      ...p,
      categoryName: category?.name ?? "—",
      minQuantity: MIN_QTY_BY_PRODUCT_ID[p.id] ?? 0,
    };
  });

  /* ================= STATS ================= */
  const totalItems = tableData.length;
  const totalQuantity = tableData.reduce((s, i) => s + i.quantity, 0);
  const lowStock = tableData.filter(
    (i) => i.quantity > 0 && i.quantity <= i.minQuantity
  ).length;
  const outOfStock = tableData.filter((i) => i.quantity === 0).length;

  const filteredTableData = search
    ? tableData.filter((row) => {
        const q = search.toLowerCase();
        return (
          row.id.toLowerCase().includes(q) ||
          row.name.toLowerCase().includes(q) ||
          row.categoryName.toLowerCase().includes(q)
        );
      })
    : tableData;

  return (
    <div className="space-y-6 px-8 py-8">
      {/* ================= TOOLBAR ================= */}
      <PageToolbar
        title="Quản lý kho vật dụng"
        addLabel="Nhập kho"
        addIcon={CirclePlus}
        onAdd={() => {
          setOpenForm({ mode: "add" });
        }}
        searchValue={search}
        onSearchChange={setSearch}
      />

      {/* ================= STATS ================= */}
      <InventoryStats
        totalItems={totalItems}
        totalQuantity={totalQuantity}
        lowStock={lowStock}
        outOfStock={outOfStock}
      />

      {/* ================= TABLE ================= */}
      <ReusableTable<Product & { categoryName: string; minQuantity: number }>
        columns={[
          "Mã",
          "Tên vật dụng",
          "Danh mục",
          "Tồn kho",
          "Đơn vị",
          "Trạng thái",
        ]}
        data={filteredTableData}
        getKey={(row) => row.id}
        renderRow={(row) => {
          const status =
            row.quantity === 0
              ? "Hết hàng"
              : row.quantity <= row.minQuantity
              ? "Sắp hết"
              : "Còn hàng";

          const statusColor =
            row.quantity === 0
              ? "text-red-600"
              : row.quantity <= row.minQuantity
              ? "text-yellow-600"
              : "text-green-600";

          return (
            <>
              <td className="px-6 py-3 text-center font-medium">{row.id}</td>
              <td className="px-6 py-3 font-semibold text-[#0E4BA9]">
                {row.name}
              </td>
              <td className="px-6 py-3 text-center">{row.categoryName}</td>
              <td className="px-6 py-3 text-center font-bold">
                {row.quantity}
              </td>
              <td className="px-6 py-3 text-center">{row.unit}</td>
              <td
                className={`px-6 py-3 text-center font-semibold ${statusColor}`}
              >
                {status}
              </td>
            </>
          );
        }}
        renderMobileCard={(row) => {
          const status =
            row.quantity === 0
              ? "Hết hàng"
              : row.quantity <= row.minQuantity
              ? "Sắp hết"
              : "Còn hàng";

          const statusColor =
            row.quantity === 0
              ? "text-red-600"
              : row.quantity <= row.minQuantity
              ? "text-yellow-600"
              : "text-green-600";

          return (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#0E4BA9]">
                    {row.name}
                  </h3>
                  <p className="text-sm text-gray-600">Mã: {row.id}</p>
                  <p className="text-sm text-gray-600">
                    Danh mục: {row.categoryName}
                  </p>
                </div>
                <span className={`font-semibold ${statusColor}`}>{status}</span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Tồn kho</span>
                  <p className="font-semibold">{row.quantity}</p>
                </div>
                <div>
                  <span className="text-gray-500">Đơn vị</span>
                  <p className="font-semibold">{row.unit}</p>
                </div>
              </div>
            </>
          );
        }}
        actions={{
          onEdit: (row) => {
            setOpenForm({
              mode: "edit",
              data: {
                id: row.id,
                name: row.name,
                categoryId: row.categoryId,
                unit: row.unit,
                quantity: row.quantity,
              },
            });
          },
          onView: (row) => console.log("VIEW PRODUCT", row.id),
          onDisable: (row) =>
            setDisableTarget({
              id: row.id,
              name: row.name,
            }),
        }}
      />

      {/* ================= FORM ================= */}
      {openForm && (
        <InventoryForm
          mode={openForm.mode}
          initialData={openForm.data}
          onCancel={() => setOpenForm(null)} // ✅ KHÔNG ĐÓNG NGAY
          onSubmit={(data) => {
            console.log(
              openForm.mode === "edit" ? "UPDATE BY ID:" : "CREATE:",
              data
            );

            setOpenForm(null);
          }}
        />
      )}

      {/* ================= CONFIRM DISABLE ================= */}
      <ConfirmPopup
        visible={!!disableTarget}
        title="Vô hiệu hoá mặt hàng"
        description={
          disableTarget
            ? `Bạn có chắc chắn muốn vô hiệu hoá mặt hàng "${disableTarget.name}" không?`
            : ""
        }
        onCancel={() => setDisableTarget(null)}
        onConfirm={() => {
          if (!disableTarget) return;

          // 🔥 LOGIC DISABLE THEO ID
          console.log("DISABLE PRODUCT BY ID:", disableTarget.id);

          // TODO: gọi API disable ở đây
          // await disableProduct(disableTarget.id);

          setDisableTarget(null);
        }}
      />
    </div>
  );
}
