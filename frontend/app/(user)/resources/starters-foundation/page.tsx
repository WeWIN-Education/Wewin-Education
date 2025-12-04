"use client";

import React, { useState } from "react";
import type { ClassId } from "@/app/constants/types";
import DetailPage from "@/app/components/learningPlan/detailPage";

export default function StartersFoundationPage() {
  const [selectedClass] = useState<ClassId>("STARTERS_FOUNDATION");
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="starters-foundation-page font-[Lexend] bg-[#f5f5f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-16">
        <DetailPage classId={selectedClass} onGoBack={handleGoBack} />
      </div>
    </div>
  );
}
