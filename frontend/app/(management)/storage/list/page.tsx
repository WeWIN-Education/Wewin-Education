"use client";

import { useEffect, useRef, useState } from "react";
import InventoryStats from "@/app/components/storage/inventoryStat";
import ReusableTable from "@/app/components/table";
import InventoryForm, {
  InventoryFormData,
} from "@/app/components/storage/inventoryForm";
import { CirclePlus } from "lucide-react";
import PageToolbar from "@/app/components/toolBar";
import ConfirmPopup from "@/app/components/confirmPopup";
import Notification from "@/app/components/notification";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/constants/routes";
import {
  getMobileStatus,
  getStockStatus,
  TableRow,
} from "@/app/utils/stockStatus";
import { Pagination, RowsPerPage } from "@/app/components/pagination";
import { Product, ProductApi } from "@/types/product";
import { storageService } from "@/services/product.service";
import { categoryService } from "@/services/product-category-service";
import { mapProductApiToProduct } from "@/app/utils/product";

const TABLE_COLUMNS: string[] = [
  "Mã",
  "Tên vật dụng",
  "Danh mục",
  "Tồn kho",
  "Đơn vị",
  "Trạng thái",
];

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
    status: TableRow["status"];
  } | null>(null);

  const [hoverPreview, setHoverPreview] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
    imageUrl?: string | null;
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
  const [, setLoading] = useState(false);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: "info" | "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "info",
    visible: false,
  });
  const [, setCategoryMap] = useState<Record<string, string>>({});
  const categoryMapRef = useRef<Record<string, string>>({});
  const totalItems = rows.length;
  const totalQuantity = rows.reduce((s, i) => s + i.quantity, 0);

  const MIN_THRESHOLD = 20;
  const lowStock = rows.filter((r) => r.status === "LOW_STOCK").length;
  const outOfStock = rows.filter((r) => r.status === "OUT_OF_STOCK").length;

  const isAll = limit === "all";
  const numericLimit = isAll ? 0 : Number(limit);

  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(total / numericLimit));
  const startIndex = isAll ? 0 : (page - 1) * numericLimit;
  const endIndex = isAll ? total : Math.min(total, startIndex + rows.length);

  const handleHoverEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    row: TableRow,
  ) => {
    setHoverPreview({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      name: row.name,
      imageUrl: row.imageUrl,
    });
  };

  const handleHoverMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setHoverPreview((prev) =>
      prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev,
    );
  };

  const handleHoverLeave = () => {
    setHoverPreview((prev) => ({ ...prev, visible: false }));
  };

  const handleAdd = () => setOpenForm({ mode: "add" });

  const handleRowsChange = (rowsValue: RowsPerPage) => {
    setLimit(rowsValue);
    setPage(1);
  };

  const showNotification = (
    message: string,
    type: "info" | "success" | "error" = "info",
  ) => {
    setNotification({ message, type, visible: true });
  };

  const handleSubmit = async (data: InventoryFormData) => {
    const code = data.code.trim();
    const name = data.name.trim();

    if (!code || !name || !data.categoryId) {
      return;
    }

    try {
      setLoading(true);

      // let imageUrl = data.imageUrl ?? null;

      // if (data.imageFile) {
      //   const up = await storageService.uploadImage(data.imageFile);
      //   imageUrl = up.url;
      // }

      const payload = {
        code,
        name,
        categoryId: data.categoryId,
        unit: data.unit ?? "",
        quantity: data.quantity ?? 0,
        description: data.description.trim(),
        imageUrl: null,
      };

      if (openForm?.mode === "edit" && data.id) {
        await storageService.updateProduct(data.id, payload);
        showNotification("Cập nhật vật dụng thành công", "success");
      } else {
        await storageService.createProduct(payload);
        showNotification("Tạo vật dụng thành công", "success");
      }

      setOpenForm(null);
      setReloadKey((prev) => prev + 1);
    } catch (err) {
      console.error("Save product error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setLoading(true);

      try {
        const isAll = limit === "all";
        const limitValue = isAll ? 0 : Number(limit);

        const res = await storageService.searchProducts(
          {
            page: isAll ? 1 : page,
            limit: limitValue,
            q: search || undefined,
          },
          true,
        );
        if (isCancelled) return;

        const products: Product[] = (res.items as ProductApi[]).map(
          mapProductApiToProduct,
        );

        /* 1️⃣ LẤY DANH SÁCH CATEGORY ID (UNIQUE) */
        const categoryIds = Array.from(
          new Set(
            products
              .map((p) => p.categoryId)
              .filter((id): id is string => !!id),
          ),
        );

        /* 2️⃣ FETCH CATEGORY (CÓ CACHE) */
        const newCategoryMap: Record<string, string> = {};

        await Promise.all(
          categoryIds.map(async (id) => {
            if (categoryMapRef.current[id]) {
              newCategoryMap[id] = categoryMapRef.current[id];
              return;
            }

            try {
              const res = await categoryService.getCategoryById(id);
              newCategoryMap[id] = res.name;
            } catch {
              newCategoryMap[id] = "—";
            }
          }),
        );

        setCategoryMap((prev) => {
          const next = { ...prev, ...newCategoryMap };
          categoryMapRef.current = next;
          return next;
        });

        /* 3️⃣ MAP ROWS */
        const mappedRows: TableRow[] = products.map((p) => ({
          ...p,
          categoryName:
            newCategoryMap[p.categoryId] ??
            categoryMapRef.current[p.categoryId] ??
            "—",
          minQuantity: MIN_THRESHOLD,
        }));

        setRows(mappedRows);

        const totalFromApi =
          res?.pagination?.total ??
          res?.total ??
          (Array.isArray(res?.items) ? res.items.length : 0);

        setTotal(totalFromApi);

        if (limitValue === 0) {
          if (page !== 1) setPage(1);
        } else {
          const totalPages = Math.max(1, Math.ceil(totalFromApi / limitValue));
          if (page > totalPages) setPage(totalPages);
        }
      } catch (err) {
        console.error("Fetch storage error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [page, limit, search, reloadKey]);

  return (
    <div className="space-y-6 px-8 py-8">
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification((prev) => ({ ...prev, visible: false }))}
      />
      {/* ================= TOOLBAR ================= */}
      <PageToolbar
        title="Quản lý kho vật dụng"
        addLabel="Nhập kho"
        addIcon={CirclePlus}
        onAdd={handleAdd}
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
        columns={TABLE_COLUMNS}
        data={rows}
        getKey={(row) => row.id}
        renderRow={(row) => {
          const stock = getStockStatus(row.status);
          return (
            <>
              <td className="px-6 py-3 text-center font-medium">
                {row.code || "-"}
              </td>
              <td className="px-6 py-3 font-semibold text-[#0E4BA9]">
                <span
                  className="cursor-default underline-offset-2 hover:underline"
                  onMouseEnter={(e) => handleHoverEnter(e, row)}
                  onMouseMove={handleHoverMove}
                  onMouseLeave={handleHoverLeave}
                >
                  {row.name || "-"}
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                {row.categoryName || "-"}
              </td>
              <td className="px-6 py-3 text-center font-bold">
                {row.quantity || "-"}
              </td>
              <td className="px-6 py-3 text-center">{row.unit || "-"}</td>
              <td
                className={`px-6 py-3 text-center font-semibold ${stock.textColor}`}
              >
                {stock.label || "-"}
              </td>
            </>
          );
        }}
        renderMobileCard={(row) => {
          const status = getMobileStatus(row);

          return (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#0E4BA9]">
                    {row.name}
                  </h3>
                  <p className="text-sm text-gray-600">Mã: {row.code || "-"}</p>
                  <p className="text-sm text-gray-600">
                    Danh mục: {row.categoryName || "-"}
                  </p>
                </div>
                <span className={`font-semibold ${status.color}`}>
                  {status.label || "-"}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Tồn kho</span>
                  <p className="font-semibold text-gray-700">
                    {row.quantity || "-"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Đơn vị</span>
                  <p className="font-semibold text-gray-700">
                    {row.unit || "-"}
                  </p>
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
                code: row.code,
                name: row.name,
                categoryId: row.categoryId,
                unit: row.unit,
                quantity: row.quantity,
                imageUrl: row.imageUrl ?? null,
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
              status: row.status,
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
        onRowsChange={handleRowsChange}
      />

      {/* ================= FORM ================= */}
      {openForm && (
        <InventoryForm
          mode={openForm.mode}
          initialData={openForm.data}
          onCancel={() => setOpenForm(null)}
          onSubmit={handleSubmit}
        />
      )}

      {/* ================= CONFIRM DISABLE ================= */}
      <ConfirmPopup
        visible={!!disableTarget}
        title={
          disableTarget?.status === "CANCELLED"
            ? "Kích hoạt mặt hàng"
            : "Vô hiệu hoá mặt hàng"
        }
        description={
          disableTarget
            ? disableTarget.status === "CANCELLED"
              ? `Bạn có muốn kích hoạt lại mặt hàng "${disableTarget.name}" không?`
              : `Bạn có muốn vô hiệu hoá mặt hàng "${disableTarget.name}" không?`
            : ""
        }
        onCancel={() => setDisableTarget(null)}
        onConfirm={async () => {
          if (!disableTarget) return;

          try {
            setLoading(true);

            if (disableTarget.status === "CANCELLED") {
              await storageService.activateProduct(disableTarget.id);
              showNotification("Kích hoạt mặt hàng thành công", "success");
            } else {
              await storageService.disableProduct(disableTarget.id);
              showNotification("Vô hiệu hoá mặt hàng thành công", "success");
            }

            setReloadKey((p) => p + 1);
          } catch (err) {
            console.error(err);
            showNotification("Thao tác thất bại", "error");
          } finally {
            setLoading(false);
            setDisableTarget(null);
          }
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
