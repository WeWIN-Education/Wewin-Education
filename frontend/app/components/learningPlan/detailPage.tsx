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
    <div className="relative">
      {/* Main Content với button bên trong */}
      <div className="relative">
        <button
          onClick={onGoBack}
          className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 lg:left-12 
          inline-flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 
          bg-[#0e4ba9] rounded-lg md:rounded-xl 
          text-sm sm:text-base text-white font-semibold 
          shadow-md hover:shadow-lg"
        >
          <span>←</span>
          <span>Quay lại</span>
        </button>

        <DetailContent classId={classId} />
      </div>

      {/* Sidebar */}
      <Sidebar classId={classId} />
    </div>
  );
}