import React from "react";
import Sidebar from "./sidebar";
import DetailContent from "./detailContent";
import type { ClassId } from "../../../lib/constants/types";

interface DetailPageProps {
  classId: ClassId;
  onGoBack: () => void;
}

export default function DetailPage({ classId, onGoBack }: DetailPageProps) {
  return (
    <>
      <button
        onClick={onGoBack}
        className="fixed top-20 sm:top-22 md:top-24 left-4 sm:left-6 md:left-8 lg:left-12 
        inline-flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 
        bg-white rounded-lg md:rounded-xl 
        text-sm sm:text-base text-[#0e4ba9] font-semibold 
        shadow-md hover:shadow-lg hover:bg-[#0e4ba9] hover:text-white 
        transition-all duration-200 z-50"
      >
        <span>←</span>
        <span>Quay lại</span>
      </button>

      {/* Main Content - Responsive spacing */}
      <DetailContent classId={classId} />

      {/* Sidebar */}
      <Sidebar classId={classId} />
    </>
  );
}
