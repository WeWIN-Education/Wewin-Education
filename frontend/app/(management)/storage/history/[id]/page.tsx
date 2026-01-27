"use client";

import { notFound, useRouter } from "next/navigation";
import { use } from "react";

import {
  getRequestById,
  getRequestItems,
} from "@/lib/constants/storage/request/selectors";

import { RequestDetailHeader } from "@/app/components/storage/history/requestDetailHeader";
import { RequestItemsTable } from "@/app/components/storage/history/requestItemTable";
import { BackButton } from "@/app/components/backButton";
import { Routes } from "@/lib/constants/routes";

export default function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const po = getRequestById(id);
  if (!po) return notFound();

  const items = getRequestItems(po.id);
  // const timeline = getRequestTimeline(po.id);

  return (
    <div className="p-6 space-y-6 text-black">
      {/* ===== BACK BUTTON ===== */}
      <BackButton
        label="Quay lại lịch sử kho"
        onClick={() => router.push(Routes.MANAGE_STORAGE_HISTORY)}
      />

      {/* ===== HEADER ===== */}
      {/* <RequestDetailHeader po={po} /> */}

      {/* ===== ITEMS TABLE ===== */}
      {/* <RequestItemsTable items={items} orderStatus={po.status} /> */}

      {/* ===== TIMELINE ===== */}
      {/* <RequestTimeline docs={timeline} /> */}
    </div>
  );
}
