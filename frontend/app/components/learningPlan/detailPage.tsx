import React from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebarMobile";
import DetailContent from "./detailContent";
import type { ClassId } from "../../constants/types";

interface DetailPageProps {
  classId: ClassId;
  onGoBack: () => void;
}

export default function DetailPage({ classId, onGoBack }: DetailPageProps) {
  return (
    <div className="animate-fadeIn">
      <button
        onClick={onGoBack}
        className="inline-flex fixed items-center mb-5 -ml-30 px-4 py-2 bg-white rounded-xl 
  text-[#0e4ba9] font-semibold shadow hover:bg-[#0e4ba9] hover:text-white transition"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div>
          <DetailContent classId={classId} />
        </div>

        <div className="relative">
          <Sidebar classId={classId} />
        </div>
      </div>

      <SidebarMobile classId={classId} />
    </div>
  );
}
