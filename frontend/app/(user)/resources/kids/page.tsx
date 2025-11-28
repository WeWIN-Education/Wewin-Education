"use client";

import React, { useState } from "react";
import type { ClassId } from "@/app/constants/classDetails";
import DetailPage from "@/app/components/learningPlan/detailPage";

export default function KidsPage() {
  // classId tạm, bạn có thể lấy từ params hoặc database
  const [selectedClass] = useState<ClassId>("KIDS");

  // Điều hướng Back
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="kids-learning-page font-[Lexend] bg-[#f5f5f5] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-5 py-10 md:py-16">
        {/* Giao diện chi tiết sách */}
        <DetailPage classId={selectedClass} onGoBack={handleGoBack} />
      </div>
    </div>
  );
}
