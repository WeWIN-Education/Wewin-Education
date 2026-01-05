"use client";

import { useParams, useRouter, notFound } from "next/navigation";
import { ChevronRight, Package, Pencil } from "lucide-react";
import { useMemo, useState } from "react";

import {
  MOCK_PRODUCTS,
  MIN_QTY_BY_PRODUCT_ID,
} from "@/lib/constants/storage/product";
import { MOCK_INVENTORY_ITEMS } from "@/lib/constants/storage/inventory_document_item";
import { Type } from "@/types/storage";
import { User } from "@/types/user";
import { getStockStatus } from "@/app/utils/stockStatus";
import { formatDateTimeFull } from "@/app/utils/format";
import ReusableTable from "@/app/components/table";
import { Pagination, RowsPerPage } from "@/app/components/pagination";
import { BackButton } from "@/app/components/backButton";
import {
  ProductInfoCard,
  StatCard,
} from "@/app/components/storage/productHeaderCard";
import { ProductImageCard } from "@/app/components/storage/imageCard";
import { HistorySection } from "@/app/components/storage/historySection";
import InventoryForm from "@/app/components/storage/inventoryForm";
import { Routes } from "@/lib/constants/routes";
import InventoryActions from "@/app/components/storage/InventoryActions";

/* ================= TYPES ================= */
export interface InventoryHistoryView {
  id: string;
  date: string;
  type: Type;
  quantity: number;
  note: string;
  createdBy: User | null;
}

const HISTORY_COLUMNS = [
  "ID",
  "Ngày thực hiện",
  "Loại",
  "Số lượng",
  "Người thực hiện",
  "Ghi chú",
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [openEditForm, setOpenEditForm] = useState(false);

  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  /* ================= STOCK STATUS ================= */
  const minQuantity = MIN_QTY_BY_PRODUCT_ID[product.id] ?? 5;
  const stock = getStockStatus(product.quantity, minQuantity);

  /* ================= HISTORY MAP ================= */
  const items = MOCK_INVENTORY_ITEMS.filter(
    (i) => i.productId.id === product.id
  );

  const documentMap = useMemo(
    () => new Map(product.inventoryDocmentsId.map((d) => [d.id, d])),
    [product.inventoryDocmentsId]
  );

  const history: InventoryHistoryView[] = useMemo(() => {
    return items.map((item) => {
      const doc = documentMap.get(item.inventoryDocumentId);
      return {
        id: doc?.id ?? "—",
        date: formatDateTimeFull(item.creadedAt),
        type: item.quantity > 0 ? "IN" : "OUT",
        quantity: Math.abs(item.quantity),
        note: doc?.note ?? "—",
        createdBy: doc?.createdBy ?? null,
      };
    });
  }, [items, documentMap]);

  const totalIn = history.filter((h) => h.type === "IN").length;
  const totalOut = history.filter((h) => h.type === "OUT").length;

  /* ================= PAGINATION ================= */
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(5);

  const total = history.length;
  const pageSize = rowsPerPage === "all" ? total : Number(rowsPerPage);
  const totalPages = rowsPerPage === "all" ? 1 : Math.ceil(total / pageSize);
  const startIndex = rowsPerPage === "all" ? 0 : (page - 1) * pageSize;
  const endIndex = rowsPerPage === "all" ? total : startIndex + pageSize;

  const pagedHistory = useMemo(
    () => history.slice(startIndex, endIndex),
    [history, startIndex, endIndex]
  );

  return (
    <div className="space-y-6 px-8 py-8">
      {/* ================= BREADCRUMB ================= */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Package size={16} />
        <button
          onClick={() => router.push(Routes.MANAGE_STORAGE)}
          className="hover:text-blue-600 cursor-pointer font-medium"
        >
          Quản lý kho thiết bị
        </button>
        <ChevronRight size={16} />
        <span className="font-medium text-blue-600">{product.name}</span>
      </div>

      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BackButton
          label="Quay lại kho thiết bị"
          onClick={() => router.push("/storage")}
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* ===== NHẬP KHO ===== */}
         <InventoryActions productId={product.id} />

          {/* ===== EDIT PRODUCT ===== */}
          <button
            onClick={() => setOpenEditForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg
             bg-[#FF9933] hover:bg-[#E88A2E]
             text-white font-semibold"
          >
            <Pencil size={18} />
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: INFO CARD */}
        <div className="lg:col-span-3">
          <ProductInfoCard
            name={product.name}
            code={product.code}
            category={product.categoryId.name}
            quantity={product.quantity}
            unit={product.unit}
            statusLabel={stock.label}
            statusColor={stock.badgeColor}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <StatCard value={totalIn} label="Tổng số lần nhập" color="green" />
            <StatCard value={totalOut} label="Tổng số lần xuất" color="blue" />
            <StatCard
              value={history.length}
              label="Tổng giao dịch"
              color="orange"
            />
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="lg:col-span-2">
          <ProductImageCard
            imageUrl={product.imageUrl}
            productName={product.name}
          />
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <HistorySection hasData={history.length > 0}>
        <>
          <ReusableTable<InventoryHistoryView>
            data={pagedHistory}
            columns={HISTORY_COLUMNS}
            getKey={(row) => `${row.date}-${row.type}-${row.quantity}`}
            renderRow={(row) => (
              <>
                <td className="px-6 py-4 text-center">{row.id}</td>
                <td className="px-6 py-4 text-center">{row.date}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      row.type === "IN"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {row.type === "IN" ? "NHẬP KHO" : "XUẤT KHO"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold">
                  {row.quantity}
                </td>
                <td className="px-6 py-4 text-center">{row.createdBy?.name}</td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {row.note}
                </td>
              </>
            )}
            renderMobileCard={(row) => (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      row.type === "IN"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {row.type === "IN" ? "Nhập kho" : "Xuất kho"}
                  </span>
                  <span className="text-xs text-gray-500">{row.date}</span>
                </div>
                <div>Số lượng: {row.quantity}</div>
                <div className="text-sm">
                  Người thực hiện: <b>{row.createdBy?.name}</b>
                </div>
                <div className="text-xs italic text-gray-500">{row.note}</div>
              </div>
            )}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            total={total}
            selectedRows={rowsPerPage}
            text="giao dịch"
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            onRowsChange={(e) => {
              const value =
                e.target.value === "all" ? "all" : Number(e.target.value);
              setRowsPerPage(value);
              setPage(1);
            }}
          />
        </>
      </HistorySection>

      {openEditForm && (
        <InventoryForm
          mode="edit"
          initialData={{
            id: product.id,
            name: product.name,
            categoryId: product.categoryId.id,
            unit: product.unit,
            quantity: product.quantity,
          }}
          onCancel={() => setOpenEditForm(false)}
          onSubmit={(data) => {
            console.log("UPDATE PRODUCT FROM DETAIL:", data);
            setOpenEditForm(false);
          }}
        />
      )}
    </div>
  );
}
