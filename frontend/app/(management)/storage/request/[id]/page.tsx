import { notFound } from "next/navigation";
import { use } from "react";
import {
  getRequestById,
  getRequestItems,
  getRequestTimeline,
} from "@/lib/constants/storage/request/selectors";
import { RequestDetailHeader } from "@/app/components/storage/request/requestDetailHeader";
import { RequestItemsTable } from "@/app/components/storage/request/requestItemTable";
import { RequestTimeline } from "@/app/components/storage/request/requestTimeLine";
import { ApprovalActionPanel } from "@/app/components/storage/request/approvalActionPanel";


export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap Promise
  const { id } = use(params);

  const po = getRequestById(id);
  if (!po) return notFound();

  const items = getRequestItems(po.id);
  const timeline = getRequestTimeline(po.id);

  return (
    <div className="p-6 space-y-6 text-black">
      <RequestDetailHeader po={po} />

      <RequestItemsTable items={items} requestType={po.type} />

      <RequestTimeline docs={timeline} />

      {po.status === "REQUESTED" && (
        <ApprovalActionPanel
          requestId={po.id}
          requestType={po.type}
          items={items}
        />
      )}
    </div>
  );
}
