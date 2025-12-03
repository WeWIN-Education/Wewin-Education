"use client";

import React, { useState } from "react";
import type { ClassId } from "@/app/constants/types";
import DetailPage from "@/app/components/learningPlan/detailPage";

export default function StartersFoundationPage() {
  // classId tạm, bạn có thể lấy từ params hoặc database
  const [selectedClass] = useState<ClassId>("STARTERS_FOUNDATION");

  // Điều hướng Back
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="starters-foundation-page font-[Lexend] bg-[#f5f5f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-16">
        {/* Giao diện chi tiết sách */}
        <DetailPage classId={selectedClass} onGoBack={handleGoBack} />
      </div>
    </div>
  );
}