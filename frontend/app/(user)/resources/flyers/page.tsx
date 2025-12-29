"use client";

import React, { useState } from "react";
import type { ClassId } from "@/lib/constants/types";
import DetailPage from "@/app/components/learningPlan/detailPage";

export default function StartersFoundationPage() {
  const [selectedClass] = useState<ClassId>("FLYERS");
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="font-[Lexend] min-h-screen">
      <DetailPage classId={selectedClass} onGoBack={handleGoBack} />
    </div>
  );
}
