import React from "react";
import { CLASS_IDS, ClassId } from "../../constants/classDetails";

interface ClassGridProps {
  onRequestAccess: (classId: ClassId) => void;
  onShowDetail: (classId: ClassId) => void;
}

export default function ClassGrid({ onRequestAccess, onShowDetail }: ClassGridProps) {
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-[#0e4ba9] mb-10">WEWIN English Learning Plan</h1>
      <div className="class-grid">
        <div className="class-card" onClick={() => onRequestAccess("KIDS")}> 
          <div className="class-name">KIDS</div>
          <div className="class-desc">KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN</div>
        </div>
        <div className="class-card" onClick={() => onRequestAccess("GAMES")}> 
          <div className="class-name">GAMES</div>
          <div className="class-desc">GAMES THEO TỪNG PROJECT</div>
        </div>
        <div className="class-card" onClick={() => onShowDetail("AUDIO")}> 
          <div className="class-name">AUDIO</div>
          <div className="class-desc">KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN</div>
        </div>
        <div className="class-card" onClick={() => onShowDetail("VIDEOS")}> 
          <div className="class-name">VIDEOS</div>
          <div className="class-desc">KẾ HOẠCH HỌC TIẾNG ANH MẦM NON WEWIN</div>
        </div>
      </div>
    </>
  );
}
