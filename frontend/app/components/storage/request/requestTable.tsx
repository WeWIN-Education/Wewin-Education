"use client";

import { useState, useMemo } from "react";
import { Purchase_Orders } from "@/types/storage";

import { Pagination, RowsPerPage } from "../../pagination";
import ReusableTable from "../../table";

export function RequestListPage({ data }: { data: Purchase_Orders[] }) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<RowsPerPage>(10);

  const pageSize = rows === "all" ? data.length : rows;
  const totalPages = rows === "all" ? 1 : Math.ceil(data.length / pageSize);

  const slicedData = useMemo(() => {
    if (rows === "all") return data;
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize, rows]);

  return (
    <>
      <ReusableTable<Purchase_Orders>
        data={slicedData}
        columns={[
          "Mã",
          "Tiêu đề",
          "Loại",
          "Người tạo",
          "Thời gian",
          "Trạng thái",
        ]}
        getKey={(row) => row.id}
        renderRow={renderRequestRow}
        renderMobileCard={renderRequestMobileCard}
        emptyText="Không có request phù hợp bộ lọc"
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        startIndex={(page - 1) * pageSize}
        endIndex={page * pageSize}
        total={data.length}
        selectedRows={rows}
        text="request"
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onRowsChange={(e) => {
          const v = e.target.value;
          setRows(v === "all" ? "all" : Number(v));
          setPage(1);
        }}
      />
    </>
  );
}

import { typeLabel } from "@/app/utils/request";
import { formatDateTimeFull } from "@/app/utils/format";
import { ApprovalStatusBadge } from "./requestBadge";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";

export function renderRequestRow(po: Purchase_Orders) {
  return (
    <>
      <td className="px-6 py-4 font-semibold text-center">{po.code}</td>

      <td className="px-6 py-4 text-center">
        <div className="font-medium">{po.name}</div>
        {po.note && (
          <div className="text-xs text-gray-500 line-clamp-1">{po.note}</div>
        )}
      </td>

      <td className="px-6 py-4 text-center">{typeLabel(po.type)}</td>

      <td className="px-6 py-4 text-center">{po.createdBy?.name ?? "—"}</td>

      <td className="px-6 py-4 text-center">
        {formatDateTimeFull(po.createdAt)}
      </td>

      <td className="px-6 py-4 text-center">
        <ApprovalStatusBadge status={po.status} />
      </td>
    </>
  );
}

export function renderRequestMobileCard(po: Purchase_Orders) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{po.code}</span>
        <ApprovalStatusBadge status={po.status} />
      </div>

      <div className="font-medium">{po.name}</div>

      {po.note && (
        <div className="text-xs text-gray-500 line-clamp-2">{po.note}</div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Loại: {typeLabel(po.type)}</div>
        <div>Người tạo: {po.createdBy?.name ?? "—"}</div>
      </div>

      <div className="text-xs text-gray-500">
        {formatDateTimeFull(po.createdAt)}
      </div>

      <Link
        href={Routes.MANAGE_STORAGE_REQUEST_DETAIL(po.id)}
        className="inline-block text-sm text-blue-600 font-medium hover:underline"
      >
        Xem chi tiết →
      </Link>
    </div>
  );
}
