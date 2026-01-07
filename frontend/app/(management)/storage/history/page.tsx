"use client";

import DynamicFilterBar from "@/app/components/filter";
import { RequestListPage } from "@/app/components/storage/history/requestTable";
import PageToolbar from "@/app/components/toolBar";
import { getAllRequests } from "@/lib/constants/storage/request/selectors";
import { defineFilters } from "@/types/filter";
import { ApprovalStatus, Type } from "@/types/storage";
import { useMemo, useState } from "react";

export type ApprovalFilters = {
  q: string;
  type: "ALL" | Type;
  status: ApprovalStatus[];
};

export default function Page() {
  const all = getAllRequests();

  const FILTERS = defineFilters<ApprovalFilters>()([
    {
      key: "q",
      type: "search",
      placeholder: "Tìm theo mã phiếu...",
    },
    {
      key: "status",
      type: "multiselect",
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
      options: [
        { label: "Đã gửi", value: "REQUESTED" },
        { label: "Đã duyệt", value: "APPROVED" },
        { label: "Yêu cầu đặt hàng", value: "ORDER_REQUEST" },
        { label: "Đã đặt hàng", value: "ORDER_APPROVED" },
        { label: "Đã huỷ", value: "CANCELLED" },
        { label: "Hoàn tất", value: "SUCCESS" },
      ],
    },
    {
      key: "type",
      type: "select",
      label: "Loại phiếu",
      options: [
        { label: "Tất cả", value: "ALL" },
        { label: "Nhập kho", value: "IN" },
        { label: "Xuất kho", value: "OUT" },
      ],
    },
  ]);

  const [filters, setFilters] = useState<ApprovalFilters>({
    q: "",
    status: [], 
    type: "ALL",
  });

  const filtered = useMemo(() => {
    return all.filter((x) => {
      if (filters.status.length > 0 && !filters.status.includes(x.status)) {
        return false;
      }

      if (filters.type !== "ALL" && x.type !== filters.type) return false;

      if (filters.q && !x.code.includes(filters.q)) return false;

      return true;
    });
  }, [all, filters]);

  const updateFilter = <K extends keyof ApprovalFilters>(
    key: K,
    value: ApprovalFilters[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6 px-8 py-8 text-black">
      <PageToolbar
        title="Lịch sử sản phẩm"
        searchValue={filters.q}
        onSearchChange={(v) => updateFilter("q", v)}
        rightFilters={
          <DynamicFilterBar
            filters={FILTERS.filter((f) => f.key !== "q")}
            values={filters}
            onChange={updateFilter}
          />
        }
      />

      <RequestListPage data={filtered} />
    </div>
  );
}
