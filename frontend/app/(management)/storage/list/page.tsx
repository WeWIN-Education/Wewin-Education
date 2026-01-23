"use client";

import { useEffect, useMemo, useState } from "react";

/* ===== COMPONENTS ===== */
import InventoryStats from "@/app/components/storage/inventoryStat";
import ReusableTable from "@/app/components/table";
import InventoryForm, {
  InventoryFormData,
} from "@/app/components/storage/inventoryForm";
import { CirclePlus } from "lucide-react";
import {
  MOCK_PRODUCTS,
  MIN_QTY_BY_PRODUCT_ID,
} from "@/lib/constants/storage/product";
import type { Product } from "@/types/storage";
import PageToolbar from "@/app/components/toolBar";
import ConfirmPopup from "@/app/components/confirmPopup";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/constants/routes";
import { getStockStatus } from "@/app/utils/stockStatus";
import {
  PaginatedResponse,
  Pagination,
  RowsPerPage,
} from "@/app/components/pagination";

type TableRow = Product & { categoryName: string; minQuantity: number };

export default function StoragePage() {
  const router = useRouter();
  /* ================= FORM STATE ================= */
  const [openForm, setOpenForm] = useState<{
    mode: "add" | "edit";
    data?: Partial<InventoryFormData>;
  } | null>(null);

  const [disableTarget, setDisableTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [hoverPreview, setHoverPreview] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
    imageUrl?: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    name: "",
    imageUrl: undefined,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<RowsPerPage>(10);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [total, setTotal] = useState(0);
  const products: Product[] = MOCK_PRODUCTS;

  const tableData: TableRow[] = useMemo(() => {
    return products.map((p) => ({
      ...p,
      categoryName: p.categoryId?.name ?? "—",
      minQuantity: MIN_QTY_BY_PRODUCT_ID[p.id] ?? 0,
    }));
  }, [products]);

  const totalItems = tableData.length;
  const totalQuantity = tableData.reduce((s, i) => s + i.quantity, 0);
  const lowStock = tableData.filter(
    (i) => i.quantity > 0 && i.quantity <= i.minQuantity,
  ).length;
  const outOfStock = tableData.filter((i) => i.quantity === 0).length;

  const totalPages =
    limit === "all" ? 1 : Math.max(1, Math.ceil(total / limit));
  const startIndex = limit === "all" ? 0 : (page - 1) * limit;
  const endIndex = limit === "all" ? total : startIndex + rows.length;

  async function fetchProducts(params: {
    page: number;
    limit: RowsPerPage;
    search: string;
  }): Promise<PaginatedResponse<TableRow>> {
    let source = tableData;

    if (params.search.trim()) {
      const q = params.search.toLowerCase();
      source = source.filter((row) => {
        return (
          row.id.toLowerCase().includes(q) ||
          row.name.toLowerCase().includes(q) ||
          row.categoryName.toLowerCase().includes(q)
        );
      });
    }

    const total = source.length;

    const data =
      params.limit === "all"
        ? source
        : source.slice(
            (params.page - 1) * params.limit,
            params.page * params.limit,
          );

    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
    };
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);

      // Nếu user chọn "all" thì page luôn = 1 (tránh bug phân trang)
      const effectivePage = limit === "all" ? 1 : page;

      const res = await fetchProducts({
        page: effectivePage,
        limit,
        search,
      });

      if (!ignore) {
        setRows(res.data);
        setTotal(res.total);

        // đảm bảo page hợp lệ khi totalPages thay đổi (search làm giảm total)
        if (limit !== "all") {
          const totalPages = Math.max(1, Math.ceil(res.total / limit));
          if (page > totalPages) setPage(totalPages);
        } else {
          setPage(1);
        }
      }

      setLoading(false);
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, tableData]);

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
        data={rows}
        getKey={(row) => row.id}
        renderRow={(row) => {
          const stock = getStockStatus(row.quantity, row.minQuantity);
          return (
            <>
              <td className="px-6 py-3 text-center font-medium">{row.id}</td>
              <td className="px-6 py-3 font-semibold text-[#0E4BA9]">
                <span
                  className="cursor-default underline-offset-2 hover:underline"
                  onMouseEnter={(e) => {
                    setHoverPreview({
                      visible: true,
                      x: e.clientX,
                      y: e.clientY,
                      name: row.name,
                      imageUrl: row.imageUrl, // nếu field bạn đang dùng tên khác, đổi tại đây
                    });
                  }}
                  onMouseMove={(e) => {
                    setHoverPreview((prev) =>
                      prev.visible
                        ? { ...prev, x: e.clientX, y: e.clientY }
                        : prev,
                    );
                  }}
                  onMouseLeave={() => {
                    setHoverPreview((prev) => ({ ...prev, visible: false }));
                  }}
                >
                  {row.name}
                </span>
              </td>
              <td className="px-6 py-3 text-center">{row.categoryName}</td>
              <td className="px-6 py-3 text-center font-bold">
                {row.quantity}
              </td>
              <td className="px-6 py-3 text-center">{row.unit}</td>
              <td
                className={`px-6 py-3 text-center font-semibold ${stock.textColor}`}
              >
                {stock.label}
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
                categoryId: row.categoryId.id, // ✅ LẤY ID
                unit: row.unit,
                quantity: row.quantity,
              },
            });
          },
          onView: (row) => {
            router.push(Routes.MANAGE_STORAGE_DETAIL(row.id));
          },
          onDisable: (row) =>
            setDisableTarget({
              id: row.id,
              name: row.name,
            }),
        }}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        total={total}
        selectedRows={limit}
        text="vật dụng"
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onRowsChange={(rows) => {
          setLimit(rows);
          setPage(1); // ✅ reset page khi đổi limit
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
              data,
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
      {/* ================= BEAUTIFUL HOVER PREVIEW ================= */}
      {hoverPreview.visible && (
        <div
          className="fixed z-99999 pointer-events-none"
          style={{
            left: hoverPreview.x + 18,
            top: hoverPreview.y + 18,
          }}
        >
          <div
            className="
              relative w-96 rounded-3xl
              bg-white/90 backdrop-blur-xl
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              border border-white/60
              animate-tooltip-in
            "
          >
            {/* ===== ARROW ===== */}
            <div
              className="
                absolute -left-3 top-8
                w-4 h-4 rotate-45
                bg-white/90
                border-l border-t border-white/60
              "
            />

            {/* ===== HEADER ===== */}
            <div className="px-4 py-2 text-sm font-semibold text-[#0E4BA9] border-b border-gray-200/60">
              {hoverPreview.name}
            </div>

            {/* ===== IMAGE ===== */}
            <div className="p-4">
              {hoverPreview.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hoverPreview.imageUrl}
                  alt={hoverPreview.name}
                  className="
                    w-full h-56 object-cover rounded-2xl
                    shadow-md
                  "
                />
              ) : (
                <div
                  className="
                    w-full h-36 rounded-2xl
                    bg-linear-to-br from-gray-100 to-gray-200
                    flex items-center justify-center
                    text-sm text-gray-500 italic
                  "
                >
                  Không có hình ảnh
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
