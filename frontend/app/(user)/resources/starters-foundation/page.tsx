"use client";

import React, { useState } from "react";
import type { ClassId } from "@/lib/constants/types";
import DetailPage from "@/app/components/learningPlan/detailPage";

export default function StartersFoundationPage() {
  const [selectedClass] = useState<ClassId>("STARTERS_FOUNDATION");
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="px-5 py-5 md:px-10 md:py-10 lg:px-20 lg:py-20">
      <DetailPage classId={selectedClass} onGoBack={handleGoBack} />
    </div>
  );
}
