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
        className="fixed top-23 left-4 md:left-8 lg:left-12 inline-flex items-center px-4 py-2 bg-white rounded-xl 
  text-[#0e4ba9] font-semibold shadow hover:bg-[#0e4ba9] hover:text-white transition-colors duration-200 z-50"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div>
          <DetailContent classId={classId} />
        </div>

        <Sidebar classId={classId} />
      </div>
    </div>
  );
}